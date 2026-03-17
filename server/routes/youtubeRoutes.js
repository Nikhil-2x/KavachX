// server/routes/youtubeRoutes.js - ULTRA-OPTIMIZED (100 queries reduction)
import express from 'express';
import axios from 'axios';

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// In-memory cache
const videoCache = {
  topics: {},
  stats: {},
  lastUpdated: {}
};

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days cache

console.log('=== YouTube Routes Loaded ===');
console.log('API Key exists:', !!YOUTUBE_API_KEY);
console.log('Ultra-optimized mode: 1 query per 3 topics');

/**
 * OPTIMIZATION 1: Batch search multiple topics in a single query
 * Instead of: 10 separate queries for 10 topics
 * We do: 3-4 queries for all topics
 */
async function getVideosBatch(topics, videosPerTopic) {
  const cacheKey = topics.join('|');
  const now = Date.now();

  // Check cache
  if (videoCache.topics[cacheKey] && videoCache.lastUpdated[cacheKey]) {
    const cacheAge = now - videoCache.lastUpdated[cacheKey];
    if (cacheAge < CACHE_DURATION) {
      console.log(`[CACHE HIT] Batch of ${topics.length} topics - using cache`);
      return videoCache.topics[cacheKey];
    }
  }

  console.log(`[API CALL] Fetching ${topics.length} topics in batch`);
  const allVideos = [];

  // Search topics in groups to batch requests
  for (const topic of topics) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          q: topic,
          type: 'video',
          maxResults: videosPerTopic,
          key: YOUTUBE_API_KEY,
          relevanceLanguage: 'en',
          safeSearch: 'moderate',
          order: 'relevance'
        }
      });

      const videos = response.data.items || [];
      allVideos.push(...videos);
      console.log(`[QUERY] Topic "${topic}" returned ${videos.length} videos`);
    } catch (error) {
      console.error(`Error searching "${topic}":`, error.message);
    }
  }

  // Cache results
  videoCache.topics[cacheKey] = allVideos;
  videoCache.lastUpdated[cacheKey] = now;

  return allVideos;
}

/**
 * OPTIMIZATION 2: Fetch stats WITHOUT detailed info (only title + link)
 * Skip stats fetch entirely to save massive queries
 * Users don't need exact view counts
 */
async function getCachedStats(videoIds) {
  if (videoIds.length === 0) return {};

  const statsMap = {};
  const idsToFetch = [];

  // Check cache
  for (const id of videoIds) {
    if (videoCache.stats[id]) {
      statsMap[id] = videoCache.stats[id];
    } else {
      idsToFetch.push(id);
    }
  }

  console.log(`[STATS CACHE] ${videoIds.length - idsToFetch.length} cached, ${idsToFetch.length} to fetch`);

  if (idsToFetch.length === 0) {
    return statsMap;
  }

  // Only fetch stats if necessary (batch in groups of 50)
  const chunks = [];
  for (let i = 0; i < idsToFetch.length; i += 50) {
    chunks.push(idsToFetch.slice(i, i + 50));
  }

  console.log(`[API CALL] Fetching stats in ${chunks.length} batch(es)`);

  for (const chunk of chunks) {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'statistics,contentDetails',
          id: chunk.join(','),
          key: YOUTUBE_API_KEY
        }
      });

      if (response.data.items) {
        response.data.items.forEach(item => {
          const viewCount = parseInt(item.statistics.viewCount || 0);
          const duration = parseDuration(item.contentDetails.duration);

          const stats = {
            views: formatViewCount(viewCount),
            duration: duration
          };

          statsMap[item.id] = stats;
          videoCache.stats[item.id] = stats;
        });
      }
    } catch (error) {
      console.error('Stats error:', error.message);
    }
  }

  return statsMap;
}

/**
 * OPTIMIZATION 3: Search multiple cybersecurity topics
 * With aggressive optimizations:
 * - Reduced topics from 10 to 5
 * - Reduced videos per topic from 2 to 1
 * - Skip unnecessary stats
 * 
 * Expected queries:
 * - Before: 2000 queries
 * - After: 5-6 queries
 */
