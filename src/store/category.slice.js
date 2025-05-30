// src/redux/slices/marketplaceThunks.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
 // adjust path as needed
// import { fetchMetadata, fetchImage, fetchImageHash } from '../../utils/helpers'; // adjust imports
import { getContract } from './etherslice';
import { fetchImage, fetchImageHash, fetchMetadata } from '../utils/utils';

export const fetchAssetsByCategory = createAsyncThunk(
  "marketplace/fetchAssetsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const contract = await getContract(false);
      const perPage = 10;
      let page = 1;
      let allAssets = [];

      while (true) {
        const [assets, total] = await contract.getAssets(page, perPage, category);
        if (assets.length === 0) break;

        const parsedAssets = await Promise.all(
          assets.map(async (asset,index) => {
            const tokenId = asset.tokenId.toString();
            const tokenURI = await contract.tokenURI(tokenId);

            const metadata = await fetchMetadata(tokenURI);
            const image = fetchImage(metadata.file);
            const imageHash = await fetchImageHash(image);

            return {
              id: tokenId,
              seller: ethers.getAddress(asset.seller),
              metadataURI: tokenURI,
              price: ethers.formatEther(asset.price),
              isListed: asset.isListed,
              timestamp: asset.timestamp.toString(),
              category: metadata.category,
              name: metadata.name,
              description: metadata.description,
              image,
              imageHash,
            };
          })
        );

        allAssets = [...allAssets, ...parsedAssets];
        if (allAssets.length >= total) break;

        page++;
      }

      console.log("✅ All assets for category", category, allAssets);
      return allAssets;
    } catch (error) {
      console.error("🚨 Error in fetchAssetsByCategory:", error);
      return rejectWithValue(error.message);
    }
  }
);


const categorySlice = createSlice({
  name: 'marketplace',
  initialState: {
    assetsByCategory: [],
    loadingAssetsByCategory: false,
    errorAssetsByCategory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetsByCategory.pending, (state) => {
        state.loadingAssetsByCategory = true;
        state.errorAssetsByCategory = null;
      })
      .addCase(fetchAssetsByCategory.fulfilled, (state, action) => {
        state.loadingAssetsByCategory = false;
        state.assetsByCategory = action.payload;
      })
      .addCase(fetchAssetsByCategory.rejected, (state, action) => {
        state.loadingAssetsByCategory = false;
        state.errorAssetsByCategory = action.payload;
      });
  },
});

// 👇 Export reducer for store
export default categorySlice.reducer;