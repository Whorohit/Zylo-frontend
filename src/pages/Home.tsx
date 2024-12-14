import React from 'react';
import { NFTCard } from '../components/NFTCard';
import { useNFTStore } from '../store/useNFTStore';
import { Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const { nfts, buyNFT } = useNFTStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover, Collect, and Sell Extraordinary NFTs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            NFTverse is the world's first and largest NFT marketplace
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-12">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Explore Collection</span>
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            Create NFT
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              {...nft}
              onBuy={() => buyNFT(nft.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};