/**
 * Students Page Component
 * 
 * Displays application instructions, current students, and
 * graduated students with their research topics and placements.
 * 
 * @module pages/StudentsPage
 */

import React from 'react';

/**
 * Students page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Students data
 * @param {Array} props.data.instructions - Application instructions
 * @param {Array} props.data.current - Current students list
 * @param {Array} props.data.graduated - Graduated students list
 * @returns {JSX.Element}
 */
function StudentsPage({ data }) {
  // Categorize current students by degree type
  const phdStudents = data.current.filter(s => s.degree_type === 'PhD' || s.program?.includes('Ph'));
  const mastersStudents = data.current.filter(s => s.degree_type === 'Masters' || s.degree_type === 'M.Tech' || s.program?.includes('M.'));
  const btechStudents = data.current.filter(s => s.degree_type === 'BTech' || s.degree_type === 'B.Tech' || s.program?.includes('B.'));
  
  // Categorize graduated students
  const gradPhdStudents = data.graduated.filter(s => s.degree_type === 'PhD' || s.program?.includes('Ph'));
  const gradMastersStudents = data.graduated.filter(s => s.degree_type === 'Masters' || s.degree_type === 'M.Tech' || s.program?.includes('M.'));
  const gradBtechStudents = data.graduated.filter(s => s.degree_type === 'BTech' || s.degree_type === 'B.Tech' || s.program?.includes('B.'));

  const StudentCard = ({ student, isGraduated = false }) => (
    <div className="bg-white p-6 rounded-2xl border-t-4 border-amber-500 hover:border-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
      <div className="flex gap-4">
        {/* Photo */}
        {student.photo && (
          <div className="shrink-0">
            <img
              src={student.photo}
              alt={student.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-purple-200"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-purple-900 mb-2">
            {student.name}
          </h3>
          <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 rounded-full mb-3 shadow-md">
            {student.program || student.degree_type}
          </span>
          
          {student.thesis_title && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 border-l-4 border-purple-600 mb-3">
              <p className="text-sm text-gray-800 leading-relaxed">
                <span className="font-bold text-purple-700">Thesis:</span> {student.thesis_title}
              </p>
            </div>
          )}
          
          {/* Dates */}
          <div className="flex flex-wrap gap-2 text-xs">
            {student.start_date && (
              <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-700">
                Start: {student.start_date}
              </span>
            )}
            {student.end_date && (
              <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-700">
                {isGraduated ? 'Graduated' : 'Expected'}: {student.end_date}
              </span>
            )}
          </div>
          
          {/* Placement for graduated students */}
          {isGraduated && student.placement && (
            <div className="mt-3 inline-block px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 border-l-4 border-green-700 shadow-lg">
              <span className="text-sm text-white font-bold">{student.placement}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-10">
      {/* Application Instructions */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">How to Apply</h2>
        
        <div className="bg-white p-8 rounded-2xl border-2 border-purple-100 shadow-xl">
          <div className="space-y-4">
            {data.instructions.map((inst, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 hover:from-purple-100 hover:to-amber-100 transition-all duration-300 border-2 border-purple-100 hover:border-amber-300 shadow-sm hover:shadow-md"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-800 leading-relaxed flex-1 font-medium pt-2">{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Students */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Current Students</h2>
        
        {/* PhD Students */}
        {phdStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">PhD Students</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {phdStudents.map((student, i) => (
                <StudentCard key={i} student={student} />
              ))}
            </div>
          </div>
        )}
        
        {/* Masters Students */}
        {mastersStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Masters Students</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mastersStudents.map((student, i) => (
                <StudentCard key={i} student={student} />
              ))}
            </div>
          </div>
        )}
        
        {/* BTech Students */}
        {btechStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">BTech Students</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {btechStudents.map((student, i) => (
                <StudentCard key={i} student={student} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Graduated Students */}
      <section>
        <h2 className="text-3xl font-bold text-purple-900 mb-6 pb-3 border-b-4 border-amber-400 inline-block">Graduated Students</h2>
        
        {/* PhD Graduates */}
        {gradPhdStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">PhD Graduates</h3>
            <div className="space-y-6">
              {gradPhdStudents.map((student, i) => (
                <StudentCard key={i} student={student} isGraduated={true} />
              ))}
            </div>
          </div>
        )}
        
        {/* Masters Graduates */}
        {gradMastersStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Masters Graduates</h3>
            <div className="space-y-6">
              {gradMastersStudents.map((student, i) => (
                <StudentCard key={i} student={student} isGraduated={true} />
              ))}
            </div>
          </div>
        )}
        
        {/* BTech Graduates */}
        {gradBtechStudents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">BTech Graduates</h3>
            <div className="space-y-6">
              {gradBtechStudents.map((student, i) => (
                <StudentCard key={i} student={student} isGraduated={true} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentsPage;
