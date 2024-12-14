import { create } from 'zustand';

export const useNFTStore = create((set) => ({
  nfts: {
    trending: [
      {
        id: '1',
        name: 'Cosmic Dreamer',
        description: 'A surreal digital artwork exploring the depths of space and imagination',
        image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&q=80&w=1000',
        price: 0.5,
        creator: 'CryptoArtist',
        isListed: true,
      },
      {
        id: '2',
        name: 'Digital Genesis',
        description: 'The birth of digital consciousness captured in abstract forms',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000',
        price: 1.2,
        creator: 'DigitalMaster',
        isListed: true,
      },
      {
        id: '3',
        name: 'Neon Dreams',
        description: 'A vibrant exploration of cyberpunk aesthetics in the digital age',
        image: 'https://images.unsplash.com/photo-1633355444132-695d5876cd00?auto=format&fit=crop&q=80&w=1000',
        price: 0.8,
        creator: 'NeonArtist',
        isListed: true,
      },
      {
        id: '4',
        name: 'Virtual Oasis',
        description: 'An ethereal landscape where digital and natural worlds collide',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        price: 1.5,
        creator: 'VirtualVisions',
        isListed: true,
      },
      {
        id: '5',
        name: 'Pixel Perfect',
        description: 'A nostalgic tribute to the golden age of pixel art',
        image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=1000',
        price: 0.3,
        creator: 'PixelMaster',
        isListed: true,
      },
      {
        id: '6',
        name: 'Future Relics',
        description: 'Ancient artifacts reimagined for the digital era',
        image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=1000',
        price: 2.0,
        creator: 'FutureArtist',
        isListed: true,
      },
    ],
    collectibles: [
      {
        id: '7',
        name: 'Crystal Vision',
        description: 'A mesmerizing exploration of light and geometry',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
        price: 1.8,
        creator: 'CrystalArtist',
        isListed: true,
      },
      {
        id: '8',
        name: 'Digital Dreams',
        description: 'A journey through the subconscious of artificial intelligence',
        image: 'https://images.unsplash.com/photo-1633355444132-695d5876cd00?auto=format&fit=crop&q=80&w=1000',
        price: 2.5,
        creator: 'DreamWeaver',
        isListed: true,
      },
      {
        id: '9',
        name: 'Quantum Art',
        description: 'Where quantum physics meets digital creativity',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000',
        price: 3.0,
        creator: 'QuantumCreator',
        isListed: true,
      },
      {
        id: '10',
        name: 'Meta Masterpiece',
        description: 'A groundbreaking piece that defines the metaverse aesthetic',
        image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?auto=format&fit=crop&q=80&w=1000',
        price: 4.2,
        creator: 'MetaArtist',
        isListed: true,
      },
      {
        id: '11',
        name: 'Digital Dynasty',
        description: 'A tribute to the evolution of digital art',
        image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=1000',
        price: 2.8,
        creator: 'DynastyMaker',
        isListed: true,
      },
    ],
  },
  addNFT: (category, nft) => 
    set((state) => ({
      nfts: {
        ...state.nfts,
        [category]: [...state.nfts[category], nft],
      },
    })),
  listNFT: (category, id, price) =>
    set((state) => ({
      nfts: {
        ...state.nfts,
        [category]: state.nfts[category].map((nft) =>
          nft.id === id ? { ...nft, isListed: true, price } : nft
        ),
      },
    })),
  buyNFT: (category, id) =>
    set((state) => ({
      nfts: {
        ...state.nfts,
        [category]: state.nfts[category].map((nft) =>
          nft.id === id ? { ...nft, isListed: false } : nft
        ),
      },
    })),
}));