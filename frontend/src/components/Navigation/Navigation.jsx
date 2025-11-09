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
 * @param {Object} props.facultyData - Faculty data containing professor info
 * @returns {JSX.Element}
 */
const Navigation = ({ activeTab, onTabChange, facultyData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  // Get professor name from facultyData
  const professorName = facultyData?.personalInfo?.name || 'Faculty';

  return (
    <>
      <nav 
        className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Mobile Header with Hamburger */}
          <div className="flex items-center justify-between py-3 lg:hidden">
            <div className="text-base font-medium text-gray-900 truncate pr-4">
              {professorName}
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

          {/* Desktop Navigation - Pill style tabs */}
          <div className="hidden lg:flex items-center gap-2 py-3 overflow-x-auto">
            {NAVIGATION_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-purple-700 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      {/* Mobile Navigation Menu - Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-[57px] left-0 right-0 bg-white shadow-lg z-50 lg:hidden max-h-[calc(100vh-57px)] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              {NAVIGATION_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-purple-700 text-white' 
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
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
