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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-amber-50/40 relative">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <Header />
      
      <Navigation 
        activeTab={activeTab} 
        onTabChange={onTabChange}
        facultyData={facultyData}
      />
      
      <main className="relative flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-slide-in-up">
          {children}
        </div>
      </main>
      
      <Footer setActiveTab={onTabChange} />
    </div>
  );
};



export default PageLayout;
