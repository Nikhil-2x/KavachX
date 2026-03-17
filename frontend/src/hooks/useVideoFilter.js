// src/hooks/useVideoFilter.js
// Custom hook for filtering videos - can be reused in multiple components

import { useState, useMemo } from 'react';

/**
 * Custom hook to manage video filtering by search term and category
 * @param {Array} videos - Array of video objects
 * @returns {Object} - Filtered videos and state setters
 */
export const useVideoFilter = (videos) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Memoized filtered videos - only recalculates when searchTerm or selectedCategory changes
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

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const setSearch = (term) => {
    setSearchTerm(term);
  };

  return {
    filteredVideos,
    searchTerm,
    selectedCategory,
    setSearchTerm: setSearch,
    setSelectedCategory: setCategory,
    resetFilters,
    resultCount: filteredVideos.length
  };
};

/**
 * Custom hook for modal state management
 * @returns {Object} - Modal state and controls
 */
export const useVideoModal = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const toggleModal = (video) => {
    setSelectedVideo(selectedVideo?.id === video.id ? null : video);
  };

  return {
    selectedVideo,
    openModal,
    closeModal,
    toggleModal,
    isOpen: selectedVideo !== null
  };
};

/**
 * Combined hook for all video page functionality
 * @param {Array} videos - Array of video objects
 * @returns {Object} - All filtering and modal controls
 */
export const useVideoPageState = (videos) => {
  const filterState = useVideoFilter(videos);
  const modalState = useVideoModal();

  return {
    ...filterState,
    ...modalState
  };
};