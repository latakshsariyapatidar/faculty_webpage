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
// Navigation.jsx
const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-purple-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-1 flex-wrap justify-center bg-purple-100/50 rounded-2xl p-1.5">
            {NAVIGATION_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-200/50 scale-105' 
                      : 'text-purple-800 hover:bg-white hover:text-purple-700 hover:shadow-md border border-transparent hover:border-purple-200'
                  }`}
                  aria-label={tab.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};


export default Navigation;
