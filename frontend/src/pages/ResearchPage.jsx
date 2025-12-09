/**
 * Research Page Component
 * 
 * Displays research interests with images and descriptions,
 * student positions available with position-specific requirements.
 * 
 * @module pages/ResearchPage
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Mail } from 'lucide-react';

/**
 * Research page component
 * 
 * @param {Object} props
 * @param {Object} props.data - Research data
 * @param {Array} props.data.interests - Research interests list with images
 * @param {Object} props.data.fundingInfo - Student position information
 * @returns {JSX.Element}
 */
function ResearchPage({ data }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const getRequirementsForPosition = (positionId) => {
    return data.fundingInfo.requirements
      .filter(req => req.position_id === positionId || !req.position_id)
      .map(req => typeof req === 'object' ? req.requirement : req);
  };

  const facultyEmail = data?.facultyEmail || 'faculty@iitdh.ac.in';

  return (
    <div className="space-y-12">
      {/* Research Interests */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Interests</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          {data.interests.map((interest, i) => {
            const title = typeof interest === 'object' ? interest.title : interest;
            const description = typeof interest === 'object' ? interest.description : '';
            const image = typeof interest === 'object' ? interest.image : '';

            return (
              <div key={i} className="group">
                {/* With Image and Description */}
                {(image || description) ? (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      {image && (
                        <div className="md:w-2/5 shrink-0">
                          <img 
                            src={image} 
                            alt={title}
                            className="w-full h-auto object-cover rounded-lg shadow-sm border border-gray-100"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex gap-4 items-start">
                          <div className="flex flex-col items-center">
                            <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold mb-2">
                              {i + 1}
                            </span>
                            <div className="w-0.5 h-full bg-gradient-to-b from-purple-200 to-transparent"></div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{title}</h3>
                            {description && (
                              <p className="text-gray-700 leading-relaxed text-base">{description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Simple List Item */
                  <div className="flex gap-4 items-center bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-purple-200 transition-all duration-300 group-hover:bg-white">
                    <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-800 text-base font-medium leading-relaxed">{title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Positions */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Positions</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full"></div>
        </div>
        
        <div className="space-y-8">
          {/* Positions Available */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-25 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-900">PhD Positions</h3>
              </div>
              <p className="text-2xl font-bold text-purple-700 mb-2">{data.fundingInfo.phdPositions || 0}</p>
              <p className="text-sm text-gray-600 font-medium">Available positions</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-25 rounded-xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-900">M.Tech Positions</h3>
              </div>
              <p className="text-2xl font-bold text-amber-700 mb-2">{data.fundingInfo.mtechPositions || 0}</p>
              <p className="text-sm text-gray-600 font-medium">Available positions</p>
            </div>
          </div>
          
          {/* Position-Specific Requirements */}
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Position Requirements</h3>
              <div className="w-12 h-0.5 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* PhD Requirements */}
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => setSelectedPosition(selectedPosition === 'phd' ? null : 'phd')}
                className="w-full bg-gradient-to-r from-purple-50 to-purple-25 p-5 flex items-center justify-between hover:from-purple-100 hover:to-purple-50 transition-all duration-300 border-b border-gray-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-lg font-semibold text-gray-900">PhD Position Requirements</span>
                </div>
                {selectedPosition === 'phd' ? 
                  <ChevronUp size={20} className="text-purple-600 transform group-hover:scale-110 transition-transform" /> : 
                  <ChevronDown size={20} className="text-purple-600 transform group-hover:scale-110 transition-transform" />
                }
              </button>
              
              {selectedPosition === 'phd' && (
                <div className="p-6 bg-white animate-fadeIn">
                  <div className="space-y-5">
                    {/* Requirements List */}
                    <div className="space-y-3">
                      {getRequirementsForPosition('phd').map((req, i) => (
                        <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors duration-200">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 shadow-sm">
                            ✓
                          </span>
                          <span className="flex-1 text-gray-700 text-base leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Application Options */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h4>
                      
                      {/* Application Link Button */}
                      {data.fundingInfo.phd_application_link && (
                        <a
                          href={data.fundingInfo.phd_application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-sm hover:shadow-md mb-4"
                        >
                          <ExternalLink size={18} />
                          Apply for PhD Position
                        </a>
                      )}

                      {/* Email Template */}
                      {data.fundingInfo.phd_email_template && (
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                          <div className="flex items-start gap-3">
                            <Mail size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-base leading-relaxed">
                              {data.fundingInfo.phd_email_template.replace('{faculty_email}', facultyEmail)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Default Contact Info */}
                      {!data.fundingInfo.phd_application_link && !data.fundingInfo.phd_email_template && (
                        <div className="space-y-4">
                          <a
                            href={`mailto:${facultyEmail}?subject=PhD Position Application`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <Mail size={18} />
                            Contact via Email
                          </a>

                          {data.fundingInfo.note && (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                              <p className="text-gray-700 text-base leading-relaxed">
                                <strong className="text-purple-700">Application Instructions:</strong> {data.fundingInfo.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* M.Tech Requirements */}
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => setSelectedPosition(selectedPosition === 'mtech' ? null : 'mtech')}
                className="w-full bg-gradient-to-r from-amber-50 to-amber-25 p-5 flex items-center justify-between hover:from-amber-100 hover:to-amber-50 transition-all duration-300 border-b border-gray-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-lg font-semibold text-gray-900">M.Tech Position Requirements</span>
                </div>
                {selectedPosition === 'mtech' ? 
                  <ChevronUp size={20} className="text-amber-600 transform group-hover:scale-110 transition-transform" /> : 
                  <ChevronDown size={20} className="text-amber-600 transform group-hover:scale-110 transition-transform" />
                }
              </button>
              
              {selectedPosition === 'mtech' && (
                <div className="p-6 bg-white animate-fadeIn">
                  <div className="space-y-5">
                    {/* Requirements List */}
                    <div className="space-y-3">
                      {getRequirementsForPosition('mtech').map((req, i) => (
                        <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-amber-200 transition-colors duration-200">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 shadow-sm">
                            ✓
                          </span>
                          <span className="flex-1 text-gray-700 text-base leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    {/* Application Options */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h4>
                      
                      {/* Application Link Button */}
                      {data.fundingInfo.mtech_application_link && (
                        <a
                          href={data.fundingInfo.mtech_application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 shadow-sm hover:shadow-md mb-4"
                        >
                          <ExternalLink size={18} />
                          Apply for M.Tech Position
                        </a>
                      )}

                      {/* Email Template */}
                      {data.fundingInfo.mtech_email_template && (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
                          <div className="flex items-start gap-3">
                            <Mail size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-base leading-relaxed">
                              {data.fundingInfo.mtech_email_template.replace('{faculty_email}', facultyEmail)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Default Contact Info */}
                      {!data.fundingInfo.mtech_application_link && !data.fundingInfo.mtech_email_template && (
                        <div className="space-y-4">
                          <a
                            href={`mailto:${facultyEmail}?subject=M.Tech Position Application`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <Mail size={18} />
                            Contact via Email
                          </a>

                          {data.fundingInfo.note && (
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                              <p className="text-gray-700 text-base leading-relaxed">
                                <strong className="text-amber-700">Application Instructions:</strong> {data.fundingInfo.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* General Requirements */}
            {getRequirementsForPosition('').length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-25 rounded-xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">General Requirements</h4>
                <div className="space-y-3">
                  {getRequirementsForPosition('').map((req, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 shadow-sm">
                        ✓
                      </span>
                      <span className="flex-1 text-gray-700 text-base leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ResearchPage;