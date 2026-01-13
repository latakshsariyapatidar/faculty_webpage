import React, { useState, useMemo } from "react";
import {
  ExternalLink,
  Calendar,
  BookOpen,
  Video,
  FileCode,
  FileText,
  Link2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ---------- ICON MAP ---------- */
const ICON_MAP = {
  "Lecture Notes": BookOpen,
  Video: Video,
  Code: FileCode,
  Assignment: FileText,
  Reference: Link2,
};

/* ---------- RESOURCE CARD ---------- */
function ResourceCard({ resource }) {
  const [expanded, setExpanded] = useState(false);

  /* ---- SAFE BACKEND FALLBACKS ---- */
  const title = resource?.title?.trim() || "Untitled Resource";
  const description =
    resource?.description?.trim() ||
    "No description provided for this resource.";
  const category = resource?.category || "Other";
  const date = resource?.date || "—";
  const link = resource?.link;

  const Icon = ICON_MAP[category] || FileText;
  const isLong = description.length > 120;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-purple-300 transition flex flex-col">
      <div className="p-4 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 break-words">
              {title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 rounded border border-purple-100">
                {category}
              </span>

              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-xs text-gray-600 leading-relaxed break-words overflow-hidden">
          <div
            className={`transition-all duration-300 ${
              expanded ? "max-h-40" : "max-h-14"
            } overflow-hidden`}
          >
            {description}
          </div>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-purple-600 font-medium inline-flex items-center gap-1"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? "Less" : "More"}
            </button>
          )}
        </div>

        {/* Action */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white rounded-md bg-purple-600 hover:bg-purple-700 transition"
          >
            <ExternalLink size={14} />
            Access Resource
          </a>
        )}
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */
function ResourcesPage({ data = [] }) {
  const today = useMemo(
    () => new Date().toLocaleDateString(),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 sticky top-0 z-20 shadow">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <BookOpen className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Academic Resources
              </h1>
              <p className="text-xs text-purple-100">
                Course materials & references
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {data.map((res, i) => (
            <ResourceCard key={i} resource={res} />
          ))}
        </div>
      </div>


    </div>
  );
}

export default ResourcesPage;
