/**
 * Page Layout Component
 * 
 * Provides consistent layout structure for all pages.
 * Includes header, navigation, main content area, and footer.
 * 
 * @module components/Layout/PageLayout
 */

import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation/Navigation';

/**
 * Page layout wrapper component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Tab change handler
 * @returns {JSX.Element}
 */
const PageLayout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <Navigation 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      <Footer setActiveTab={onTabChange} />
    </div>
  );
};

export default PageLayout;
