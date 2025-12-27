// [file name]: App.jsx (UPDATED WITH SCROLL-SPY)
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer';
import { useFacultyData } from './hooks/useFacultyData';
import { useScrollSpy } from './hooks/useScrollSpy'; // Add this import

// Import all page components
import HomePage from './pages/HomePage';
import BiographyPage from './pages/BiographyPage';
import CoursesPage from './pages/CoursesPage';
import ResearchPage from './pages/ResearchPage';
import PublicationsPage from './pages/PublicationsPage';
import StudentsPage from './pages/StudentsPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';

function App({ facultyId }) {
  const { data: facultyData, loading, error } = useFacultyData(facultyId);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Define section IDs in order
  const sectionIds = [
    'home',
    'biography', 
    'courses',
    'research',
    'publications',
    'students',
    'news',
    'gallery'
  ].filter(id => {
    // Only include sections that have data
    if (id === 'home') return true;
    if (id === 'biography') return facultyData?.biography;
    if (id === 'courses') return facultyData?.courses?.length > 0;
    if (id === 'research') return facultyData?.research;
    if (id === 'publications') return facultyData?.publications;
    if (id === 'students') return facultyData?.students;
    if (id === 'news') return facultyData?.news?.length > 0;
    if (id === 'gallery') return facultyData?.gallery?.length > 0;
    return false;
  });

  // Use scroll-spy hook to track active section
  const activeSection = useScrollSpy(sectionIds, 100);

  // Handle smooth scrolling when section is clicked from navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL
      if (window.history.replaceState) {
        const newHash = sectionId === 'home' ? '' : `#${sectionId}`;
        const newUrl = window.location.pathname + newHash;
        window.history.replaceState(null, '', newUrl);
      }
    }
  };

  // Handle initial hash on page load
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sectionIds.includes(hash) && hash !== 'home') {
        // Wait for DOM to be ready, then scroll to section
        setTimeout(() => {
          scrollToSection(hash);
        }, 300);
      }
    };

    handleInitialHash();
  }, [sectionIds]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!facultyData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />
      
      <div className="flex pt-16">
        {/* Navigation Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] z-30">
          <Navigation 
            activeTab={activeSection}
            onTabChange={scrollToSection}
            facultyData={facultyData}
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Home Section */}
          <section 
            id="home" 
            className="scroll-mt-24 min-h-screen"
          >
            <div className="p-6 lg:p-8">
              <HomePage facultyData={facultyData} />
            </div>
          </section>

          {/* Biography Section */}
          {facultyData.biography && (
            <section 
              id="biography" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50"
            >
              <div className="p-6 lg:p-8">
                <BiographyPage data={facultyData.biography} />
              </div>
            </section>
          )}

          {/* Courses Section */}
          {facultyData.courses && facultyData.courses.length > 0 && (
            <section 
              id="courses" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
            >
              <div className="p-6 lg:p-8">
                <CoursesPage data={facultyData.courses} />
              </div>
            </section>
          )}

          {/* Research Section */}
          {facultyData.research && (
            <section 
              id="research" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
            >
              <div className="p-6 lg:p-8">
                <ResearchPage data={{
                  ...facultyData.research,
                  facultyEmail: facultyData.personalInfo?.email,
                  facultyName: facultyData.personalInfo?.name
                }} />
              </div>
            </section>
          )}

          {/* Publications Section */}
          {facultyData.publications && (
            <section 
              id="publications" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50"
            >
              <div className="p-6 lg:p-8">
                <PublicationsPage data={facultyData.publications} />
              </div>
            </section>
          )}

          {/* Students Section */}
          {facultyData.students && (
            <section 
              id="students" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50"
            >
              <div className="p-6 lg:p-8">
                <StudentsPage data={facultyData.students} />
              </div>
            </section>
          )}

          {/* News Section */}
          {facultyData.news && facultyData.news.length > 0 && (
            <section 
              id="news" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50"
            >
              <div className="p-6 lg:p-8">
                <NewsPage data={facultyData.news} />
              </div>
            </section>
          )}

          {/* Gallery Section */}
          {facultyData.gallery && facultyData.gallery.length > 0 && (
            <section 
              id="gallery" 
              className="scroll-mt-24 min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50"
            >
              <div className="p-6 lg:p-8">
                <GalleryPage data={facultyData.gallery} />
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer 
        setActiveTab={scrollToSection} 
        facultyData={facultyData} 
      />
    </div>
  );
}

// Helper components (keep same)
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );
}

export default App;