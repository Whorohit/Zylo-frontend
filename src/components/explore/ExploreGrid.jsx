import React from 'react';
import { NFTCard } from '../NFTCard';

export const ExploreGrid = ({ nfts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
};