import React, { useState } from 'react';
import { useNFTStore } from '../store/useNFTStore';
import { useThemeStore } from '../store/useThemeStore';
import { ExploreHeader } from '../components/explore/ExploreHeader';
import { ExploreFilters } from '../components/explore/ExploreFilters';
import { ExploreGrid } from '../components/explore/ExploreGrid';
import { ExploreSorting } from '../components/explore/ExploreSorting';

export const Explore = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts } = useNFTStore();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Combine all NFTs
  const allNFTs = [...nfts.trending, ...nfts.collectibles];

  // Filter NFTs based on active filter
  const filteredNFTs = activeFilter === 'all' 
    ? allNFTs 
    : allNFTs.filter(nft => nft.category === activeFilter);

  // Sort NFTs based on selected sorting option
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'recent':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreHeader />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <ExploreFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          
          <div className="flex-1">
            <ExploreSorting
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalNFTs={sortedNFTs.length}
            />
            
            <ExploreGrid nfts={sortedNFTs} />
          </div>
        </div>
      </div>
    </div>
  );
};