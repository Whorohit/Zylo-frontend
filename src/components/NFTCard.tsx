import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  onBuy: () => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  name,
  image,
  price,
  description,
  onBuy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center">
            <ExternalLink className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-bold text-gray-900">{price} ETH</p>
          </div>
          <button
            onClick={onBuy}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};