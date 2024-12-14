import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (status) => set({ isSearching: status }),
  
  searchNFTs: async (query, nfts) => {
    set({ isSearching: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = [...nfts.trending, ...nfts.collectibles].filter(nft => 
      nft.name.toLowerCase().includes(query.toLowerCase()) ||
      nft.description.toLowerCase().includes(query.toLowerCase()) ||
      nft.creator.toLowerCase().includes(query.toLowerCase())
    );
    
    set({ 
      searchResults: results,
      isSearching: false 
    });
    
    return results;
  },
  
  clearSearch: () => set({ 
    searchQuery: '', 
    searchResults: [],
    isSearching: false 
  })
}));