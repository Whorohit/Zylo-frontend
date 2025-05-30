// src/pages/Explore.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNFTStore } from '../store/useNFTStore';
import { useThemeStore } from '../store/useThemeStore';

import { ExploreHeader } from '../components/explore/ExploreHeader';
import { ExploreFilters } from '../components/explore/ExploreFilters';
import { ExploreGrid } from '../components/explore/ExploreGrid';
import { ExploreSorting } from '../components/explore/ExploreSorting';
import { fetchAssets, fetchAssetsByCategory } from '../store/etherslice';
// import { fetchAssetsByCategory } from '../store/category.slice';

// import { fetchAssetsByCategory } from '../redux/slices';

export const Explore = () => {
  const dispatch = useDispatch();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const [activeFilter, setActiveFilter] = useState(-1); // -1 = All categories
  const [sortBy, setSortBy] = useState('recent');

 const {
  allAssets,
  loadingAllAssets: loading,
  errorAllAssets: error,
} = useSelector((state) => state.marketplace);
  useEffect(() => {
    if ((!allAssets || allAssets.length === 0 )&&activeFilter==-1) {
      dispatch(fetchAssets());
    }
  }, [allAssets, dispatch,activeFilter]);

  useEffect(() => {
    if (activeFilter!==-1) {
      setTimeout(() => {
         dispatch(fetchAssetsByCategory({ category: activeFilter }));
      }, 2000);
     
    }
      
  }, [, activeFilter,  dispatch]);
  const sortedNFTs = [...allAssets].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'recent':
        return parseInt(b.timestamp) - parseInt(a.timestamp);
      default:
        return 0;
    }
  });

  return (
    <div
      className={`min-h-screen py-12 ${isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreHeader />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <ExploreFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <div className="flex-1">
            <ExploreSorting
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalNFTs={sortedNFTs.length}
            />

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading NFTs...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">Error: {error}</div>
            ) : sortedNFTs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No NFTs found in this category.</div>
            ) : (
              <ExploreGrid nfts={sortedNFTs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
