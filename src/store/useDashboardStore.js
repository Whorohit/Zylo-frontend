import { create } from 'zustand';
import { shareContent } from '../utils/sharing';

export const useDashboardStore = create((set, get) => ({
  activeTab: 'overview',
  showListNFT: false,
  userProfile: {
    bio: 'Digital art collector and NFT enthusiast. Passionate about blockchain technology and the future of digital ownership.',
    socials: {
      twitter: '',
      website: '',
      github: ''
    },
    tags: ['Digital Art', 'NFT Collector', 'Crypto Enthusiast'],
    stats: {
      balance: '14.5 ETH',
      nftsOwned: 12,
      nftsListed: 5,
      followers: '1.2K'
    }
  },
  transactions: [
    { date: '2024-03-15', type: 'Purchase', nft: 'Cosmic Dreamer', price: '0.5 ETH', status: 'Completed' },
    { date: '2024-03-14', type: 'Sale', nft: 'Digital Genesis', price: '1.2 ETH', status: 'Completed' },
    { date: '2024-03-13', type: 'List', nft: 'Neon Dreams', price: '0.8 ETH', status: 'Active' },
    { date: '2024-03-12', type: 'Bid', nft: 'Virtual Oasis', price: '2.0 ETH', status: 'Pending' },
    { date: '2024-03-11', type: 'Purchase', nft: 'Meta Masterpiece', price: '1.5 ETH', status: 'Completed' },
  ],
  activities: [
    { type: 'Bid Received', nft: 'Cosmic Dreamer', user: 'CryptoWhale', amount: '0.6 ETH', time: '2 hours ago' },
    { type: 'NFT Listed', nft: 'Digital Genesis', user: 'You', amount: '1.2 ETH', time: '5 hours ago' },
    { type: 'Offer Made', nft: 'Neon Dreams', user: 'ArtCollector', amount: '0.9 ETH', time: '1 day ago' },
    { type: 'Sale Completed', nft: 'Virtual Oasis', user: 'NFTBuyer', amount: '2.0 ETH', time: '2 days ago' },
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowListNFT: (show) => set({ showListNFT: show }),
  
  updateBio: (bio) => set((state) => ({
    userProfile: { ...state.userProfile, bio }
  })),
  
  updateSocials: (socials) => set((state) => ({
    userProfile: { ...state.userProfile, socials }
  })),
  
  updateTags: (tags) => set((state) => ({
    userProfile: { ...state.userProfile, tags }
  })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities]
  })),

  shareProfile: async () => {
    const url = window.location.href;
    await shareContent({
      title: 'Check out my NFT Profile',
      text: 'View my NFT collection and activities',
      url: url
    });
  }
}));