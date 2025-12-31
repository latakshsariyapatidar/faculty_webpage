/**
 * Research Page Component - Compact Reusable Layout
 * Last research item expanded by default on page load
 * Proper expand/collapse logic - only one expanded at a time
 * Space-efficient design with no wasted areas
 * Completely data-driven from JSON
 * 
 * @module pages/ResearchPage
 */

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Mail, Target, Users, Award } from 'lucide-react';

function ResearchPage({ data }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [expandedResearch, setExpandedResearch] = useState(null);

  // Get requirements for specific position
  const getRequirementsForPosition = (positionId) => {
    return data.fundingInfo.requirements
      ?.filter(req => req.position_id === positionId || !req.position_id)
      ?.map(req => typeof req === 'object' ? req.requirement : req) || [];
  };

  const facultyEmail = data?.facultyEmail || '';

  // Extract data safely
  const researchInterests = data?.interests || [];
  const fundingInfo = data?.fundingInfo || {};
  const requirements = fundingInfo.requirements || [];

  // Set the last research item as expanded by default on initial load
  useEffect(() => {
    if (researchInterests.length > 0) {
      setExpandedResearch(researchInterests.length - 1); // Last item index
    }
  }, [researchInterests.length]);

  // Handle research item click - only one can be expanded at a time
  const handleResearchToggle = (index) => {
    setExpandedResearch(expandedResearch === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-purple-700 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            {/* <Target className="h-5 w-5" /> */}
            <div>
              <h1 className="text-lg font-bold">Research</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          
          {/* Research Interests Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h2 className="font-bold text-gray-900">Research Interests</h2>
                  {researchInterests.length > 0 && (
                    <span className="text-xs text-gray-500">
                      ({researchInterests.length} areas)
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                {researchInterests.length > 0 ? (
                  <div className="space-y-2">
                    {researchInterests.map((interest, index) => {
                      const title = typeof interest === 'object' ? interest.title : interest;
                      const description = typeof interest === 'object' ? interest.description : '';
                      const image = typeof interest === 'object' ? interest.image : '';
                      const isExpanded = expandedResearch === index;
                      const isLastItem = index === researchInterests.length - 1;

                      return (
                        <div 
                          key={index} 
                          className={`border ${isExpanded ? 'border-purple-300' : 'border-gray-200'} rounded-md hover:border-purple-300 transition-colors cursor-pointer`}
                          onClick={() => handleResearchToggle(index)}
                        >
                          {/* Compact Header - Always Visible */}
                          <div className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded ${isExpanded ? 'bg-gradient-to-r from-purple-600 to-amber-600' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
                                  <span className={`text-xs font-bold ${isExpanded ? 'text-white' : 'text-gray-700'}`}>
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                    {title}
                                  </h3>
                                </div>
                              </div>
                              {description && (
                                <div className="flex items-center gap-1">
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4 text-purple-600" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Expanded Content - Only shows when this item is expanded */}
                          {isExpanded && description && (
                            <div className="border-t border-gray-200 p-3 animate-fadeIn">
                              <div className="space-y-3">
                                {/* Description */}
                                <div className="text-gray-700 text-sm">
                                  {description}
                                </div>
                                
                                {/* Image if exists */}
                                {image && (
                                  <div className="mt-2">
                                    <img 
                                      src={image} 
                                      alt={title}
                                      className="w-full h-40 object-cover rounded-md border border-gray-300"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">Research interests information available soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Positions & Requirements */}
          <div className="space-y-4">
            {/* Positions Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  <h2 className="font-bold text-gray-900">Available Positions</h2>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {/* PhD Position */}
                  <div className="border border-purple-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="font-semibold text-gray-900 text-sm">PhD Positions</span>
                      </div>
                      {fundingInfo.phdPositions && (
                        <span className="font-bold text-purple-700">
                          {fundingInfo.phdPositions}
                        </span>
                      )}
                    </div>
                    {fundingInfo.phd_application_link && (
                      <a
                        href={fundingInfo.phd_application_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 w-full justify-center px-3 py-2 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Apply
                      </a>
                    )}
                  </div>

                  {/* M.Tech Position */}
                  <div className="border border-amber-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-semibold text-gray-900 text-sm">M.Tech Positions</span>
                      </div>
                      {fundingInfo.mtechPositions && (
                        <span className="font-bold text-amber-700">
                          {fundingInfo.mtechPositions}
                        </span>
                      )}
                    </div>
                    {fundingInfo.mtech_application_link && (
                      <a
                        href={fundingInfo.mtech_application_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 w-full justify-center px-3 py-2 bg-amber-600 text-white text-xs font-medium rounded hover:bg-amber-700 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Apply
                      </a>
                    )}
                  </div>
                </div>

                {/* Application Note */}
                {fundingInfo.note && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-gray-700 text-xs">{fundingInfo.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gray-600" />
                  <h2 className="font-bold text-gray-900">Requirements</h2>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {/* Requirements Accordions */}
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setSelectedPosition(selectedPosition === 'phd' ? null : 'phd')}
                      className="w-full p-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="font-medium text-gray-900 text-sm">PhD Requirements</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${selectedPosition === 'phd' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {selectedPosition === 'phd' && (
                      <div className="p-3 bg-white border-t border-gray-300">
                        <div className="space-y-2">
                          {getRequirementsForPosition('phd').map((req, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                                ✓
                              </span>
                              <span className="text-gray-700 text-xs">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => setSelectedPosition(selectedPosition === 'mtech' ? null : 'mtech')}
                      className="w-full p-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-medium text-gray-900 text-sm">M.Tech Requirements</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${selectedPosition === 'mtech' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {selectedPosition === 'mtech' && (
                      <div className="p-3 bg-white border-t border-gray-300">
                        <div className="space-y-2">
                          {getRequirementsForPosition('mtech').map((req, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                                ✓
                              </span>
                              <span className="text-gray-700 text-xs">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* General Requirements */}
                  {getRequirementsForPosition('').length > 0 && (
                    <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">General Requirements</h4>
                      <div className="space-y-2">
                        {getRequirementsForPosition('').map((req, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                              •
                            </span>
                            <span className="text-gray-700 text-xs">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-purple-600 to-amber-600 rounded-lg p-4 text-white shadow">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                <h3 className="font-bold text-sm">Contact for Research</h3>
              </div>
              
              {(fundingInfo.phd_email_template || fundingInfo.mtech_email_template) ? (
                <div className="space-y-2">
                  {fundingInfo.phd_email_template && (
                    <span>
                  <p className='font-semibold text-sm'>Phd:</p>
                      <p className="text-xs">
                      {fundingInfo.phd_email_template.replace('{faculty_email}', facultyEmail)}
                    </p></span>
                    
                    // </div>
                  )}
                  {fundingInfo.mtech_email_template && (
                    <span>
                  <p className='font-semibold text-sm'>Mtech:</p>
                     <span> <p className="text-xs">
                      {fundingInfo.mtech_email_template.replace('{faculty_email}', facultyEmail)}
                    </p></span>
                    </span>
                    
                  )}
                </div>
              ) : (
                <a
                  href={`mailto:${facultyEmail}?subject=Research Position Inquiry`}
                  className="inline-flex items-center gap-1 w-full justify-center px-3 py-2 bg-white text-gray-800 text-xs font-medium rounded hover:bg-gray-100 transition-colors mt-2"
                >
                  <Mail className="h-3 w-3" />
                  Email Inquiry
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ResearchPage;