/**
 * Professional Students Page Component for IIT Dharwad
 * Amber & Purple Theme - Visually appealing, data-driven, and fully reusable
 * Responsive design with elegant handling of missing data
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
  ExternalLink,
  FileText,
  Building,
  Sparkles
} from 'lucide-react';

function StudentsPage({ data }) {
  const [activeTab, setActiveTab] = useState('current');

  // Theme colors
  const theme = {
    primary: '#8B5CF6', // Purple
    secondary: '#F59E0B', // Amber
    lightPurple: '#F3E8FF',
    lightAmber: '#FEF3C7',
    darkPurple: '#7C3AED',
    darkAmber: '#D97706',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  };

  // Helper functions for data extraction
  const getStudentProgram = (student) => {
    return student.program || student.degree_type || '';
  };

  const getStudentYear = (student) => {
    return student.year || student.end_date || '';
  };

  const getStudentTopic = (student) => {
    return student.topic || student.thesis_title || student.thesis || '';
  };

  const getStudentPlacement = (student) => {
    return student.placement || '';
  };

  const getStudentName = (student) => {
    return student.name || 'Student';
  };

  const isPhDStudent = (student) => {
    const program = getStudentProgram(student).toLowerCase();
    return program.includes('phd') || program.includes('ph.d') || program.includes('doctoral');
  };

  const isMSStudent = (student) => {
    const program = getStudentProgram(student).toLowerCase();
    return program.includes('ms') || program.includes('m.tech') || program.includes('masters');
  };

  // Filter students
  const phdCurrent = (data.current || []).filter(isPhDStudent);
  const msCurrent = (data.current || []).filter(isMSStudent);
  const otherCurrent = (data.current || []).filter(s => !isPhDStudent(s) && !isMSStudent(s));
  
  const phdGraduated = (data.graduated || []).filter(isPhDStudent);
  const msGraduated = (data.graduated || []).filter(isMSStudent);
  const otherGraduated = (data.graduated || []).filter(s => !isPhDStudent(s) && !isMSStudent(s));

  // Student Card Component
  const StudentCard = ({ student, isCurrent = false, index }) => {
    const program = getStudentProgram(student);
    const year = getStudentYear(student);
    const topic = getStudentTopic(student);
    const placement = getStudentPlacement(student);
    const name = getStudentName(student);
    const isPhD = isPhDStudent(student);
    const isMS = isMSStudent(student);

    // Determine card style based on student type
    const cardStyle = {
      phd: {
        borderLeft: `4px solid ${theme.primary}`,
        bg: theme.lightPurple,
        iconBg: theme.primary
      },
      ms: {
        borderLeft: `4px solid ${theme.secondary}`,
        bg: theme.lightAmber,
        iconBg: theme.secondary
      },
      other: {
        borderLeft: `4px solid ${theme.gray[300]}`,
        bg: theme.gray[50],
        iconBg: theme.gray[500]
      }
    };

    const style = isPhD ? cardStyle.phd : isMS ? cardStyle.ms : cardStyle.other;
    const Icon = isCurrent ? Users : Award;

    return (
      <div 
        className="relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] group"
        style={style}
      >
        {/* Header with program tag */}
        <div className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${style.iconBg}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: style.iconBg }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
                  {program && (
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      <span 
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${style.iconBg}15`,
                          color: style.iconBg
                        }}
                      >
                        {program}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                          <div className="w-1 h-1 rounded-full bg-green-500"></div>
                          Active
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Year */}
              {year && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>{year}</span>
                </div>
              )}

              {/* Topic/Thesis */}
              {topic && (
                <div className="mb-2">
                  <div className="flex items-start gap-1.5">
                    <BookOpen className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-0.5">
                        {isCurrent ? 'Research Topic' : 'Thesis'}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {topic}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Placement for graduated students */}
              {!isCurrent && placement && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Placement</p>
                      <p className="text-xs text-gray-600 mt-0.5">{placement}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
             style={{
               background: `linear-gradient(135deg, ${style.iconBg}20, transparent)`
             }}>
        </div>
      </div>
    );
  };

  // Instructions Section
  const InstructionsSection = () => {
    if (!data.instructions || data.instructions.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-purple-50 to-amber-50 p-4">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10"
               style={{
                 background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`
               }}>
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-900">Application & Contact</h2>
                <p className="text-xs text-gray-600 mt-0.5">Research position opportunities</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              {data.instructions.map((inst, i) => {
                const hasLink = inst.includes('http') || inst.includes('https');
                
                return (
                  <div 
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 hover:border-purple-200 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                           style={{ backgroundColor: `${theme.primary}15` }}>
                        <ExternalLink className="w-3 h-3" style={{ color: theme.primary }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {inst}
                          {hasLink && (
                            <span className="inline-flex items-center gap-1 ml-2 text-purple-600">
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Statistics Banner
  const StatisticsBanner = () => {
    const totalCurrent = (data.current || []).length;
    const totalGraduated = (data.graduated || []).length;
    const totalStudents = totalCurrent + totalGraduated;

    if (totalStudents === 0) return null;

    const stats = [
      {
        label: 'Current Students',
        value: totalCurrent,
        icon: Users,
        color: theme.secondary,
        description: 'Active research scholars'
      },
      {
        label: 'PhD Students',
        value: phdCurrent.length + phdGraduated.length,
        icon: GraduationCap,
        color: theme.primary,
        description: 'Doctoral candidates'
      },
      {
        label: 'MS Students',
        value: msCurrent.length + msGraduated.length,
        icon: FileText,
        color: theme.darkAmber,
        description: 'Master\'s candidates'
      },
      {
        label: 'Graduated',
        value: totalGraduated,
        icon: Award,
        color: theme.darkPurple,
        description: 'Alumni & graduates'
      }
    ].filter(stat => stat.value > 0);

    if (stats.length === 0) return null;

    return (
      <div className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
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
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
             style={{ backgroundColor: `${theme.primary}10` }}>
          {React.createElement(icon, { 
            className: "w-8 h-8",
            style: { color: theme.primary }
          })}
        </div>
        <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">{description}</p>
        {isCurrent && data.instructions && data.instructions.length > 0 && (
          <p className="text-sm text-gray-500">
            Check application information above for opportunities.
          </p>
        )}
      </div>
    );
  };

  // Render content based on active tab
  const renderContent = () => {
    const isCurrentTab = activeTab === 'current';
    const students = isCurrentTab ? data.current : data.graduated;
    const hasStudents = students && students.length > 0;

    if (!hasStudents) {
      return <EmptyState type={isCurrentTab ? 'current' : 'graduated'} />;
    }

    const studentGroups = isCurrentTab 
      ? [
          { title: 'PhD Students', students: phdCurrent, color: theme.primary },
          { title: 'MS Students', students: msCurrent, color: theme.secondary },
          { title: 'Other Students', students: otherCurrent, color: theme.gray[500] }
        ]
      : [
          { title: 'PhD Graduates', students: phdGraduated, color: theme.primary },
          { title: 'MS Graduates', students: msGraduated, color: theme.secondary },
          { title: 'Other Graduates', students: otherGraduated, color: theme.gray[500] }
        ];

    return (
      <div className="space-y-4">
        {studentGroups.map((group, groupIndex) => 
          group.students.length > 0 && (
            <div key={groupIndex} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: group.color }}></div>
                  <div>
                    <h2 className="text-base font-medium text-gray-900">{group.title}</h2>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${group.color}15`,
                        color: group.color
                      }}>
                  {group.students.length}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.students.map((student, index) => (
                  <StudentCard 
                    key={index} 
                    student={student} 
                    isCurrent={isCurrentTab}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  {/* <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-purple-400 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div> */}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Student Supervison</h1>
                  {/* <p className="text-gray-600 mt-2">Research guidance and academic mentorship</p> */}
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            {/* </div> */}
          </div>
        </div>

        {/* Instructions Section */}
        <InstructionsSection />

        {/* Statistics Banner */}
        {/* <StatisticsBanner /> */}

        {/* Main Content */}
        <div className="flex space-x-1.5 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'current'
                    ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
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
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'graduated'
                    ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Award className="w-4 h-4" />
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
        <div className="mb-4 mt-4">
          {renderContent()}
        </div>

        {/* Footer Summary */}
        {/* {(data.current?.length > 0 || data.graduated?.length > 0) && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl border border-gray-200 p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Supervision Excellence</h3>
                  <p className="text-gray-600 max-w-2xl">
                    A legacy of academic mentorship with focus on cutting-edge research 
                    and professional development in alignment with IIT Dharwad's commitment 
                    to excellence in engineering education.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2"
                       style={{ 
                         background: 'linear-gradient(135deg, #8B5CF6, #F59E0B)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent'
                       }}>
                    {(data.current?.length || 0) + (data.graduated?.length || 0)}
                  </div>
                  <p className="text-sm text-gray-600">Total students mentored</p>
                  <div className="flex gap-6 mt-4 text-sm text-gray-700">
                    {data.current?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                        <span>{data.current.length} current</span>
                      </div>
                    )}
                    {data.graduated?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                        <span>{data.graduated.length} graduated</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default StudentsPage;