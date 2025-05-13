import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useNFTStore } from '../../store/useNFTStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { NFTCard } from '../NFTCard';
import { ListNFTCard } from '../ListNFTCard';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';

export const DashboardListed = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts, addNFT } = useNFTStore();
  const { ownedNFTs } = useSelector(state => state.userProfile)
  const { showListNFT, setShowListNFT } = useDashboardStore();
  // console.log(ownedNFTs);

  // Get all listed NFTs
  const listedNFTs = nfts.collectibles;

  const handleListNFT = (formData) => {
    const newNFT = {
      id: `nft-${Date.now()}`,
      ...formData,
      creator: 'You',
      isListed: true,
    };
    addNFT('collectibles', newNFT);
    setShowListNFT(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Your Listed NFTs</h3>
        <button
          onClick={() => setShowListNFT(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>List New NFT</span>
        </button>
      </div>

      {showListNFT ? (
        <ListNFTCard onSubmit={handleListNFT} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownedNFTs
            ?.filter((nft) => nft.isListed) // Ensure filter returns a boolean
            .map((nft) => (
              <NFTCard key={nft.id} {...nft} /> // Render the card after filtering
            ))}
        </div>
      )}
    </div>
  );
};