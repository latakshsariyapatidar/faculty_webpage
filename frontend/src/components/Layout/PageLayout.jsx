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
 * @param {Object} props.facultyData - Faculty data for professor name
 * @returns {JSX.Element}
 */
// PageLayout.jsx
const PageLayout = ({ children, activeTab, onTabChange, facultyData }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-150 via-white to-amber-50/30">
      <Header />
      
      <Navigation 
        activeTab={activeTab} 
        onTabChange={onTabChange}
        facultyData={facultyData}
      />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <Footer setActiveTab={onTabChange} />
    </div>
  );
};



export default PageLayout;
