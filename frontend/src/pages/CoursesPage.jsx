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
        relative overflow-hidden rounded-lg border bg-white transition-all duration-300
        hover:transform hover:-translate-y-0.5 hover:shadow-lg
        ${isCurrent 
          ? 'border-purple-200 shadow-sm hover:border-purple-300 hover:shadow-purple-100' 
          : 'border-gray-200 shadow-sm hover:border-gray-300'
        }
      `}>
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${
          isCurrent 
            ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500' 
            : 'bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400'
        }`}></div>
        
        {/* Status badge */}
        {isCurrent && (
          <div className="absolute top-2 right-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        )}
        
        <div className="p-3">
          {/* Course header */}
          <div className="mb-2">
            {/* Course Code */}
            {course.code && course.code.trim() !== '' && (
              <div className="inline-flex items-center gap-1.5 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-purple-500' : 'bg-gray-500'}`}></div>
                <span className={`font-mono text-xs font-semibold ${
                  isCurrent ? 'text-purple-700' : 'text-gray-700'
                }`}>
                  {course.code}
                </span>
              </div>
            )}
            
            {/* Course Name */}
            <h3 className={`text-sm font-semibold leading-tight line-clamp-2 ${
              isCurrent ? 'text-gray-900 group-hover:text-purple-700' : 'text-gray-900'
            } transition-colors`}>
              {course.name || 'Course'}
            </h3>
          </div>
          
          {/* Metadata chips - compact */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {course.level && course.level.trim() !== '' && (
              <span className={`
                inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                ${course.level.includes('UG') 
                  ? 'bg-blue-100 text-blue-800' 
                  : course.level.includes('PG')
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-100 text-gray-800'
                }
              `}>
                {course.level}
              </span>
            )}
            
            {course.credits && course.credits > 0 && (
              <span className={`
                inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                ${isCurrent 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-gray-100 text-gray-800'
                }
              `}>
                {course.credits} Credits
              </span>
            )}
          </div>
          
          {/* Footer - compact */}
          {(semester || isCurrent) && (
            <div className={`pt-2 border-t ${
              isCurrent ? 'border-purple-100' : 'border-gray-100'
            }`}>
              <div className="flex items-center justify-between text-xs">
                {semester && (
                  <span className="text-gray-600">{semester}</span>
                )}
                
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded">
                    Active
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      <div className="mx-auto p-3 md:p-4">
        {/* Compact Header */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                  Courses
                </h1>
                <p className="text-gray-600 text-xs">Teaching portfolio</p>
              </div>
            </div>
            
            {/* Compact stats */}
            <div className="flex gap-2">
              {currentCourses.length > 0 && (
                <div className="bg-white px-2 py-1 rounded border border-purple-200">
                  <div className="text-sm font-bold text-purple-700">{currentCourses.length}</div>
                  <div className="text-xs text-gray-600">Current</div>
                </div>
              )}
              {pastCourses.length > 0 && (
                <div className="bg-white px-2 py-1 rounded border border-gray-200">
                  <div className="text-sm font-bold text-gray-700">{pastCourses.length}</div>
                  <div className="text-xs text-gray-600">Past</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Current Courses Column */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-amber-500 rounded-full"></div>
              <div className="ml-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-base font-bold text-gray-900">Current Semester</h2>
                  {currentCourses.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {currentCourses.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <CourseCard key={index} course={course} isCurrent={true} />
                ))
              ) : (
                <div className="bg-white rounded-lg border border-dashed border-purple-200 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Semester Break</h3>
                  <p className="text-gray-600 text-xs">
                    No courses scheduled
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Past Courses Column */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-500 to-gray-400 rounded-full"></div>
              <div className="ml-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-base font-bold text-gray-900">Course History</h2>
                  {pastCourses.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {pastCourses.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {pastCourses.length > 0 ? (
                (() => {
                  const hasSemesterData = pastCourses.some(c => formatSemester(c.semester));
                  
                  if (!hasSemesterData) {
                    return (
                      <div className="space-y-2">
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
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded">
                        <h3 className="text-xs font-semibold text-gray-700">
                          {semester}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {grouped[semester].length}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {grouped[semester].map((course, courseIdx) => (
                          <CourseCard key={courseIdx} course={course} isCurrent={false} />
                        ))}
                      </div>
                    </div>
                  ));
                })()
              ) : (
                <div className="bg-white rounded-lg border border-dashed border-gray-200 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Teaching Journey Begins</h3>
                  <p className="text-gray-600 text-xs">
                    Course history will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Footer Summary */}
        {data.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50/30 to-amber-50/30 rounded-lg p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  {currentCourses.length > 0 && (
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                      {currentCourses.length} current
                    </span>
                  )}
                  {pastCourses.length > 0 && (
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                      {pastCourses.length} past
                    </span>
                  )}
                  {data.some(course => course.credits && course.credits > 0) && (
                    <span className="flex items-center gap-1">
                      {data.reduce((sum, course) => sum + (course.credits || 0), 0)} credits
                    </span>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {data.length} total
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