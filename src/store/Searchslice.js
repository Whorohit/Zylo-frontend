import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getContract } from "./etherslice";
import { fetchImage, fetchMetadata } from "../utils/utils";

// Thunk to fetch assets by name
// export const fetchAssetsByName = createAsyncThunk(
//   "searchByName/fetchAssetsByName",
//   async (name, { rejectWithValue }) => {
//     try {
//       const contract = await getContract(false); // Read-only
//       const tokenIds = await contract.searchByName(name);

//       console.log("🔍 tokenIds from searchByName:", tokenIds);

//       // Take up to 10 IDs
//     //   const limitedIds = tokenIds.slice(0, 10);

//       const assetPromises = tokenIds.map(async (tokenIdBN) => {
//         try {
//           let i = Number(tokenIdBN[5]); // Safe conversion
          
//           const asset = await contract.assets(i);
//           if (!asset.isListed) return null;

//           const tokenURI = await contract.tokenURI(i);
//           const metadata = await fetchMetadata(tokenURI);
//           const image = fetchImage(metadata.file);

//           return {
//             id: i.toString(),
//             seller: ethers.getAddress(asset.seller),
//             metadataURI: tokenURI,
//             price: ethers.formatEther(asset.price),
//             isListed: asset.isListed,
//             timestamp: asset.timestamp.toString(),
//             category: metadata.category,
//             name: metadata.name,
//             description: metadata.description,
//             image,
//           };
//         } catch (error) {
//           console.error(`❌ Error fetching asset ${tokenIdBN.toString()}:`, error);
//           return null;
//         }
//       });

//       const assets = (await Promise.all(assetPromises)).filter(Boolean);

//       console.log("✅ Fetched Assets by Name:", assets);
//       return assets;
//     } catch (error) {
//       console.error("🚨 Error in fetchAssetsByName:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const fetchAssetsByName = createAsyncThunk(
  "marketplace/fetchAssetsByName",
  async (name = "", { rejectWithValue }) => {
    try {
      const contract = await getContract(false);
      const totalAssets = await contract.getTotalAssets();

      console.log("✨ Total assets in contract:", totalAssets.toString());

      // Fetch all assets
      const assetPromises = Array.from(
        { length: Number(totalAssets) },
        (_, i) => i + 1
      ).map(async (i) => {
        try {
          const asset = await contract.assets(i);
          if (!asset.isListed) return null; // Skip unlisted assets

          const tokenURI = await contract.tokenURI(i);

          const metadata = await fetchMetadata(tokenURI);
          const image = fetchImage(metadata.file);

          return {
            id: i.toString(),
            seller: ethers.getAddress(asset.seller),
            metadataURI: tokenURI,
            price: ethers.formatEther(asset.price),
            isListed: asset.isListed,
            timestamp: asset.timestamp.toString(),
            category: metadata.category,
            name: metadata.name,
            description: metadata.description,
            image,
          };
        } catch (error) {
          console.error(`❌ Error fetching asset ${i}:`, error);
          return null;
        }
      });

      const allAssets = (await Promise.all(assetPromises)).filter(Boolean);

      console.log("✅ Final Fetched All Assets:", allAssets);

      // Filter by name if provided (case-insensitive)
      if (name.trim() !== "") {
        const lowerName = name.toLowerCase();
        const filteredAssets = allAssets.filter((asset) =>
          asset.name.toLowerCase().includes(lowerName)
        );
        console.log(`🔍 Assets filtered by name "${name}":`, filteredAssets);
        return filteredAssets;
      }

      return allAssets;
    } catch (error) {
      console.error("🚨 Error in fetchAssetsByName:", error);
      return rejectWithValue(error.message);
    }
  }
);



// Slice
const searchByNameSlice = createSlice({
  name: "searchByName",
  initialState: {
    loading: false,
    results: [],
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssetsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchAssetsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchByNameSlice.actions;
export default searchByNameSlice.reducer;
