import React, { useState, useMemo } from 'react';
import { Search, Filter, Play, Eye, Clock, User } from 'lucide-react';

const CyberSecurityVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Video data structure
  const videosData = [
    {
      id: 1,
      title: 'Introduction to Cybersecurity: A Beginner\'s Guide',
      category: 'beginner',
      youtubeId: 'InDQFZrHJPA',
      thumbnail: 'https://img.youtube.com/vi/InDQFZrHJPA/maxresdefault.jpg',
      duration: '12:45',
      views: '2.5M',
      channel: 'Cybersecurity Guide',
      description: 'Learn the fundamentals of cybersecurity including key concepts, threats, and basic protection strategies.',
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Understanding Phishing Attacks and How to Stay Safe',
      category: 'attacks',
      youtubeId: 'bYmqOBNpqVM',
      thumbnail: 'https://img.youtube.com/vi/bYmqOBNpqVM/maxresdefault.jpg',
      duration: '8:30',
      views: '1.8M',
      channel: 'Security Awareness',
      description: 'Discover what phishing is, how cybercriminals execute these attacks, and practical tips to protect yourself.',
      uploadDate: '2024-02-10'
    },
    {
      id: 3,
      title: 'Password Security and Authentication Best Practices',
      category: 'beginner',
      youtubeId: '6gD8-VB4EKU',
      thumbnail: 'https://img.youtube.com/vi/6gD8-VB4EKU/maxresdefault.jpg',
      duration: '10:15',
      views: '1.2M',
      channel: 'Tech Security Pro',
      description: 'Master the art of creating strong passwords and implementing multi-factor authentication for maximum security.',
      uploadDate: '2024-01-28'
    },
    {
      id: 4,
      title: 'Ransomware: What It Is and How to Prevent It',
      category: 'attacks',
      youtubeId: 'HzX0gQ2c3QE',
      thumbnail: 'https://img.youtube.com/vi/HzX0gQ2c3QE/maxresdefault.jpg',
      duration: '15:20',
      views: '3.1M',
      channel: 'Cyber Threats Analysis',
      description: 'Comprehensive overview of ransomware attacks, their impact, and essential prevention strategies for individuals and organizations.',
      uploadDate: '2024-02-05'
    },
    {
      id: 5,
      title: 'Network Security Fundamentals Explained',
      category: 'intermediate',
      youtubeId: 'dvlDYW7t-T4',
      thumbnail: 'https://img.youtube.com/vi/dvlDYW7t-T4/maxresdefault.jpg',
      duration: '18:45',
      views: '890K',
      channel: 'Network Academy',
      description: 'Deep dive into network security concepts, firewalls, VPNs, and how to secure your digital infrastructure.',
      uploadDate: '2024-02-20'
    },
    {
      id: 6,
      title: 'Data Breach Response: What To Do If You\'re Affected',
      category: 'awareness',
      youtubeId: 'l-c0H0P3f4E',
      thumbnail: 'https://img.youtube.com/vi/l-c0H0P3f4E/maxresdefault.jpg',
      duration: '11:30',
      views: '756K',
      channel: 'Cybersecurity Today',
      description: 'Step-by-step guide on what to do immediately after a data breach and how to minimize damage.',
      uploadDate: '2024-01-20'
    },
    {
      id: 7,
      title: 'Zero Trust Security Model: The Future of Cybersecurity',
      category: 'advanced',
      youtubeId: 'TX6ta6rVDI0',
      thumbnail: 'https://img.youtube.com/vi/TX6ta6rVDI0/maxresdefault.jpg',
      duration: '22:10',
      views: '547K',
      channel: 'Enterprise Security',
      description: 'Understand the Zero Trust model and how it revolutionizes how organizations approach security.',
      uploadDate: '2024-02-12'
    },
    {
      id: 8,
      title: 'Social Engineering Tactics and Defense Strategies',
      category: 'attacks',
      youtubeId: 'dHa_r81nPwQ',
      thumbnail: 'https://img.youtube.com/vi/dHa_r81nPwQ/maxresdefault.jpg',
      duration: '14:00',
      views: '1.5M',
      channel: 'Security Awareness',
      description: 'Learn about social engineering techniques used by hackers and how to defend against manipulation tactics.',
      uploadDate: '2024-02-18'
    },
    {
      id: 9,
      title: 'Cybersecurity Career Path: Getting Started',
      category: 'beginner',
      youtubeId: 'WzLKcMPnEyc',
      thumbnail: 'https://img.youtube.com/vi/WzLKcMPnEyc/maxresdefault.jpg',
      duration: '16:30',
      views: '2.0M',
      channel: 'Career in Tech',
      description: 'Explore cybersecurity as a career, required skills, certifications, and job opportunities in the field.',
      uploadDate: '2024-02-01'
    },
    {
      id: 10,
      title: 'Ethical Hacking Basics: Learning Penetration Testing',
      category: 'advanced',
      youtubeId: '_lsEGR-1gxo',
      thumbnail: 'https://img.youtube.com/vi/_lsEGR-1gxo/maxresdefault.jpg',
      duration: '20:45',
      views: '1.3M',
      channel: 'Hack Academy',
      description: 'Introduction to ethical hacking and penetration testing fundamentals for security professionals.',
      uploadDate: '2024-02-08'
    }
  ];

  // Categories
  const categories = [
    { id: 'all', label: 'All Videos', color: 'from-blue-600 to-blue-400' },
    { id: 'beginner', label: 'Beginner', color: 'from-green-600 to-green-400' },
    { id: 'intermediate', label: 'Intermediate', color: 'from-yellow-600 to-yellow-400' },
    { id: 'advanced', label: 'Advanced', color: 'from-red-600 to-red-400' },
    { id: 'attacks', label: 'Attack Types', color: 'from-purple-600 to-purple-400' },
    { id: 'awareness', label: 'Awareness', color: 'from-pink-600 to-pink-400' }
  ];

  // Filter and search videos
  const filteredVideos = useMemo(() => {
    return videosData.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.channel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cybersecurity Education Hub
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore top-rated educational videos on cybersecurity threats, defense strategies, and best practices to keep yourself and your organization secure.
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos, channels, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center text-gray-400 text-sm mr-4">
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
                    : 'bg-slate-700 bg-opacity-50 text-gray-300 hover:bg-opacity-75'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-400">
            Showing <span className="text-blue-400 font-semibold">{filteredVideos.length}</span> of <span className="text-blue-400 font-semibold">{videosData.length}</span> videos
          </div>
        </div>

        {/* Videos grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
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
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                        <Play size={24} className="text-white fill-white" />
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-bold px-2 py-1 rounded">
                      <Clock size={12} className="inline mr-1" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    
                    {/* Channel info */}
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <User size={12} className="mr-1" />
                      {video.channel}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {video.views}
                      </div>
                      <span className="text-gray-600">{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No videos found matching your search. Try a different query or filter.
            </div>
          </div>
        )}

        {/* Video player modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-slate-800 rounded-lg overflow-hidden max-w-4xl w-full transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video iframe */}
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    {selectedVideo.channel}
                  </div>
                  <div className="flex items-center">
                    <Eye size={16} className="mr-2" />
                    {selectedVideo.views} views
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {selectedVideo.duration}
                  </div>
                  <span className="text-gray-600">{selectedVideo.uploadDate}</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedVideo.description}</p>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberSecurityVideos;