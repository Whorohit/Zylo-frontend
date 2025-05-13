import React from 'react';
import { ExternalLink, Heart, Share2 } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from 'react-router-dom';

export const 
NFTCard = ({
  id,
  name,
  image,
  price,
  description,
  seller,
  onBuy,
  isedit
  
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`group ${
      isDarkMode 
        ? 'bg-gray-800/50 hover:bg-gray-800' 
        : 'bg-white/90 hover:bg-white'
    } backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
      <Link to={`/nft/${id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-72 object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{name}</h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-sky-600'
              }`}>by {seller?.slice(0,5)}...</p>
            </div>
            <ExternalLink className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-sky-500'
            }`} />
          </div>
          <p className={`text-sm mb-6 line-clamp-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>{description}</p>
          <div className="flex justify-between   flex-col   items-center">
            <div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-sky-600'
              }`}>Current Price</p>
              <p className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{price} ETH</p>
            </div>
           {!isedit&& <button
              onClick={onBuy}
              className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 transform hover:-translate-y-0.5 ${
                isDarkMode 
                  ? 'bg-sky-600 hover:bg-sky-700' 
                  : 'bg-sky-500 hover:bg-sky-600'
              } shadow-md hover:shadow-lg`}
            >
              Buy Now
            </button>}
          </div>
        </div>
      </Link>
    </div>
  );
};