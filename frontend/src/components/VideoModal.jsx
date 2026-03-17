// src/components/VideoModal.jsx
// Reusable modal component for displaying YouTube videos with details

import React from 'react';
import { Eye, Clock, User, X } from 'lucide-react';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg overflow-hidden max-w-4xl w-full transform transition-all duration-300 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video iframe container */}
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-300 z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video details */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white leading-snug">
            {video.title}
          </h2>

          {/* Meta information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center hover:text-blue-400 transition-colors">
              <User size={16} className="mr-2" />
              <span>{video.channel}</span>
            </div>
            <div className="flex items-center hover:text-blue-400 transition-colors">
              <Eye size={16} className="mr-2" />
              <span>{video.views} views</span>
            </div>
            <div className="flex items-center hover:text-blue-400 transition-colors">
              <Clock size={16} className="mr-2" />
              <span>{video.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>

          {/* Category badge */}
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block bg-blue-600 bg-opacity-30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {video.category}
            </span>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">About this video</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {video.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center"
            >
              Watch on YouTube
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Helper function to format date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (e.g., "January 15, 2024")
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default VideoModal;