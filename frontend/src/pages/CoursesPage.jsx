/**
 * Courses Page Component
 * 
 * Displays current and past courses being taught in a grid layout.
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
  // Separate current and past courses
  const currentCourses = data.filter(course => course.status !== 'past');
  const pastCourses = data.filter(course => course.status === 'past');

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 group">
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
  );

  return (
    <div className="space-y-12">
      {/* Current Courses */}
      <section>
        <h1 className="text-3xl font-bold text-purple-900 mb-6 pb-4 border-b-4 border-amber-500 inline-block">
          Current Courses
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
        
        {currentCourses.length === 0 && (
          <p className="text-gray-500 italic">No current courses available.</p>
        )}
      </section>

      {/* Past Courses */}
      {pastCourses.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-4 border-b-4 border-amber-500 inline-block">
            Past Courses
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
            {pastCourses.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CoursesPage;
