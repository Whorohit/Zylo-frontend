import { create } from 'zustand';
import { NFT } from '../types/nft';

interface NFTStore {
  nfts: NFT[];
  addNFT: (nft: NFT) => void;
  listNFT: (id: string, price: number) => void;
  buyNFT: (id: string) => void;
}

export const useNFTStore = create<NFTStore>((set) => ({
  nfts: [
    {
      id: '1',
      name: 'Cosmic Dreamer',
      description: 'A surreal digital artwork exploring the depths of space and imagination',
      image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&q=80&w=1000',
      price: 0.5,
      owner: '0x123...abc',
      creator: '0x123...abc',
      isListed: true,
    },
    {
      id: '2',
      name: 'Digital Genesis',
      description: 'The birth of digital consciousness captured in abstract forms',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000',
      price: 1.2,
      owner: '0x456...def',
      creator: '0x456...def',
      isListed: true,
    },
  ],
  addNFT: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
  listNFT: (id, price) =>
    set((state) => ({
      nfts: state.nfts.map((nft) =>
        nft.id === id ? { ...nft, isListed: true, price } : nft
      ),
    })),
  buyNFT: (id) =>
    set((state) => ({
      nfts: state.nfts.map((nft) =>
        nft.id === id ? { ...nft, isListed: false, owner: '0x789...ghi' } : nft
      ),
    })),
}));