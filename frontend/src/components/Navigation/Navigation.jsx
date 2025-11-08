/**
 * Navigation Component
 * 
 * Main navigation bar for switching between different sections.
 * Responsive design with hamburger menu for mobile devices.
 * 
 * @module components/Navigation
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <nav 
      className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile Header with Hamburger */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <div className="text-lg font-semibold text-gray-900">
            Navigation
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex flex-wrap gap-1 py-2">
          {NAVIGATION_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
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

        {/* Mobile Navigation Menu - Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {NAVIGATION_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label={tab.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navigation;
