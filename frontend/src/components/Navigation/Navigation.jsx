/**
 * Navigation Component
 * 
 * Main navigation bar for switching between different sections.
 * Responsive design with icon and text labels.
 * 
 * @module components/Navigation
 */

import React from 'react';
import { NAVIGATION_TABS } from '../../constants/navigationConfig';

/**
 * Navigation component
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ID
 * @param {Function} props.onTabChange - Callback when tab is changed
 * @returns {JSX.Element}
 */
const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav 
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-1 py-2">
          {NAVIGATION_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-label={tab.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
