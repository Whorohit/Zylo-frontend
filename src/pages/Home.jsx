import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { NFTCarousel } from '../components/NFTCarousel';
import { CategoryHeader } from '../components/CategoryHeader';
import { useNFTStore } from '../store/useNFTStore';
import { useThemeStore } from '../store/useThemeStore';

export const Home = () => {
  const { nfts } = useNFTStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const categories = [
    {
      id: 'trending',
      title: '🔥 Trending NFTs',
      description: 'The most sought-after NFTs right now',
      data: nfts.trending
    },
    {
      id: 'art',
      title: '🎨 Digital Art',
      description: 'Stunning artworks from talented creators',
      data: nfts.trending.slice().reverse()
    },
    {
      id: 'collectibles',
      title: '✨ Top Collections',
      description: 'Exclusive and rare digital collectibles',
      data: nfts.collectibles
    },
    {
      id: 'photography',
      title: '📸 Photography',
      description: 'Captivating moments frozen in time',
      data: nfts.trending.slice(2)
    }
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <HeroSection />
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category, index) => (
          <div key={category.id} className={`mb-16 ${index === 0 ? 'mt-8' : ''}`}>
            <CategoryHeader 
              title={category.title} 
              description={category.description} 
            />
            <div className="mt-8">
              <NFTCarousel nfts={category.data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};