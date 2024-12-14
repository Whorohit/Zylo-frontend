import { create } from 'zustand';
import { toast } from '../utils/toast';

export const useAdminStore = create((set, get) => ({
  activeSection: 'dashboard',
  stats: {
    totalUsers: 15234,
    totalNFTs: 8765,
    totalVolume: '1,234.56 ETH',
    activeListings: 3456,
  },
  recentTransactions: [
    { id: 1, type: 'Sale', nft: 'Cosmic Dreamer', price: '0.5 ETH', buyer: 'User123', date: '2024-03-15' },
    { id: 2, type: 'Listing', nft: 'Digital Genesis', price: '1.2 ETH', seller: 'Artist456', date: '2024-03-14' },
    { id: 3, type: 'Bid', nft: 'Neon Dreams', price: '0.8 ETH', bidder: 'Collector789', date: '2024-03-13' },
  ],
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', nftsOwned: 12, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', nftsOwned: 8, status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', nftsOwned: 5, status: 'suspended' },
  ],
  reports: [
    { id: 1, type: 'NFT', item: 'Suspicious NFT', reporter: 'User123', status: 'pending' },
    { id: 2, type: 'User', item: 'Spam Activity', reporter: 'Admin', status: 'resolved' },
    { id: 3, type: 'Transaction', item: 'Failed Payment', reporter: 'System', status: 'investigating' },
  ],
  settings: {
    platformFee: 2.5,
    minListingPrice: 0.01,
    maxListingPrice: 1000,
    featuredNFTsCount: 10,
  },

  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  
  // User Management Actions
  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: Date.now() }],
    stats: { ...state.stats, totalUsers: state.stats.totalUsers + 1 }
  })),
  
  updateUser: (userId, data) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId ? { ...user, ...data } : user
    )
  })),
  
  deleteUser: (userId) => set((state) => ({
    users: state.users.filter(user => user.id !== userId),
    stats: { ...state.stats, totalUsers: state.stats.totalUsers - 1 }
  })),

  // NFT Management Actions
  addNFT: (nft) => set((state) => ({
    stats: { ...state.stats, totalNFTs: state.stats.totalNFTs + 1 }
  })),
  
  removeNFT: (nftId) => set((state) => ({
    stats: { ...state.stats, totalNFTs: state.stats.totalNFTs - 1 }
  })),
  
  updateNFTStatus: (nftId, status) => {
    // Update NFT status logic
    toast.success(`NFT status updated to ${status}`);
  },

  // Transaction Actions
  addTransaction: (transaction) => set((state) => ({
    recentTransactions: [
      { id: Date.now(), ...transaction },
      ...state.recentTransactions
    ]
  })),
  
  updateTransactionStatus: (transactionId, status) => set((state) => ({
    recentTransactions: state.recentTransactions.map(tx =>
      tx.id === transactionId ? { ...tx, status } : tx
    )
  })),

  // Report Management Actions
  addReport: (report) => set((state) => ({
    reports: [{ id: Date.now(), ...report, status: 'pending' }, ...state.reports]
  })),
  
  resolveReport: (reportId) => set((state) => ({
    reports: state.reports.map(report =>
      report.id === reportId ? { ...report, status: 'resolved' } : report
    )
  })),
  
  investigateReport: (reportId) => set((state) => ({
    reports: state.reports.map(report =>
      report.id === reportId ? { ...report, status: 'investigating' } : report
    )
  })),

  // Settings Management
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
    toast.success('Settings updated successfully');
  },

  // Analytics Actions
  updateStats: (newStats) => set((state) => ({
    stats: { ...state.stats, ...newStats }
  })),

  // Search Actions
  searchUsers: (query) => {
    const { users } = get();
    return users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  searchTransactions: (query) => {
    const { recentTransactions } = get();
    return recentTransactions.filter(tx => 
      tx.nft.toLowerCase().includes(query.toLowerCase()) ||
      tx.type.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  searchReports: (query) => {
    const { reports } = get();
    return reports.filter(report => 
      report.item.toLowerCase().includes(query.toLowerCase()) ||
      report.type.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Export Actions
  exportData: (type) => {
    const data = get()[type];
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_export_${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${type} data exported successfully`);
  }
}));