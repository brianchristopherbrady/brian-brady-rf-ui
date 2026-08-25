import { useId, useState } from 'react';
import type { NavItem } from '../../../data/content';
import './MegaNav.scss';

/** Supported expansion behaviors for the event navigation menu. */
export type ExpandMode = 'single' | 'multi';

/** Props for the event navigation menu. */
interface MegaNavProps {
  navigationItems: NavItem[];
  expandMode?: ExpandMode;
}

/** Displays expandable event navigation groups and their links. */
export function MegaNav({ navigationItems, expandMode = 'multi' }: MegaNavProps) {
  // generates a unique id for the navigation menu to associate with sub-navigation lists
  const navigationId = useId();
  // keeps track of which navigation items are currently expanded
  const [expandedItemLabels, setExpandedItemLabels] = useState<Set<string>>(
    () => new Set(
      navigationItems
        .filter((navigationItem) => navigationItem.active)
        .map((navigationItem) => navigationItem.label)),
  );

  /** Toggles a navigation group's expanded state. */
  function toggleExpandedItem(itemLabel: string) {
    // updates react state
    setExpandedItemLabels((currentExpandedLabels) => {
      // creates a copy as to not mutate react state directly
      const nextExpandedLabels = new Set(currentExpandedLabels);
      // if the copied set already contains the item label, remove it
      if (nextExpandedLabels.has(itemLabel)) {
        nextExpandedLabels.delete(itemLabel);
      } else {
        // if expandMode is 'single', clear all other expanded items before adding the new one
        if (expandMode === 'single') {
          nextExpandedLabels.clear();
        }
        // add the new item label to the set of expanded items
        nextExpandedLabels.add(itemLabel);
      }
      // return the updated set of expanded item labels
      return nextExpandedLabels;
    });
  }

  return (
    <nav className="mega-nav" aria-label="Event sections">
      <ul className="mega-nav__list">
        {navigationItems.map((navigationItem, itemIndex) => {
          // determines if the current navigation item is expanded
          const isItemExpanded = expandedItemLabels.has(navigationItem.label);
          // generates a unique id for the sub-navigation list of the current navigation item
          const subNavigationId = `${navigationId}-${itemIndex}`;

          return (
            <li key={navigationItem.label}>
              {/* Top level navigation item button, click to expand or collapse sub-navigation items */}
              <button
                type="button"
                className="mega-nav__link"
                aria-expanded={navigationItem.subItems ? isItemExpanded : undefined}
                aria-controls={navigationItem.subItems ? subNavigationId : undefined}
                onClick={() => navigationItem.subItems && toggleExpandedItem(navigationItem.label)}
              >
                <span className="mega-nav__icon-placeholder" aria-hidden="true" />
                {navigationItem.label}
              </button>
              {/* Sub-navigation list for the current navigation item, shown only if it has sub-items and is expanded */}
              {navigationItem.subItems && (
                <ul className="mega-nav__sublist" id={subNavigationId} hidden={!isItemExpanded}>
                  {navigationItem.subItems.map((subNavigationItem) => (
                    <li key={subNavigationItem.label}>
                      <a
                        className="mega-nav__link mega-nav__link--sub"
                        href={`#${subNavigationItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {subNavigationItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
