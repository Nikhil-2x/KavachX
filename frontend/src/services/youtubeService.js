// frontend/src/services/youtubeService.js - ULTRA-OPTIMIZED WITH BACKWARD COMPATIBILITY
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000';

console.log('YouTube Service - Ultra-Optimized Mode');
console.log('API Base URL:', API_BASE_URL);

/**
 * Search multiple topics with minimal queries
 * OPTIMIZATION:
 * - Only 5 topics (not 10)
 * - Only 1 video per topic (not 2)
 * - Skip stats by default (includeStats: false)
 * Result: ~5 queries instead of 2000!
 */
export const searchCyberSecurityVideos = async (topics = null, videosPerTopic = 1, includeStats = false) => {
  try {
    // Default to 5 essential topics
    const defaultTopics = [
      'cybersecurity beginner tutorial',
      'phishing attacks awareness',
      'ransomware prevention',
      'password security best practices',
      'network security fundamentals'
    ];

    const topicsToSearch = topics || defaultTopics;

    console.log('Searching', topicsToSearch.length, 'topics');
    console.log('Videos per topic:', videosPerTopic);
    console.log('Include stats:', includeStats);
    console.log('Expected queries: ~' + topicsToSearch.length);

    const url = `${API_BASE_URL}/youtube/search-multiple`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topics: topicsToSearch,
        videosPerTopic: videosPerTopic,
        includeStats: includeStats
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const videos = await response.json();
    console.log('Total videos found:', videos.length);
    console.log('✅ Load complete with minimal queries!');
    return videos;
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

/**
 * Lightweight search - even fewer queries
 * Returns only: title, thumbnail, channel
 * No stats needed
 */
export const searchYouTubeLight = async (query, maxResults = 3) => {
  try {
    console.log('Light search for:', query);
    
    const url = `${API_BASE_URL}/youtube/search-light?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const videos = await response.json();
    console.log(`Found ${videos.length} videos (no stats = no extra queries!)`);
    return videos;
  } catch (error) {
    console.error('Light search error:', error);
    return [];
  }
};

/**
 * Search YouTube videos (backward compatible)
 * Wrapper for searchYouTubeLight
 */
export const searchYouTubeVideos = async (query, maxResults = 10) => {
  return searchYouTubeLight(query, maxResults);
};

/**
 * Get video statistics (backward compatible)
 * Ultra-optimized version skips stats, but this keeps component compatibility
 */
export const getMultipleVideoStats = async (videoIds) => {
  // Return dummy stats to avoid errors in components expecting this function
  const statsMap = {};
  videoIds.forEach(id => {
    statsMap[id] = {
      views: 'N/A',
      duration: 'N/A'
    };
  });
  return statsMap;
};

/**
 * Get cache stats
 */
export const getCacheStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube/cache-stats`);
    return await response.json();
  } catch (error) {
    console.error('Cache stats error:', error);
    return null;
  }
};

/**
 * Clear cache
 */
export const clearCache = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube/clear-cache`);
    return await response.json();
  } catch (error) {
    console.error('Clear cache error:', error);
    return null;
  }
};

export default {
  searchCyberSecurityVideos,
  searchYouTubeVideos,
  searchYouTubeLight,
  getMultipleVideoStats,
  getCacheStats,
  clearCache
};