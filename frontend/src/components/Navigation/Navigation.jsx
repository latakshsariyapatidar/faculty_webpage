// [file name]: Navigation.jsx (FIXED POSITIONING)
import React, { useState, useEffect } from 'react';
import {
  UserCircle,
  Briefcase,
  BookOpen,
  Microscope,
  FileText,
  GraduationCap,
  Bell,
  Image,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Menu
} from 'lucide-react';

const Navigation = ({ activeTab, onTabChange, facultyData, isCollapsed, toggleCollapse }) => {
  const professor = facultyData?.personalInfo || {};
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: UserCircle },
    { id: 'biography', label: 'Biography', icon: Briefcase },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'news', label: 'News', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: Image },
  ];

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    onTabChange(sectionId);
  };

  // For mobile, we'll have a different layout
  if (isMobile) {
    return (
      <>
        {/* Mobile Navigation Bar - Bottom Tab Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white shadow-2xl z-40 border-t border-amber-500/30">
          <div className="flex items-center justify-around px-2 py-3">
            {navigationItems.slice(0, 4).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={(e) => handleNavClick(id, e)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'text-amber-300 bg-white/10'
                    : 'text-purple-100 hover:bg-white/5'
                }`}
                aria-label={label}
              >
                <div className="relative">
                  <Icon size={20} />
                  {activeTab === id && (
                    <Sparkles size={8} className="absolute -top-1 -right-1 text-amber-300" />
                  )}
                </div>
                <span className="text-[10px] font-medium mt-1 truncate max-w-[60px]">{label}</span>
              </button>
            ))}
            
            {/* More Menu Button */}
            <button
              onClick={() => {
                // This would open a modal or dropdown with remaining items
                // For now, we'll use a simple approach
                const modal = document.getElementById('mobile-nav-modal');
                if (modal) modal.classList.remove('hidden');
              }}
              className="flex flex-col items-center justify-center p-2 rounded-lg text-purple-100 hover:bg-white/5"
              aria-label="More menu"
            >
              <Menu size={20} />
              <span className="text-[10px] font-medium mt-1">More</span>
            </button>
          </div>
        </div>

        {/* Mobile Modal for Additional Navigation Items */}
        <div id="mobile-nav-modal" className="lg:hidden hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="p-6 border-b border-purple-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Navigation</h3>
                <button
                  onClick={() => {
                    const modal = document.getElementById('mobile-nav-modal');
                    if (modal) modal.classList.add('hidden');
                  }}
                  className="p-2 rounded-lg hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              {/* Professor Info in Modal */}
              {professor.name && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-13 h-13 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center">
  {professor.profileImage ? (
    <img
      src={professor.profileImage}
      alt={professor.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white text-lg font-bold">
      {professor.name?.charAt(0)}
    </span>
  )}
</div>

                  <div>
                    <p className="text-sm font-semibold text-white">{professor.name}</p>
                    <p className="text-xs text-purple-300">{professor.designation}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {navigationItems.slice(4).map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    handleNavClick(id, e);
                    const modal = document.getElementById('mobile-nav-modal');
                    if (modal) modal.classList.add('hidden');
                  }}
                  className={`flex items-center gap-3 p-4 rounded-xl mb-2 transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-white/15 text-amber-300'
                      : 'text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
              
              {/* Contact Info in Modal */}
              {professor.email && (
                <div className="mt-6 pt-6 border-t border-purple-700/50">
                  <a
                    href={`mailto:${professor.email}`}
                    className="flex items-center gap-3 text-sm text-purple-200 hover:text-amber-300 p-3 rounded-lg hover:bg-white/5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail size={16} />
                    <span className="truncate">{professor.email}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Navigation
  return (
    <div
      className={`
        hidden lg:flex
        flex-col 
        h-[calc(100vh-4rem)] /* Account for header */
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900
        text-purple-100 shadow-2xl
        relative /* Keep it relative to its container */
      `}
    >
      {/* Spacer for Fixed Header - NOT needed since we're using calc() */}
      
      {/* Sidebar Header with Collapse Toggle */}
      <div className="px-4 pb-4 border-b border-purple-700/50 pt-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              {/* <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg">
                <span className="text-purple-900 font-bold text-sm">FP</span>
              </div> */}
              <div>
                <h2 className="text-sm font-bold text-white">Faculty Portal</h2>
                <p className="text-xs text-purple-300">IIT Dharwad</p>
              </div>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-white" />
            ) : (
              <ChevronLeft size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Professor Card */}
      {!isCollapsed && professor.name && (
        <div className="px-4 py-5 border-b border-purple-700/40 text-center">
          <div className="mx-auto w-16 h-16 rounded-full overflow-hidden shadow-lg mb-3 bg-purple-700 flex items-center justify-center">
  {professor.profileImage ? (
    <img
      src={professor.profileImage}
      alt={professor.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white text-xl font-bold">
      {professor.name?.charAt(0)}
    </span>
  )}
</div>

          <h3 className="text-sm font-semibold text-white">{professor.name}</h3>
          <p className="text-xs text-purple-300">{professor.designation}</p>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(id, e)}
              className={`w-full flex items-center rounded-xl transition-all duration-200
              ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
              ${isActive
                ? 'bg-white/20 text-amber-400 shadow-inner'
                : 'text-purple-100 hover:bg-white/10'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon size={20} />
                {isActive && (
                  <Sparkles
                    size={10}
                    className="absolute -top-1 -right-1 text-amber-300"
                  />
                )}
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium">{label}</span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Contact Info */}
      {!isCollapsed && professor.email && (
        <div className="px-4 py-4 border-t border-purple-700/40 bg-purple-900/40">
          <a
            href={`mailto:${professor.email}`}
            className="flex items-center gap-3 text-sm text-purple-200 hover:text-amber-300 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={16} />
            <span className="truncate">{professor.email}</span>
          </a>

          {professor.phone && (
            <div className="flex items-center gap-3 text-sm text-purple-300 mt-2">
              <Phone size={16} />
              <span>{professor.phone}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;