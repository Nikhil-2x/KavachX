// src/data/videosData.js
// Separate video data from component for better organization

export const videosData = [
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

export const categories = [
  { id: 'all', label: 'All Videos', color: 'from-blue-600 to-blue-400' },
  { id: 'beginner', label: 'Beginner', color: 'from-green-600 to-green-400' },
  { id: 'intermediate', label: 'Intermediate', color: 'from-yellow-600 to-yellow-400' },
  { id: 'advanced', label: 'Advanced', color: 'from-red-600 to-red-400' },
  { id: 'attacks', label: 'Attack Types', color: 'from-purple-600 to-purple-400' },
  { id: 'awareness', label: 'Awareness', color: 'from-pink-600 to-pink-400' }
];

// Helper function to get video by ID
export const getVideoById = (id) => {
  return videosData.find(video => video.id === id);
};

// Helper function to get videos by category
export const getVideosByCategory = (category) => {
  if (category === 'all') return videosData;
  return videosData.filter(video => video.category === category);
};

// Helper function to search videos
export const searchVideos = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return videosData.filter(video =>
    video.title.toLowerCase().includes(term) ||
    video.description.toLowerCase().includes(term) ||
    video.channel.toLowerCase().includes(term)
  );
};

// Helper function to get category label
export const getCategoryLabel = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.label : 'Unknown';
};

// Helper function to get category color
export const getCategoryColor = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.color : 'from-gray-600 to-gray-400';
};