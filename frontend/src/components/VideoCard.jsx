// src/components/VideoCard.jsx
// Reusable video card component for displaying individual videos

import React from 'react';
import { Play, Eye, Clock, User } from 'lucide-react';

const VideoCard = ({ video, onClick, index = 0 }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300 backdrop-blur">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/320x180?text=Video+Unavailable';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <Clock size={12} className="mr-1" />
            {video.duration}
          </div>

          {/* Category badge */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded capitalize">
            {video.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors h-10">
            {video.title}
          </h3>
          
          {/* Channel info */}
          <div className="flex items-center text-xs text-gray-400 mb-3">
            <User size={12} className="mr-1" />
            <span className="truncate">{video.channel}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Eye size={12} className="mr-1" />
              {video.views}
            </div>
            <span className="text-gray-600">{formatDate(video.uploadDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Helper function to format date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (e.g., "Jan 15")
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default VideoCard;