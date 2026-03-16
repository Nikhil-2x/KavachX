// src/components/CyberAwareness_WithYouTubeAPI.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Play, Eye, Clock, User, X, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { searchCyberSecurityVideos, searchYouTubeVideos, getMultipleVideoStats } from '../services/youtubeService';

const CyberAwareness = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cybersecurity topics to search
  const cybersecurityTopics = [
    'cybersecurity beginner tutorial',
    'phishing attacks awareness',
    'ransomware prevention',
    'password security best practices',
    'network security fundamentals',
    'social engineering defense',
    'data breach response',
    'zero trust security model',
    'ethical hacking basics',
    'cybersecurity career'
  ];

  const categories = [
    { id: 'all', label: 'All Videos', color: 'from-blue-600 to-blue-400' },
    { id: 'beginner', label: 'Beginner', color: 'from-green-600 to-green-400' },
    { id: 'intermediate', label: 'Intermediate', color: 'from-yellow-600 to-yellow-400' },
    { id: 'advanced', label: 'Advanced', color: 'from-red-600 to-red-400' },
    { id: 'attacks', label: 'Attack Types', color: 'from-purple-600 to-purple-400' },
    { id: 'awareness', label: 'Awareness', color: 'from-pink-600 to-pink-400' }
  ];

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch videos for each topic
        const allVideos = await searchCyberSecurityVideos(cybersecurityTopics, 2);

        // Remove duplicates based on videoId
        const uniqueVideos = Array.from(
          new Map(allVideos.map(video => [video.youtubeId, video])).values()
        );

        // Sort by category then title
        const sortedVideos = uniqueVideos.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.title.localeCompare(b.title);
        });

        // Re-assign IDs after sorting
        const finalVideos = sortedVideos.map((video, index) => ({
          ...video,
          id: index + 1
        }));

        setVideos(finalVideos);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError(`Failed to fetch videos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchTerm, selectedCategory]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
          isDark ? 'bg-blue-600' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 ${
          isDark ? 'bg-purple-600' : 'bg-purple-400'
        }`}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${
            isDark ? '' : 'from-purple-600 to-pink-600'
          }`}>
            Cybersecurity Education Hub
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover top-rated YouTube videos on cybersecurity threats, defense strategies, and best practices.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg border ${
            isDark
              ? 'bg-red-900/20 border-red-500/30 text-red-300'
              : 'bg-red-50 border-red-300 text-red-700'
          }`}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className={`w-12 h-12 mb-4 animate-spin ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Loading cybersecurity videos from YouTube...
            </p>
          </div>
        ) : (
          <>
            {/* Search and filter section */}
            <div className="mb-12 space-y-6">
              {/* Search bar */}
              <div className="relative">
                <Search className={`absolute left-4 top-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search videos, channels, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-white/10 border border-purple-500/30 text-white placeholder-gray-400 focus:bg-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50'
                      : 'bg-white/50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30'
                  }`}
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-3">
                <div className={`flex items-center text-sm mr-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Filter size={16} className="mr-2" />
                  Filter by:
                </div>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : isDark
                          ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Results count */}
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing <span className="text-purple-400 font-semibold">{filteredVideos.length}</span> of <span className="text-purple-400 font-semibold">{videos.length}</span> videos
              </div>
            </div>

            {/* Videos grid */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredVideos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                    index={index}
                    isDark={isDark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No videos found matching your search. Try a different query or filter.
                </div>
              </div>
            )}

            {/* Video player modal */}
            {selectedVideo && (
              <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} isDark={isDark} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video, onClick, index, isDark }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`rounded-lg overflow-hidden transition-all duration-300 border ${
        isDark
          ? 'bg-white/10 border-purple-500/30 hover:border-purple-500'
          : 'bg-white/80 border-gray-300 hover:border-purple-500'
      }`}>
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/320x180?text=Video';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>
          {/* Duration badge */}
          {video.duration && video.duration !== 'N/A' && (
            <div className={`absolute bottom-2 right-2 text-white text-xs font-bold px-2 py-1 rounded ${
              isDark ? 'bg-black/75' : 'bg-black/80'
            }`}>
              <Clock size={12} className="inline mr-1" />
              {video.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`text-sm font-bold mb-2 line-clamp-2 transition-colors group-hover:text-purple-400 h-10 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {video.title}
          </h3>
          
          {/* Channel info */}
          <div className={`flex items-center text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <User size={12} className="mr-1" />
            <span className="truncate">{video.channel}</span>
          </div>

          {/* Stats */}
          <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            <div className="flex items-center">
              <Eye size={12} className="mr-1" />
              {video.views}
            </div>
            <span className={isDark ? 'text-gray-600' : 'text-gray-500'}>
              {video.uploadDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Modal Component
const VideoModal = ({ video, onClose, isDark }) => {
  if (!video) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors ${
        isDark ? 'bg-black/75 backdrop-blur' : 'bg-black/60 backdrop-blur'
      }`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg overflow-hidden max-w-4xl w-full transform transition-all duration-300 ${
          isDark ? 'bg-slate-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video iframe */}
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video details */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {video.title}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className={`flex flex-wrap gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {video.channel}
            </div>
            {video.views && video.views !== 'N/A' && (
              <div className="flex items-center">
                <Eye size={16} className="mr-2" />
                {video.views} views
              </div>
            )}
            {video.duration && video.duration !== 'N/A' && (
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {video.duration}
              </div>
            )}
            {video.uploadDate && (
              <span className={isDark ? 'text-gray-600' : 'text-gray-500'}>
                {video.uploadDate}
              </span>
            )}
          </div>

          {video.description && (
            <p className={`leading-relaxed text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {video.description.substring(0, 300)}...
            </p>
          )}

          <div className="flex gap-4">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center"
            >
              Open on YouTube
            </a>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAwareness;