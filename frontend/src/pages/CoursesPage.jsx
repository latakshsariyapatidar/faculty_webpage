/**
 * Professional Courses Page Component
 * Enhanced UI with better visual hierarchy and subtle effects
 * 
 * @module pages/CoursesPage
 */

import React from 'react';

function CoursesPage({ data }) {
  const currentCourses = data.filter(course => course.status === 'current');
  const pastCourses = data.filter(course => course.status === 'past');

  const formatSemester = (semester) => {
    if (!semester || semester.trim() === '') return null;
    const [month, year] = semester.split(' ');
    if (month === 'August' || month === 'July') return `Autumn ${year}`;
    if (month === 'January' || month === 'December') return `Spring ${year}`;
    return semester;
  };

  // Enhanced Course Card
  const CourseCard = ({ course, isCurrent = false }) => {
    const semester = formatSemester(course.semester);
    
    return (
      <div className={`
        relative overflow-hidden rounded-xl border bg-white transition-all duration-300
        hover:transform hover:-translate-y-1 hover:shadow-xl
        ${isCurrent 
          ? 'border-purple-200 shadow-md hover:border-purple-300 hover:shadow-purple-100' 
          : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-gray-100'
        }
      `}>
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          isCurrent 
            ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500' 
            : 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400'
        }`}></div>
        
        {/* Status badge */}
        {isCurrent && (
          <div className="absolute top-3 right-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        )}
        
        <div className="p-5">
          {/* Course header with subtle background */}
          <div className={`mb-4 p-3 rounded-lg ${
            isCurrent ? 'bg-purple-50/50' : 'bg-gray-50/50'
          }`}>
            {/* Course Code */}
            {course.code && course.code.trim() !== '' && (
              <div className="inline-flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
                <span className={`font-mono text-sm font-semibold ${
                  isCurrent ? 'text-purple-700' : 'text-gray-700'
                }`}>
                  {course.code}
                </span>
              </div>
            )}
            
            {/* Course Name */}
            <h3 className={`text-base font-semibold leading-tight line-clamp-2 ${
              isCurrent ? 'text-gray-900 group-hover:text-purple-700' : 'text-gray-900'
            } transition-colors`}>
              {course.name || 'Course'}
            </h3>
          </div>
          
          {/* Metadata chips - enhanced */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.level && course.level.trim() !== '' && (
              <span className={`
                inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm
                ${course.level.includes('UG') 
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200' 
                  : course.level.includes('PG')
                  ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                }
              `}>
                <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                {course.level}
              </span>
            )}
            
            {course.credits && course.credits > 0 && (
              <span className={`
                inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm
                ${isCurrent 
                  ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border border-purple-200' 
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                }
              `}>
                <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {course.credits} Credits
              </span>
            )}
          </div>
          
          {/* Footer with enhanced design */}
          <div className={`pt-4 border-t ${
            isCurrent ? 'border-purple-100' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between">
              {semester ? (
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    isCurrent ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Semester</div>
                    <div className="text-sm font-medium text-gray-900">{semester}</div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              
              {isCurrent && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Active
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      <div className=" mx-auto p-4 md:p-6">
        {/* Enhanced Header - Reduced margin */}
        <div className="mb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                    Courses
                  </h1>
                  <p className="text-gray-600 text-sm">Teaching portfolio and academic curriculum</p>
                </div>
              </div>
            </div>
            
            {/* Stats cards - enhanced */}
            <div className="flex gap-3">
              {currentCourses.length > 0 && (
                <div className="bg-white p-3 rounded-lg border border-purple-200 shadow-sm">
                  <div className="text-lg font-bold text-purple-700">{currentCourses.length}</div>
                  <div className="text-xs text-gray-600">Current</div>
                </div>
              )}
              {pastCourses.length > 0 && (
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-lg font-bold text-gray-700">{pastCourses.length}</div>
                  <div className="text-xs text-gray-600">Past</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reduced gap between header and columns */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Courses Column */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-amber-500 rounded-full"></div>
              <div className="ml-4">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-gray-900">Current Semester</h2>
                  {currentCourses.length > 0 && (
                    <span className="px-2 py-0.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold rounded-full">
                      {currentCourses.length} course{currentCourses.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Courses being taught this academic term</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <CourseCard key={index} course={course} isCurrent={true} />
                ))
              ) : (
                <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl border border-dashed border-purple-200 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 mb-1">Semester Break</h3>
                  <p className="text-gray-600 text-sm">
                    No courses scheduled for current semester
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Past Courses Column */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-full"></div>
              <div className="ml-4">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-gray-900">Course History</h2>
                  {pastCourses.length > 0 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {pastCourses.length} course{pastCourses.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Previously taught courses and curriculum</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {pastCourses.length > 0 ? (
                (() => {
                  const hasSemesterData = pastCourses.some(c => formatSemester(c.semester));
                  
                  if (!hasSemesterData) {
                    return (
                      <div className="space-y-3">
                        {pastCourses.map((course, index) => (
                          <CourseCard key={index} course={course} isCurrent={false} />
                        ))}
                      </div>
                    );
                  }
                  
                  const grouped = pastCourses.reduce((acc, course) => {
                    const semester = formatSemester(course.semester) || 'Other';
                    if (!acc[semester]) acc[semester] = [];
                    acc[semester].push(course);
                    return acc;
                  }, {});
                  
                  const sortedSemesters = Object.keys(grouped).sort((a, b) => {
                    if (a === 'Other') return 1;
                    if (b === 'Other') return -1;
                    const getYear = (s) => parseInt(s.match(/\d+/)?.[0] || 0);
                    const getSemOrder = (s) => s.includes('Autumn') ? 1 : 0;
                    const yearA = getYear(a);
                    const yearB = getYear(b);
                    return yearB !== yearA ? yearB - yearA : getSemOrder(b) - getSemOrder(a);
                  });
                  
                  return sortedSemesters.map((semester, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700 px-3 py-1 bg-gray-100 rounded-lg">
                          {semester}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {grouped[semester].length} course{grouped[semester].length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {grouped[semester].map((course, courseIdx) => (
                          <CourseCard key={courseIdx} course={course} isCurrent={false} />
                        ))}
                      </div>
                    </div>
                  ));
                })()
              ) : (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-dashed border-gray-200 p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 mb-1">Teaching Journey Begins</h3>
                  <p className="text-gray-600 text-sm">
                    Course history will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer Summary */}
        {data.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50/30 to-amber-50/30 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Teaching Summary
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                    {currentCourses.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                        {currentCourses.length} current
                      </span>
                    )}
                    {pastCourses.length > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        {pastCourses.length} past
                      </span>
                    )}
                    {data.some(course => course.credits && course.credits > 0) && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {data.reduce((sum, course) => sum + (course.credits || 0), 0)} credits
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-md font-bold text-gray-900">
                    {data.length} total courses
                  </div>
                  <p className="text-xs text-gray-600">
                    Academic contribution
                  </p>
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