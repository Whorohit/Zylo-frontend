import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeroSection } from '../components/HeroSection';
import { NFTCarousel } from '../components/NFTCarousel';
import { CategoryHeader } from '../components/CategoryHeader';
import { useThemeStore } from '../store/useThemeStore';
import { fetchAssets } from '../store/etherslice';

export const Home = () => {
  const dispatch = useDispatch();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Get NFT data from Redux store
  const { assets, loading, error } = useSelector((state) => state.marketplace);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  // Group NFTs by category dynamically
  const groupedCategories = assets.reduce((acc, nft) => {
    const category = nft.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(nft);
    return acc;
  }, {});

  // Placeholder categories to maintain structure while loading
  const categoryNames = Object.keys(groupedCategories);
  const placeholderCategories = categoryNames.length ? categoryNames : ['Art', 'Music', 'Collectibles', 'Virtual Worlds'];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'}`}>
      <HeroSection />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {placeholderCategories.map((category, index) => (
          <div key={category} className={`mb-16 ${index === 0 ? 'mt-8' : ''}`}>
            <CategoryHeader title={category} description={`Explore ${category} NFTs`} />
            <div className="mt-8">
              {loading ? <SkeletonLoader /> : <NFTCarousel nfts={groupedCategories[category] || []} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg animate-pulse"></div>
      ))}
    </div>
  );
};
