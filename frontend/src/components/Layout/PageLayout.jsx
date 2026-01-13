// [file name]: PageLayout.jsx (FIXED - No horizontal scroll)
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Navigation from '../Navigation/Navigation';

const PageLayout = ({ children, activeTab, onTabChange, facultyData }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const mainRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      <div className="flex pt-16">
        {/* Desktop Sidebar - Fixed position */}
        <aside
          className={`
            hidden lg:block
            fixed top-16 left-0
            h-[calc(100vh-4rem)]
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

        {/* Main Content - Use padding-left instead of margin-left */}
        <main
          ref={mainRef}
          className={`
            w-full
            min-h-[calc(100vh-4rem)]
            pb-32
            transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
          `}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-full">
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