/**
 * Courses Page Component
 * 
 * Displays current courses being taught in a grid layout.
 * Shows course code, name, level, semester, and credits.
 * 
 * @module pages/CoursesPage
 */

import React from 'react';

/**
 * Courses page component
 * 
 * @param {Object} props
 * @param {Array} props.data - Array of course objects
 * @returns {JSX.Element}
 */
// CoursesPage.jsx
function CoursesPage({ data }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-2 pb-4 border-b-2 border-amber-500 inline-block">
        Current Courses
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
              <span className="text-xl font-bold text-white">{course.code}</span>
              <span className="bg-white text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">{course.level}</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-4 leading-tight min-h-[3rem]">
                {course.name}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                <span className="text-sm text-purple-600 font-medium">{course.semester}</span>
                <span className="bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1.5 rounded-full border border-amber-200">
                  {course.credits} Credits
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
