/**
 * Professional Students Page Component
 * Fully adaptable, reusable layout with perfect information display
 * No space wastage, no information cut-off
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Briefcase, 
  Mail, 
  Calendar, 
  BookOpen,
  ExternalLink
} from 'lucide-react';

function StudentsPage({ data }) {
  const [activeTab, setActiveTab] = useState('current');

  // Theme colors
  const theme = {
    primary: '#8B5CF6', // Purple for PhD
    secondary: '#F59E0B', // Amber for MS/MTech
    lightPurple: '#F3E8FF',
    lightAmber: '#FEF3C7',
  };

  // Helper functions
  const getStudentProgram = (student) => student.program || student.degree_type || '';
  const getStudentYear = (student) => student.year || student.end_date || '';
  const getStudentTopic = (student) => student.topic || student.thesis_title || student.thesis || '';
  const getStudentPlacement = (student) => student.placement || '';
  const getStudentName = (student) => student.name || 'Student';

  // Determine if PhD student
  const isPhDStudent = (student) => {
    const program = getStudentProgram(student).toLowerCase();
    return program.includes('phd') || program.includes('ph.d') || program.includes('doctoral');
  };

  // Student Card Component - PERFECTLY OPTIMIZED
  const StudentCard = ({ student, isCurrent = false }) => {
    const program = getStudentProgram(student);
    const year = getStudentYear(student);
    const topic = getStudentTopic(student);
    const placement = getStudentPlacement(student);
    const name = getStudentName(student);
    const isPhD = isPhDStudent(student);
    
    // Determine colors based on program type
    const programColors = isPhD ? {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      accent: 'bg-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    } : {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      accent: 'bg-amber-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    };

    return (
      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        {/* Top accent */}
        <div className={`h-1 ${programColors.accent} rounded-t-lg`}></div>
        
        <div className="flex-1 p-3">
          {/* Header - Name and Program tag in one line */}
          <div className="mb-2.5">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {/* Status icon */}
                  <div className={`w-8 h-8 rounded-lg ${programColors.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {isCurrent ? (
                      <Users className={`w-4 h-4 ${programColors.iconColor}`} />
                    ) : (
                      <Award className={`w-4 h-4 ${programColors.iconColor}`} />
                    )}
                  </div>
                  
                  {/* Name and Program - Side by side */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {name}
                      </h3>
                      {program && (
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-md truncate max-w-[120px] ${programColors.bg} ${programColors.text} ${programColors.border} border`}>
                          {program}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Year - Compact and visible */}
                {year && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 ml-10">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{year}</span>
                  </div>
                )}
              </div>
              
              {/* Active badge - only if current */}
              {isCurrent && (
                <span className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full h-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Active
                </span>
              )}
            </div>
          </div>

          {/* Topic/Thesis - Always visible, properly spaced */}
          {topic && (
            <div className="mb-2.5">
              <div className="flex items-start gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    {isCurrent ? 'Research Topic' : 'Thesis'}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed break-words hyphens-auto">
                    {topic}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Placement for graduated students - Compact but visible */}
          {!isCurrent && placement && (
            <div className="mt-2 pt-2.5 border-t border-gray-100">
              <div className="flex items-start gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 mb-1">Placement</p>
                  <p className="text-sm text-gray-600 break-words hyphens-auto">
                    {placement}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Instructions Section - Compact and reusable
  // Replace the InstructionsSection component with this updated version:
const InstructionsSection = () => {
  if (!data.instructions || data.instructions.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-purple-50 to-amber-50 p-4">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
              <Mail className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-medium text-gray-900">Application & Contact</h2>
              <p className="text-sm text-gray-600 mt-0.5">Research position opportunities</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {data.instructions.map((inst, i) => {
              // Extract URL from instruction text
              const urlMatch = inst.match(/https?:\/\/[^\s]+/);
              const url = urlMatch ? urlMatch[0] : null;
              const text = url ? inst.replace(url, '').trim() : inst;
              
              // Check if it's an email (starts with Send your CV to)
              const isEmail = text.toLowerCase().includes('send your cv to');
              const emailMatch = inst.match(/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/);
              const email = emailMatch ? emailMatch[0] : null;
              
              // Determine if this is a link or just text
              const hasLink = url || email;
              
              if (hasLink) {
                const href = url || (email ? `mailto:${email}` : '#');
                
                return (
                  <a
                    key={i}
                    href={href}
                    target={url ? "_blank" : "_self"}
                    rel={url ? "noopener noreferrer" : ""}
                    className="block"
                  >
                    <div className="bg-white/80 rounded-lg p-3 border border-gray-200/50 hover:border-purple-200 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ExternalLink className="w-3 h-3 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {text}
                            <span className="inline-flex items-center gap-1 ml-2 text-purple-600 font-medium">
                              {url ? 'Visit Link' : email ? 'Send Email' : ''}
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              } else {
                // For non-link instructions
                return (
                  <div 
                    key={i}
                    className="bg-white/80 rounded-lg p-3 border border-gray-200/50"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail className="w-3 h-3 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {inst}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

  // Empty State Component
  const EmptyState = ({ type }) => {
    const isCurrent = type === 'current';
    const icon = isCurrent ? Users : Award;
    const title = isCurrent ? 'No Current Students' : 'No Graduated Students';
    const description = isCurrent 
      ? 'Currently, there are no active students under supervision.'
      : 'No students have graduated under supervision yet.';

    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
          {React.createElement(icon, { 
            className: "w-8 h-8 text-purple-600"
          })}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">{description}</p>
        {isCurrent && data.instructions && data.instructions.length > 0 && (
          <p className="text-sm text-gray-500">
            Check application information above for opportunities.
          </p>
        )}
      </div>
    );
  };

  // Render content - NO GROUPING, simple list
  const renderContent = () => {
    const isCurrentTab = activeTab === 'current';
    const students = isCurrentTab ? data.current : data.graduated;
    const hasStudents = students && students.length > 0;

    if (!hasStudents) {
      return <EmptyState type={isCurrentTab ? 'current' : 'graduated'} />;
    }

    return (
      <div className="space-y-3">
        {/* Simple header with count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 rounded-full" style={{ 
              backgroundColor: isCurrentTab ? theme.secondary : theme.primary 
            }}></div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isCurrentTab ? 'Current Students' : 'Graduated Students'}
            </h2>
          </div>
          <span className="text-sm font-medium px-3 py-1 rounded-md"
                style={{ 
                  backgroundColor: `${isCurrentTab ? theme.secondary : theme.primary}10`,
                  color: isCurrentTab ? theme.secondary : theme.primary
                }}>
            {students.length} {students.length === 1 ? 'student' : 'students'}
          </span>
        </div>

        {/* Responsive grid with optimal spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, index) => (
            <StudentCard 
              key={index} 
              student={student} 
              isCurrent={isCurrentTab}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Supervision</h1>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <InstructionsSection />

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm mb-6">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === 'current'
                ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            Current Students
            {data.current?.length > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded ${
                activeTab === 'current'
                  ? 'bg-white/20'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {data.current.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('graduated')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
              activeTab === 'graduated'
                ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Award className="w-4.5 h-4.5" />
            Graduated
            {data.graduated?.length > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded ${
                activeTab === 'graduated'
                  ? 'bg-white/20'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {data.graduated.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Main Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;