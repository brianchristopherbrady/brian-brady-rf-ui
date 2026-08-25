import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, '../../../..');
const githubRoot = path.join(repoRoot, '.github');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(entryPath));
    else files.push(entryPath);
  }
  return files;
}

function frontmatterOf(contents) {
  return contents.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
}

function scalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
  if (!value) return undefined;
  return value.replace(/^(['"])(.*)\1$/, '$2');
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll('\\', '/');
}

const files = await walk(githubRoot);
const markdownFiles = files.filter((file) => file.endsWith('.md'));
const agentFiles = files.filter((file) => file.endsWith('.agent.md'));
const skillFiles = files.filter((file) => path.basename(file) === 'SKILL.md');
const moduleFiles = files.filter((file) => file.endsWith('.mjs'));
const agentIds = new Set(agentFiles.map((file) => path.basename(file, '.agent.md')));
const errors = [];

for (const file of [...agentFiles, ...skillFiles]) {
  const contents = await readFile(file, 'utf8');
  const frontmatter = frontmatterOf(contents);
  if (!frontmatter) {
    errors.push(`${relative(file)}: missing YAML frontmatter`);
    continue;
  }

  const description = scalar(frontmatter, 'description');
  if (!description || description.length < 20) {
    errors.push(`${relative(file)}: missing or weak description`);
  }

  if (path.basename(file) === 'SKILL.md') {
    const name = scalar(frontmatter, 'name');
    const folderName = path.basename(path.dirname(file));
    if (name !== folderName) {
      errors.push(`${relative(file)}: skill name '${name}' must match folder '${folderName}'`);
    }
  }

  if (file.endsWith('.agent.md')) {
    const name = scalar(frontmatter, 'name');
    const fileName = path.basename(file, '.agent.md');
    if (name !== fileName) {
      errors.push(`${relative(file)}: agent name '${name}' must match file '${fileName}'`);
    }

    for (const match of frontmatter.matchAll(/^\s+agent:\s*['"]?([a-z0-9-]+)['"]?\s*$/gm)) {
      if (!agentIds.has(match[1])) {
        errors.push(`${relative(file)}: unknown handoff agent '${match[1]}'`);
      }
    }
  }
}

for (const file of markdownFiles) {
  const contents = await readFile(file, 'utf8');
  for (const match of contents.matchAll(/\]\((\.{1,2}\/[^)#]+)(?:#[^)]+)?\)/g)) {
    const target = path.resolve(path.dirname(file), decodeURIComponent(match[1]));
    try {
      await readFile(target);
    } catch {
      errors.push(`${relative(file)}: unresolved link '${match[1]}'`);
    }
  }
}

for (const file of moduleFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    errors.push(`${relative(file)}: Node syntax check failed: ${result.stderr.trim()}`);
  }
}

if (errors.length > 0) {
  console.error(`Customization validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Customization validation passed: ${agentFiles.length} agents, ${skillFiles.length} skills, ${markdownFiles.length} Markdown files, ${moduleFiles.length} modules.`);
}