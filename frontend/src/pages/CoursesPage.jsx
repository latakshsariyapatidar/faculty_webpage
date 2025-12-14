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
    <div className="glass-effect rounded-3xl card-shadow overflow-hidden hover:card-shadow-hover transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group border border-purple-200/50">
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-6 py-5 flex items-center justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-20"></div>
        <span className="relative text-2xl font-bold text-white drop-shadow-lg">{course.code}</span>
        <span className="relative bg-white text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">{course.level}</span>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-white to-purple-50/30">
        <h3 className="text-lg font-bold text-purple-900 mb-4 leading-tight min-h-[3rem] group-hover:text-purple-700 transition-colors">
          {course.name}
        </h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-purple-200">
          <span className="text-sm text-purple-600 font-medium">{course.semester}</span>
          <span className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-sm font-bold px-4 py-2 rounded-full border border-amber-300 shadow-sm">
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
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
            Current Courses
          </h1>
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
        </div>
        
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
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
              Past Courses
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
          </div>
          
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
