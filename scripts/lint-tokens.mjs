import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stylesRoot = path.join(repositoryRoot, 'src');
const sharedTokensPath = path.join(stylesRoot, 'styles', '_tokens.scss');
const globalStylesPath = path.join(stylesRoot, 'styles', 'global.scss');

const rawColorOwnerFiles = new Set([
  'src/styles/global.scss',
  'src/styles/_dark_theme.scss',
  'src/styles/_bad_nineties_theme.scss',
  'src/styles/_tokens.scss',
]);

const documentedColorExceptions = new Map([
  [
    'src/components/SettingsDialog/SettingsDialog.scss',
    new Set([
      'background: #ffffff;',
      'background: #171717;',
      'background: linear-gradient(135deg, #ff00ff 50%, #00ffff 50%);',
    ]),
  ],
]);

const rawEffectOwnerFiles = new Set([
  'src/styles/_bad_nineties_theme.scss',
  'src/styles/_tokens.scss',
]);

const documentedValueExceptions = new Map([
  ['src/styles/_mixins.scss', new Set(['margin: -1px'])], // Standard visually-hidden clipping technique.
]);

const colorLiteralPattern = /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\([^)]*\)/gi;
const tokenDeclarationPattern = /^\s*\$([a-z0-9_-]+)\s*:/gim;
const tokenReferencePattern = /\$([a-z0-9_-]+)/gi;
const fixedLengthPattern = /-?(?:\d*\.)?\d+(?:px|rem|em|pt)\b/gi;
const designLengthPattern = /-?(?:\d*\.)?\d+(?:px|rem|em|pt|%|vw|vh|vmin|vmax|cqw|cqh|ch)\b/gi;

const propertyTokenFamilies = [
  { property: /^(?:margin|padding)(?:-(?:block|inline)(?:-(?:start|end))?|-(?:top|right|bottom|left))?$|^(?:gap|row-gap|column-gap)$/, prefixes: ['space-'] },
  { property: /^font-size$/, prefixes: ['font-size-'] },
  { property: /^font-weight$/, prefixes: ['font-weight-'] },
  { property: /^line-height$/, prefixes: ['line-height-'] },
  { property: /^border-radius$/, prefixes: ['radius-'] },
  { property: /^(?:box-shadow|text-shadow)$/, prefixes: ['shadow-'] },
  { property: /^z-index$/, prefixes: ['layer-'] },
  { property: /^(?:width|min-width|max-width|flex-basis)$/, prefixes: ['sidebar-', 'content-'] },
  { property: /^outline-width$/, prefixes: ['focus-ring-width'] },
  { property: /^outline-offset$/, prefixes: ['focus-ring-offset'] },
  { property: /^(?:animation-duration|transition-duration)$/, prefixes: ['motion-'] },
];

function relative(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/');
}

async function findScssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? findScssFiles(entryPath) : [entryPath];
    }),
  );

  return nestedFiles.flat().filter((filePath) => filePath.endsWith('.scss'));
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/\/\/.*$/gm, '');
}

function collectMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

function collectMixinParameters(source) {
  const parameters = new Set();
  const mixinPattern = /@mixin\s+[a-z0-9_-]+\s*\(([^)]*)\)/gim;

  for (const mixin of source.matchAll(mixinPattern)) {
    for (const parameter of mixin[1].matchAll(/\$([a-z0-9_-]+)/gi)) {
      parameters.add(parameter[1]);
    }
  }

  return parameters;
}

function locationAt(source, index) {
  const precedingSource = source.slice(0, index);
  const line = precedingSource.split('\n').length;
  const lastNewline = precedingSource.lastIndexOf('\n');
  return `${line}:${index - lastNewline}`;
}

function normalizeValue(value) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function collectTokenDefinitions(source, customProperties) {
  const definitions = [];
  const pattern = /^\s*\$([a-z0-9_-]+)\s*:\s*([^;]+);/gim;

  for (const match of source.matchAll(pattern)) {
    const customProperty = match[2].trim().match(/^var\((--[a-z0-9_-]+)\)$/i)?.[1];
    definitions.push({
      name: match[1],
      value: normalizeValue(customProperty ? customProperties.get(customProperty) ?? match[2] : match[2]),
    });
  }

  return definitions;
}

function collectCustomProperties(source) {
  const properties = new Map();
  const pattern = /^\s*(--[a-z0-9_-]+)\s*:\s*([^;]+);/gim;
  for (const match of source.matchAll(pattern)) properties.set(match[1], match[2].trim());
  return properties;
}

