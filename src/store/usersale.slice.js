import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "./etherslice";


// Thunk to fetch user sales count
// Fetch all sold asset IDs
export const fetchUserSalesAssetIds = createAsyncThunk(
  "userSales/fetchUserSalesAssetIds",
  async (_, { rejectWithValue }) => {
    try {
      const contract = await getContract(true);
      const sales = await contract.getUserSales(); // returns uint256[]
      return sales.map((id) => id.toString()); // convert to string for React keys
    } catch (error) {
      console.error("Error fetching user sales:", error);
      return rejectWithValue(error.message || "Failed to fetch user sales");
    }
  }
);
// import { fetchMetadata, fetchImage } from "../utils/ipfs"; // adjust path
import { ethers } from "ethers";
import { fetchImage, fetchMetadata } from "../utils/utils";

// This assumes fetchUserSalesAssetIds is dispatched first.
export const fetchSoldAssets = createAsyncThunk(
  "userSales/fetchSoldAssets",
  async (assetIds, { rejectWithValue }) => {
    try {
      const contract = await getContract(false);
      const results = [];

      for (const assetId of assetIds) {
        try {
          const asset = await contract.assets(assetId);
          if (!asset.isListed) continue;

          const tokenURI = await contract.tokenURI(assetId);
          const metadata = await fetchMetadata(tokenURI);
          const imageUrl = fetchImage(metadata.file);

          results.push({
            id: assetId.toString(),
            seller: ethers.getAddress(asset.seller),
            metadataURI: tokenURI,
            price: ethers.formatEther(asset.price),
            isListed: asset.isListed,
            timestamp: asset.timestamp.toString(),
            category: metadata.category,
            name: metadata.name,
            description: metadata.description,
            image: imageUrl,
          });
        } catch (innerError) {
          console.warn(`Failed to fetch asset ${assetId}:`, innerError);
        }
      }

      return results;
    } catch (error) {
      console.error("Error fetching sold assets:", error);
      return rejectWithValue(error.message);
    }
  }
);


const userSalesSlice = createSlice({
  name: "userSales",
  initialState: {
    assetIds: [],
    soldAssets: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetUserSalesState: (state) => {
      state.assetIds = [];
      state.soldAssets = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSalesAssetIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSalesAssetIds.fulfilled, (state, action) => {
        state.loading = false;
        state.assetIds = action.payload;
      })
      .addCase(fetchUserSalesAssetIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSoldAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSoldAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.soldAssets = action.payload;
      })
      .addCase(fetchSoldAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserSalesState } = userSalesSlice.actions;
export default userSalesSlice.reducer;