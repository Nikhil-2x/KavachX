// src/services/youtubeService.js

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search YouTube videos by keyword
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum results to fetch
 * @returns {Promise<Array>} - Array of video objects
 */
export const searchYouTubeVideos = async (query, maxResults = 10) => {
  try {
    if (!API_KEY) {
      throw new Error('YouTube API key not configured. Add VITE_YOUTUBE_API_KEY to .env.local');
    }

    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: maxResults,
      key: API_KEY,
      relevanceLanguage: 'en',
      safeSearch: 'moderate',
      order: 'relevance'
    });

    const response = await fetch(`${BASE_URL}/search?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    // Transform YouTube results to our format
    const videos = data.items.map((item) => ({
      youtubeId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channel: item.snippet.channelTitle,
      uploadDate: item.snippet.publishedAt.split('T')[0], // YYYY-MM-DD
    }));

    return videos;
  } catch (error) {
    console.error('Error searching YouTube:', error);
    throw error;
  }
};

/**
 * Get video statistics (views, duration)
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} - Video stats
 */
export const getVideoStats = async (videoId) => {
  try {
    const params = new URLSearchParams({
      part: 'statistics,contentDetails',
      id: videoId,
      key: API_KEY
    });

    const response = await fetch(`${BASE_URL}/videos?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const item = data.items[0];
    const viewCount = parseInt(item.statistics.viewCount || 0);
    const duration = parseDuration(item.contentDetails.duration);

    return {
      views: formatViewCount(viewCount),
      duration: duration
    };
  } catch (error) {
    console.error('Error getting video stats:', error);
    return { views: 'N/A', duration: 'N/A' };
  }
};

/**
 * Get multiple videos statistics
 * @param {Array<string>} videoIds - Array of YouTube video IDs
 * @returns {Promise<Object>} - Map of videoId -> stats
 */
export const getMultipleVideoStats = async (videoIds) => {
  try {
    if (videoIds.length === 0) return {};

    // YouTube API allows max 50 IDs per request
    const chunks = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      chunks.push(videoIds.slice(i, i + 50));
    }

    const statsMap = {};

    for (const chunk of chunks) {
      const params = new URLSearchParams({
        part: 'statistics,contentDetails',
        id: chunk.join(','),
        key: API_KEY
      });

      const response = await fetch(`${BASE_URL}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items) {
        data.items.forEach(item => {
          const viewCount = parseInt(item.statistics.viewCount || 0);
          const duration = parseDuration(item.contentDetails.duration);

          statsMap[item.id] = {
            views: formatViewCount(viewCount),
            duration: duration,
            likes: parseInt(item.statistics.likeCount || 0)
          };
        });
      }
    }

    return statsMap;
  } catch (error) {
    console.error('Error getting multiple video stats:', error);
    return {};
  }
};

/**
 * Parse ISO 8601 duration to HH:MM:SS format
 * @param {string} duration - ISO 8601 duration string (e.g., PT1H23M45S)
 * @returns {string} - Formatted duration
 */
function parseDuration(duration) {
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = duration.match(regex);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (matches[1]) hours = parseInt(matches[1]);
  if (matches[2]) minutes = parseInt(matches[2]);
  if (matches[3]) seconds = parseInt(matches[3]);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format view count to readable format
 * @param {number} count - View count
 * @returns {string} - Formatted string
 */
function formatViewCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

/**
 * Search multiple cybersecurity topics
 * @param {Array<string>} topics - Array of search topics
 * @param {number} videosPerTopic - Videos to fetch per topic
 * @returns {Promise<Array>} - All videos combined
 */
export const searchCyberSecurityVideos = async (topics, videosPerTopic = 3) => {
  try {
    const allPromises = topics.map(topic => 
      searchYouTubeVideos(topic, videosPerTopic).catch(() => [])
    );

    const results = await Promise.all(allPromises);
    const allVideos = results.flat();

    // Get stats for all videos
    const videoIds = allVideos.map(v => v.youtubeId);
    const statsMap = await getMultipleVideoStats(videoIds);

    // Merge stats with video data
    const videosWithStats = allVideos.map((video, index) => ({
      id: index + 1,
      ...video,
      category: categorizeVideo(video.title, video.description),
      views: statsMap[video.youtubeId]?.views || 'N/A',
      duration: statsMap[video.youtubeId]?.duration || 'N/A'
    }));

    return videosWithStats;
  } catch (error) {
    console.error('Error searching cybersecurity videos:', error);
    return [];
  }
};

/**
 * Categorize video based on title and description
 * @param {string} title - Video title
 * @param {string} description - Video description
 * @returns {string} - Category
 */
function categorizeVideo(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('beginner') || text.includes('introduction')) return 'beginner';
  if (text.includes('intermediate')) return 'intermediate';
  if (text.includes('advanced') || text.includes('expert')) return 'advanced';
  if (text.includes('phishing') || text.includes('ransomware') || text.includes('malware') || text.includes('attack')) return 'attacks';
  if (text.includes('awareness') || text.includes('best practice') || text.includes('protection')) return 'awareness';

  return 'beginner'; // Default category
}

/**
 * Get channel info
 * @param {string} channelId - YouTube channel ID
 * @returns {Promise<Object>} - Channel info
 */
export const getChannelInfo = async (channelId) => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,statistics',
      id: channelId,
      key: API_KEY
    });

    const response = await fetch(`${BASE_URL}/channels?${params}`);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    return {
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      subscribers: data.items[0].statistics.subscriberCount,
      videoCount: data.items[0].statistics.videoCount
    };
  } catch (error) {
    console.error('Error getting channel info:', error);
    return null;
  }
};

export default {
  searchYouTubeVideos,
  getVideoStats,
  getMultipleVideoStats,
  searchCyberSecurityVideos,
  getChannelInfo
};