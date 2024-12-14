
import React, { useState } from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useNFTStore } from '../../../store/useNFTStore';
import { Search, Filter, Plus } from 'lucide-react';
import { AdminActions } from '../actions/AdminActions';
import { AddNFTModal } from '../modals/AddNFTModal';

export const AdminNFTs = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts } = useNFTStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Combine all NFTs
  const allNFTs = [...nfts.trending, ...nfts.collectibles];

  // Filter NFTs based on search query
  const filteredNFTs = allNFTs.filter(nft => 
    nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (nftId) => {
    // Implement edit functionality
    console.log('Edit NFT:', nftId);
  };

  const handleDelete = (nftId) => {
    // Implement delete functionality
    console.log('Delete NFT:', nftId);
  };

  const handleToggleStatus = (nftId) => {
    // Implement status toggle functionality
    console.log('Toggle NFT status:', nftId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>NFTs</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Monitor and manage listed NFTs
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Add NFT</span>
        </button>
      </div>

      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NFTs..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-sky-500`}
            />
          </div>

          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                <th className="text-left py-3 px-4">NFT</th>
                <th className="text-left py-3 px-4">Creator</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNFTs.map((nft) => (
                <tr key={nft.id} className={`${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {nft.name}
                      </span>
                    </div>
                  </td>
                  <td className={`py-4 px-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{nft.creator}</td>
                  <td className={`py-4 px-4 ${
                    isDarkMode ? 'text-sky-400' : 'text-sky-600'
                  }`}>{nft.price} ETH</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      nft.isListed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {nft.isListed ? 'Listed' : 'Unlisted'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <AdminActions
                      onEdit={() => handleEdit(nft.id)}
                      onDelete={() => handleDelete(nft.id)}
                      onToggleStatus={() => handleToggleStatus(nft.id)}
                      status={nft.isListed ? 'active' : 'inactive'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddNFTModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};
