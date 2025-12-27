// [file name]: PageLayout.jsx (SIMPLIFIED)
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation/Navigation';

const PageLayout = ({ children, activeTab, onTabChange, facultyData }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const mainRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />

      <div className="flex pt-16">
        {/* Desktop Sidebar - Fixed position, correctly offset from header */}
        <div className="hidden lg:block">
          <aside
            className={`
              fixed top-16 left-0
              h-[calc(100vh-4rem)] /* Match viewport minus header */
              transition-all duration-300 ease-in-out
              z-30
              ${isSidebarCollapsed ? 'w-20' : 'w-64'}
            `}
          >
            <Navigation
              activeTab={activeTab}
              onTabChange={onTabChange}
              facultyData={facultyData}
              isCollapsed={isSidebarCollapsed}
              toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </aside>
          
          {/* Spacer to push main content right */}
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isSidebarCollapsed ? 'w-20' : 'w-64'
            }`}
          />
        </div>

        {/* Main Content - Responsive padding */}
        <main
          ref={mainRef}
          className={`
            flex-1 min-h-[calc(100vh-4rem)]
            pb-32
            ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {React.cloneElement(children, { facultyData })}
          </div>
        </main>
      </div>

      {/* Mobile Navigation is rendered by Navigation component itself */}
      
      <Footer setActiveTab={onTabChange} facultyData={facultyData} />
    </div>
  );
};

export default PageLayout;