function collectDeclarations(source) {
  const declarations = [];
  const pattern = /(?:^|[;{])\s*([a-z][a-z0-9-]*)\s*:\s*([^;{}]+);/gim;

  for (const match of source.matchAll(pattern)) {
    const propertyOffset = match[0].indexOf(match[1]);
    declarations.push({ property: match[1].toLowerCase(), value: match[2].trim(), index: match.index + propertyOffset });
  }

  return declarations;
}

function matchingTokens(value, prefixes, tokenDefinitions) {
  const normalizedValue = normalizeValue(value);
  return tokenDefinitions
    .filter((token) => prefixes.some((prefix) => token.name.startsWith(prefix)) && token.value === normalizedValue)
    .map((token) => `$${token.name}`);
}

function containsTokenFamily(value, prefixes) {
  return prefixes.some((prefix) => new RegExp(`\\$${prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`).test(value));
}

function lintRawColors(filePath, source, errors) {
  const file = relative(filePath);
  if (rawColorOwnerFiles.has(file)) return;

  const uncommentedSource = stripComments(source);
  const allowedDeclarations = documentedColorExceptions.get(file) ?? new Set();

  for (const match of uncommentedSource.matchAll(colorLiteralPattern)) {
    const lineStart = uncommentedSource.lastIndexOf('\n', match.index) + 1;
    const lineEnd = uncommentedSource.indexOf('\n', match.index);
    const declaration = uncommentedSource.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();
    if (allowedDeclarations.has(declaration)) continue;

    errors.push(`${file}:${locationAt(uncommentedSource, match.index)} raw color '${match[0]}' must use a shared token`);
  }
}

function lintHardcodedValues(filePath, source, tokenDefinitions, errors) {
  const file = relative(filePath);
  if (file === 'src/styles/_tokens.scss') return;

  const uncommentedSource = stripComments(source);
  for (const declaration of collectDeclarations(uncommentedSource)) {
    const { property, value, index } = declaration;
    const location = `${file}:${locationAt(uncommentedSource, index)}`;
    if (documentedValueExceptions.get(file)?.has(`${property}: ${normalizeValue(value)}`)) continue;

    const rule = propertyTokenFamilies.find((candidate) => candidate.property.test(property));

    if (rule) {
      const duplicates = matchingTokens(value, rule.prefixes, tokenDefinitions);
      if (duplicates.length > 0) {
        errors.push(`${location} '${property}: ${value}' duplicates ${duplicates.join(' or ')}`);
        continue;
      }
    }

    if (/^(?:margin|padding)(?:-|$)|^(?:gap|row-gap|column-gap)$/.test(property)) {
      const pattern = containsTokenFamily(value, ['space-']) ? fixedLengthPattern : designLengthPattern;
      const hardcodedLengths = [...value.matchAll(pattern)].filter((match) => Number.parseFloat(match[0]) !== 0);
      for (const match of hardcodedLengths) {
        const duplicates = matchingTokens(match[0], ['space-'], tokenDefinitions);
        const recommendation = duplicates.length > 0 ? `use ${duplicates.join(' or ')}` : 'use a shared spacing token';
        errors.push(`${location} hardcoded spacing '${match[0]}'; ${recommendation}`);
      }
    } else if (property === 'font-size' && !containsTokenFamily(value, ['font-size-'])) {
      for (const match of value.matchAll(designLengthPattern)) {
        errors.push(`${location} hardcoded font size '${match[0]}'; use a shared font-size token`);
      }
    } else if (property === 'border-radius') {
      const hardcodedLengths = [...value.matchAll(designLengthPattern)].filter((match) => Number.parseFloat(match[0]) !== 0);
      for (const match of hardcodedLengths) {
        errors.push(`${location} hardcoded radius '${match[0]}'; use a shared radius token`);
      }
    } else if (/^(?:box-shadow|text-shadow)$/.test(property)
      && normalizeValue(value) !== 'none'
      && !containsTokenFamily(value, ['shadow-'])
      && !rawEffectOwnerFiles.has(file)) {
      errors.push(`${location} hardcoded shadow; use a shared shadow token`);
    } else if (property === 'filter'
      && /drop-shadow\s*\(/i.test(value)
      && !containsTokenFamily(value, ['shadow-'])
      && !rawEffectOwnerFiles.has(file)) {
      errors.push(`${location} hardcoded drop-shadow; use a shared shadow token`);
    } else if (property === 'z-index' && /^-?\d+$/.test(value) && value !== '0') {
      errors.push(`${location} hardcoded z-index '${value}'; use a shared layer token`);
    }
  }
}

function lintTokenReferences(filePath, source, sharedTokens, errors) {
  const file = relative(filePath);
  const uncommentedSource = stripComments(source);
  const localTokens = collectMatches(uncommentedSource, tokenDeclarationPattern);
  const mixinParameters = collectMixinParameters(uncommentedSource);
  const references = [...uncommentedSource.matchAll(tokenReferencePattern)];

  for (const match of references) {
    const token = match[1];
    if (sharedTokens.has(token) || localTokens.has(token) || mixinParameters.has(token)) continue;

    errors.push(`${file}:${locationAt(uncommentedSource, match.index)} undefined Sass token '$${token}'`);
  }

  if (!file.startsWith('src/styles/') && references.some((match) => sharedTokens.has(match[1]))) {
    const importsSharedTokens = /@use\s+['"][^'"]*tokens['"]\s+as\s+\*/.test(uncommentedSource);
    if (!importsSharedTokens) {
      errors.push(`${file}: shared Sass tokens are referenced without an explicit @use ... tokens as * import`);
    }
  }
}

const files = await findScssFiles(stylesRoot);
const sharedTokensSource = stripComments(await readFile(sharedTokensPath, 'utf8'));
const globalStylesSource = stripComments(await readFile(globalStylesPath, 'utf8'));
const sharedTokens = collectMatches(sharedTokensSource, tokenDeclarationPattern);
const tokenDefinitions = collectTokenDefinitions(sharedTokensSource, collectCustomProperties(globalStylesSource));
const errors = [];

for (const filePath of files) {
  const source = await readFile(filePath, 'utf8');
  lintRawColors(filePath, source, errors);
  lintHardcodedValues(filePath, source, tokenDefinitions, errors);
  lintTokenReferences(filePath, source, sharedTokens, errors);
}

if (errors.length > 0) {
  console.error(`Token lint failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors.sort()) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Token lint passed: ${files.length} SCSS files checked, ${sharedTokens.size} shared tokens recognized.`);
}
