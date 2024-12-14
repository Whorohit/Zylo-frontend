import React from 'react';
import { useParams } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { useNFTStore } from '../store/useNFTStore';
import { NFTDetails } from '../components/purchase/NFTDetails';
import { PurchaseOptions } from '../components/purchase/PurchaseOptions';
import { NFTCarousel } from '../components/NFTCarousel';

export const Purchase = () => {
  const { id } = useParams();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts } = useNFTStore();

  // Find NFT from all categories
  const nft = [...nfts.trending, ...nfts.collectibles].find(n => n.id === id) || {
    id: '1',
    name: 'Cosmic Dreamer',
    description: 'A surreal digital artwork exploring the depths of space and imagination. This piece represents the convergence of dreams and reality in the digital age.',
    image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&q=80&w=1000',
    price: 0.5,
    creator: 'CryptoArtist',
    owner: 'CurrentOwner',
    views: 1234,
    likes: 89
  };

  // Get similar NFTs (same creator or similar price range)
  const similarNFTs = [...nfts.trending, ...nfts.collectibles]
    .filter(n => n.id !== nft.id && (n.creator === nft.creator || Math.abs(n.price - nft.price) <= 0.2))
    .slice(0, 4);

  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className={`relative rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <NFTDetails nft={nft} />
            <PurchaseOptions nft={nft} />
          </div>
        </div>

        {/* Similar NFTs Section */}
        <div className="mt-16">
          <h2 className={`text-2xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Similar NFTs</h2>
          <NFTCarousel nfts={similarNFTs} />
        </div>
      </div>
    </div>
  );
};