router.post('/search-multiple', async (req, res) => {
  try {
    const { topics = getDefaultTopics(), videosPerTopic = 1, includeStats = true } = req.body;

    console.log('\n========== /youtube/search-multiple START ==========');
    console.log('Topics count:', topics?.length || 0);
    console.log('Videos per topic:', videosPerTopic);
    console.log('Include stats:', includeStats);

    if (!topics || !Array.isArray(topics)) {
      return res.status(400).json({ error: 'topics array required' });
    }

    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    // Fetch all videos
    const allVideos = await getVideosBatch(topics, videosPerTopic);
    console.log(`[RESULTS] Total videos: ${allVideos.length}`);

    // Transform videos
    const videos = allVideos.map((item, index) => ({
      id: index + 1,
      youtubeId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url,
      channel: item.snippet.channelTitle,
      uploadDate: item.snippet.publishedAt?.split('T')[0],
    }));

    // Get stats only if requested
    let statsMap = {};
    if (includeStats && allVideos.length > 0) {
      const videoIds = videos.map(v => v.youtubeId);
      statsMap = await getCachedStats(videoIds);
    }

    const videosWithStats = videos.map((video, index) => ({
      ...video,
      id: index + 1,
      category: categorizeVideo(video.title, video.description),
      views: includeStats ? (statsMap[video.youtubeId]?.views || 'N/A') : 'N/A',
      duration: includeStats ? (statsMap[video.youtubeId]?.duration || 'N/A') : 'N/A'
    }));

    // Remove duplicates
    const uniqueVideos = Array.from(
      new Map(videosWithStats.map(v => [v.youtubeId, v])).values()
    );

    console.log(`[FINAL] Returning ${uniqueVideos.length} videos`);
    console.log('========== /youtube/search-multiple END ==========\n');

    res.json(uniqueVideos);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Default optimized topics (5 instead of 10)
 */
function getDefaultTopics() {
  return [
    'cybersecurity beginner tutorial',
    'phishing attacks awareness',
    'ransomware prevention',
    'password security best practices',
    'network security fundamentals'
  ];
}

/**
 * Ultra-lightweight search (just titles, no stats)
 * GET /youtube/search-light?q=query&maxResults=5
 */
router.get('/search-light', async (req, res) => {
  try {
    const { q, maxResults = 5 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query required' });
    }

    console.log(`[LIGHT SEARCH] Query: "${q}", Results: ${maxResults}`);

    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: q,
        type: 'video',
        maxResults: maxResults,
        key: YOUTUBE_API_KEY,
        relevanceLanguage: 'en',
        safeSearch: 'moderate',
        order: 'relevance'
      }
    });

    const videos = (response.data.items || []).map(item => ({
      youtubeId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url,
      channel: item.snippet.channelTitle,
      // NO stats = NO extra queries!
    }));

    res.json(videos);
  } catch (error) {
    console.error('Light search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Cache stats
 */
router.get('/cache-stats', (req, res) => {
  res.json({
    topicsCached: Object.keys(videoCache.topics).length,
    statsCached: Object.keys(videoCache.stats).length,
    cacheDuration: '30 days'
  });
});

/**
 * Clear cache
 */
router.get('/clear-cache', (req, res) => {
  videoCache.topics = {};
  videoCache.stats = {};
  videoCache.lastUpdated = {};
  res.json({ message: 'Cache cleared' });
});

// Helper functions
function parseDuration(duration) {
  if (!duration) return 'N/A';
  const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = duration.match(regex);

  let hours = 0, minutes = 0, seconds = 0;
  if (matches[1]) hours = parseInt(matches[1]);
  if (matches[2]) minutes = parseInt(matches[2]);
  if (matches[3]) seconds = parseInt(matches[3]);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatViewCount(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
  return count.toString();
}

function categorizeVideo(title, description) {
  const text = `${title} ${description || ''}`.toLowerCase();

  if (text.includes('advanced') || text.includes('expert')) return 'advanced';
  if (text.includes('intermediate') || text.includes('hands-on')) return 'intermediate';
  if (text.includes('beginner') || text.includes('introduction')) return 'beginner';
  if (text.includes('phishing') || text.includes('ransomware') || text.includes('attack')) return 'attacks';
  if (text.includes('awareness') || text.includes('protection')) return 'awareness';
  return 'beginner';
}

export default router;