/**
 * Professional Courses Page Component
 * Optimized UI with perfect information display and zero space wastage
 * 
 * @module pages/CoursesPage
 */

import React, { useState } from 'react';

function CoursesPage({ data }) {
  const [activeTab, setActiveTab] = useState('current');
  const currentCourses = data.filter(course => course.status === 'current');
  const pastCourses = data.filter(course => course.status === 'past');

  const formatSemester = (semester) => {
    if (!semester || semester.trim() === '') return null;
    const [month, year] = semester.split(' ');
    if (month === 'August' || month === 'July') return `Autumn ${year}`;
    if (month === 'January' || month === 'December') return `Spring ${year}`;
    return semester;
  };

  // Enhanced Course Card - Perfect Information Display
  const CourseCard = ({ course, isCurrent = false }) => {
    const semester = formatSemester(course.semester);
    
    return (
      <div className={`
        flex flex-col h-full bg-white border rounded-lg transition-all duration-200
        hover:shadow-md hover:-translate-y-0.5
        ${isCurrent 
          ? 'border-purple-200 shadow-xs hover:border-purple-300' 
          : 'border-gray-200 shadow-xs hover:border-gray-300'
        }
      `}>
        {/* Top accent bar */}
        <div className={`h-1 ${
          isCurrent 
            ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500' 
            : 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400'
        } rounded-t-lg`}></div>
        
        <div className="flex flex-col flex-1 p-3">
          {/* Course header with status */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              {/* Course Code - Always visible */}
              {course.code && course.code.trim() !== '' && (
                <div className="flex items-center mb-1">
                  <div className={`w-2 h-2 rounded-full mr-1.5 flex-shrink-0 ${isCurrent ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
                  <span className={`font-mono text-xs font-semibold truncate ${
                    isCurrent ? 'text-purple-700' : 'text-gray-700'
                  }`}>
                    {course.code}
                  </span>
                </div>
              )}
              
              {/* Course Name - Full visibility */}
              <h3 className={`text-sm font-semibold leading-snug break-words hyphens-auto ${
                isCurrent ? 'text-gray-900' : 'text-gray-900'
              }`}>
                {course.name || 'Course'}
              </h3>
            </div>
            
            {/* Status indicator - small and non-intrusive */}
            {isCurrent && (
              <div className="ml-2 flex-shrink-0">
                <div className="relative">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Metadata chips - horizontally aligned, no wrapping if possible */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.level && course.level.trim() !== '' && (
              <span className={`
                inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap
                ${course.level.includes('UG') 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : course.level.includes('PG')
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
                }
              `}>
                {course.level}
              </span>
            )}
            
            {course.credits && course.credits > 0 && (
              <span className={`
                inline-flex items-center px-2 py-1 rounded text-xs font-medium whitespace-nowrap
                ${isCurrent 
                  ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
                }
              `}>
                {course.credits} Credits
              </span>
            )}
          </div>
          
          {/* Footer - Full semester info with status */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                {semester ? (
                  <span className="text-xs font-medium text-gray-700 truncate block">
                    {semester}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">No semester info</span>
                )}
              </div>
              
              <div className="flex-shrink-0 ml-2">
                {isCurrent ? (
                  <span className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-semibold rounded border border-green-200">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded border border-gray-200">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sort past courses by year (newest first)
  const sortedPastCourses = [...pastCourses].sort((a, b) => {
    const getYear = (semester) => {
      if (!semester) return 0;
      const yearMatch = semester.match(/\d{4}/);
      return yearMatch ? parseInt(yearMatch[0]) : 0;
    };
    return getYear(b.semester) - getYear(a.semester);
  });

  return (
    <div className=" w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      <div className="w-full mx-auto p-4 md:p-5">
        {/* Main Header with Integrated Tabs */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                  Courses
                </h1>
              </div>
            </div>
            
            {/* Integrated Tab Navigation - Prominent and Accessible */}
            <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('current')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 min-w-[120px] justify-center ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'current' ? 'text-purple-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Current</span>
                {currentCourses.length > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === 'current'
                      ? 'bg-purple-200 text-purple-800'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {currentCourses.length}
                  </span>
                )}
              </button>
              
              <div className="w-px h-6 bg-gray-300"></div>
              
              <button
                onClick={() => setActiveTab('past')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 min-w-[120px] justify-center ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-300 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'past' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">Past</span>
                {pastCourses.length > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === 'past'
                      ? 'bg-gray-300 text-gray-800'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {pastCourses.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area - Perfectly Packed */}
        <div className="space-y-6">
          {/* Current Courses Tab */}
          {activeTab === 'current' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-amber-500 rounded-full"></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Current Courses</h2>
                </div>
              </div>
              
              {currentCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentCourses.map((course, index) => (
                    <CourseCard key={index} course={course} isCurrent={true} />
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl border-2 border-dashed border-purple-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Semester Break</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    No courses scheduled for the current semester.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Past Courses Tab - SIMPLIFIED, NO GROUPING */}
          {activeTab === 'past' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-gradient-to-b from-gray-500 to-gray-400 rounded-full"></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Course History</h2>
                </div>
              </div>
              
              {sortedPastCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedPastCourses.map((course, index) => (
                    <CourseCard key={index} course={course} isCurrent={false} />
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Teaching Journey Begins</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    No past courses recorded yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Footer - Only visible when there are courses */}
        {data.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50/50 via-white to-amber-50/50 rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Course Portfolio Summary</h4>
                  <p className="text-xs text-gray-600">
                    Comprehensive overview of teaching activities
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-purple-200 shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium text-gray-700">Current</span>
                    <span className="text-sm font-bold text-purple-700">{currentCourses.length}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-200 shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-medium text-gray-700">Past</span>
                    <span className="text-sm font-bold text-gray-700">{pastCourses.length}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-amber-200 shadow-xs">
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Credits</span>
                    <span className="text-sm font-bold text-amber-700">
                      {data.reduce((sum, course) => sum + (course.credits || 0), 0)}
                    </span>
                  </div>
                  
                  <div className="hidden md:block text-gray-400">•</div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{data.length}</div>
                    <div className="text-xs text-gray-600">Total Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;