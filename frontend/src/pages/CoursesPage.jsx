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
function CoursesPage({ data }) {
  return (
    <div className="w-full space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Current Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-base font-semibold text-white bg-primary px-3 py-1.5 rounded">
                {course.code}
              </span>
              <span className="text-xs font-medium text-secondary px-2 py-1 rounded bg-gray-50">
                {course.level}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight min-h-[3rem]">
              {course.name}
            </h3>
            
            <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
              <span className="text-gray-600 font-medium">{course.semester}</span>
              <span className="px-3 py-1 rounded bg-gray-100 text-primary font-medium">
                {course.credits} Credits
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
