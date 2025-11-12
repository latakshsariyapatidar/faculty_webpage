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
    setIsMobileMenuOpen(false);
  };

  const professorName = facultyData?.personalInfo?.name || 'Faculty';

  return (
    <>
      <nav 
        className="bg-white border-b border-purple-200 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-white/95"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header with Enhanced Hamburger */}
          <div className="flex items-center justify-between py-4 lg:hidden">
            <div className="text-lg font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent truncate pr-4">
              {professorName}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-amber-50 border-2 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-amber-100 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={22} className="transform rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={22} className="transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Desktop Navigation - Enhanced Pill style */}
          <div className="hidden lg:flex items-center gap-3 py-4 overflow-x-auto">
            {NAVIGATION_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3 text-base font-semibold rounded-2xl transition-all duration-300 whitespace-nowrap transform hover:scale-105 active:scale-95 ${
                    isActive 
                      ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl shadow-purple-200 border-2 border-purple-500' 
                      : 'bg-gradient-to-br from-gray-50 to-purple-50 text-gray-700 hover:from-purple-50 hover:to-amber-50 border-2 border-transparent hover:border-purple-200 shadow-md hover:shadow-lg'
                  }`}
                  aria-label={tab.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-purple-600"} aria-hidden="true" />
                  <span className="relative">
                    {tab.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400 rounded-full"></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Enhanced Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Enhanced Menu Panel with slide animation */}
          <div className="fixed top-[73px] left-4 right-4 bg-gradient-to-b from-white to-purple-50/80 shadow-2xl rounded-2xl border-2 border-purple-200 z-50 lg:hidden max-h-[75vh] overflow-y-auto animate-slideDown">
            <div className="px-2 py-4 space-y-2">
              {NAVIGATION_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                        : 'text-gray-700 bg-white/80 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50 border border-purple-100'
                    }`}
                    aria-label={tab.ariaLabel}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={20} className={isActive ? "text-white" : "text-purple-600"} aria-hidden="true" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Menu Footer */}
            <div className="px-5 py-4 border-t border-purple-200 bg-white/50 rounded-b-2xl">
              <div className="text-sm text-center text-purple-600 font-medium">
                {professorName}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navigation;