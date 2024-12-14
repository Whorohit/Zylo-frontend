import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import { useNFTStore } from '../store/useNFTStore';
import { useCartStore } from '../store/useCartStore';
import { 
  Heart, Share2, ExternalLink, Clock, Shield, 
  Tag, BarChart3, Eye, Info 
} from 'lucide-react';

export const NFTProduct = () => {
  const { id } = useParams();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts } = useNFTStore();
  const { addToCart } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);

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
    likes: 89,
    history: [
      { event: 'Listed', price: '0.5 ETH', date: '2024-03-15' },
      { event: 'Bid', price: '0.45 ETH', date: '2024-03-14' },
      { event: 'Transfer', from: 'PreviousOwner', to: 'CurrentOwner', date: '2024-03-10' }
    ]
  };

  const handleAddToCart = () => {
    addToCart(nft);
  };

  const stats = [
    { label: 'Views', value: nft.views, icon: Eye },
    { label: 'Likes', value: nft.likes, icon: Heart },
    { label: 'Price History', value: '3 Events', icon: BarChart3 }
  ];

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
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-900/80 hover:bg-gray-800'
                      : 'bg-white/80 hover:bg-white'
                  } shadow-lg`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked ? 'text-red-500 fill-red-500' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-gray-900/80 hover:bg-gray-800'
                      : 'bg-white/80 hover:bg-white'
                  } shadow-lg`}
                >
                  <Share2 className={`w-6 h-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`} />
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>NFT Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Listed on
                    </span>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>March 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Blockchain
                    </span>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Ethereum</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Token Standard
                    </span>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>ERC-721</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className={`text-4xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{nft.name}</h1>
                <ExternalLink className={`w-6 h-6 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>{nft.description}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                  alt={nft.creator}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Created by</p>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{nft.creator}</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Current Price</p>
                  <p className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{nft.price} ETH</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Add to Cart
                  </button>
                  <button
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Make Offer
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <stat.icon className={`w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{stat.label}</span>
                    </div>
                    <p className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Info className="w-5 h-5" />
                <span>Item Activity</span>
              </h3>
              <div className="space-y-4">
                {nft.history.map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-white'
                      }`}>
                        {event.event === 'Listed' && <Tag className="w-5 h-5 text-green-500" />}
                        {event.event === 'Bid' && <BarChart3 className="w-5 h-5 text-blue-500" />}
                        {event.event === 'Transfer' && <ExternalLink className="w-5 h-5 text-purple-500" />}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{event.event}</p>
                        {event.from && event.to && (
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            From {event.from} to {event.to}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {event.price && (
                        <p className={`font-medium ${
                          isDarkMode ? 'text-sky-400' : 'text-sky-500'
                        }`}>{event.price}</p>
                      )}
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};