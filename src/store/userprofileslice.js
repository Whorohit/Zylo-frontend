import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from 'ethers';
import { updateToast } from "./toastslice";
import { checkLogin, getContract } from "./etherslice";
import { fetchImage, fetchMetadata } from "../utils/utils";



const convertIPFSUrl = (url) => {
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};

// 🎯 Thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) throw new Error("No token found");

      const { data } = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return data.user;
    } catch (error) {
      console.error("❌ Profile fetch failed:", error);
      return rejectWithValue(
        error.response?.data?.error || error.message || "Failed to fetch profile"
      );
    }
  }
);
export const fetchUserPurchases = createAsyncThunk(
  "userPurchases/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const contract = await getContract(true);

      // Debug wallet connection
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      console.log("Connected wallet:", accounts[0]);

      // Call the contract
      const purchasedAssetIds = await contract.getUserPurchases();
      console.log("Raw Purchased IDs:", purchasedAssetIds);

      if (!purchasedAssetIds || purchasedAssetIds.length === 0) {
        console.warn("No purchases found for this wallet.");
        return [];
      }

      // Fetch each asset's details
      const assets = await Promise.all(
        purchasedAssetIds.map(async (id) => {
          try {
            // Fetch tokenURI and asset data in parallel
            const [tokenURI, asset] = await Promise.all([
              contract.tokenURI(id),
              contract.assets(id),
            ]);

            console.log(`Token ${id} URI:`, tokenURI);

            const metadata = await fetchMetadata(tokenURI);
            return {
              id: id.toString(),
              name: metadata.name,
              description: metadata.description,
              image: fetchImage(metadata.file),
              price: asset.price.toString(),
              seller: asset.seller,
              isListed: asset.isListed,
              category: asset.category,
            };
          } catch (e) {
            console.error(`Failed to fetch asset ${id}:`, e);
            return null;
          }
        })
      );

      console.log("Fetched Assets:", assets.filter(Boolean)); // Only show valid assets
      return assets.filter(Boolean); // Filter out failed fetches
    } catch (error) {
      console.error("Error fetching purchases:", error);
      return rejectWithValue(error.message);
    }
  }
);



export const fetchWalletBalance = createAsyncThunk(
  "user/fetchWalletBalance",
  async (_, { getState, rejectWithValue,dispatch }) => {
    try {
      const { user } = getState().auth;

      const loginResult = await checkLogin(getState, dispatch);
      console.log(loginResult);
      
      if (!loginResult) throw new Error("User not authenticated.");
       

      if (!window.ethereum) throw new Error("MetaMask not found");
      if (!user?.walletAddress) throw new Error("Wallet address not found");

      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the balance of the user's wallet
      const balanceWei = await provider.getBalance(user.walletAddress);
      // console.log("Balance in Wei:", balanceWei.toString());

      // Convert balance from Wei to Ether (string format)
      const balanceEth = ethers.formatEther(balanceWei);
      // console.log("Balance in Ether:", balanceEth);

      return {
        walletAddress: user.walletAddress,
        balance: balanceEth,
      };
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      dispatch(updateToast({ message: error.message || "Failed to fetch NFTs", type: "error" }));
      return rejectWithValue(error.message || "Failed to fetch balance");
    }
  }
);

export const fetchNFTsOwned = createAsyncThunk(
  "nfts/fetchOwned",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const loginResult = await checkLogin(getState, dispatch);
      if (!loginResult) throw new Error("User not authenticated.");

      const { walletAddress } = loginResult;
      const contract = await getContract(true);

      const totalSupply = Number(await contract.getTotalAssets());
      // console.log("✨ Total NFTs in contract:", totalSupply.toString());

      // 🔥 Fetch all token owners in parallel
      const ownershipPromises = Array.from({ length: totalSupply }, (_, index) =>
        contract.ownerOf(index + 1)
      );

      const owners = await Promise.all(ownershipPromises);

      // 🎯 Filter NFTs owned by the logged-in user
      const userTokenIds = owners
        .map((owner, index) =>
          owner.toLowerCase() === walletAddress.toLowerCase() ? index + 1 : null
        )
        .filter(Boolean);

      // console.log("✅ User owns NFTs:", userTokenIds);

      // 🌟 Fetch metadata and listing status in parallel for user-owned NFTs
      const nftPromises = userTokenIds.map(async (tokenId) => {
        try {
          const [tokenURI, asset] = await Promise.all([
            contract.tokenURI(tokenId),
            contract.assets(tokenId),
          ]);

          // 🚀 Use fetchMetadata & fetchImage helpers!
          const metadata = await fetchMetadata(tokenURI);
          const image = fetchImage(metadata.file);

          return {
            id: tokenId.toString(),
            ...metadata,
            image,
            isListed: asset.isListed,
            price:ethers.formatEther(asset.price)
          };
        } catch (error) {
          console.error(`❌ Error fetching NFT ${tokenId}:`, error);
          return null;
        }
      });

      const ownedNFTs = (await Promise.all(nftPromises)).filter(Boolean);

      dispatch(updateToast({ message: "✨ NFTs fetched successfully!", type: "success" }));

      return ownedNFTs;
    } catch (error) {
      console.error("🚨 Error fetching NFTs:", error.message);
      dispatch(updateToast({ message: error.message || "Failed to fetch NFTs", type: "error" }));
      return rejectWithValue(error.message || "Failed to fetch NFTs");
    }
  }
);






  

// 🛠️ Slice definition
const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    data: null,
    ownedNFTs: [],
    loading: false,
    error: null,
    purchases:[]
  },
  reducers: {
    updateProfile(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    resetProfile(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.walletAddress = null;
      state.balance = 0;
      state.listed=0;
      state.purchases=[]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance; // Store the balance
        state.walletAddress = action.payload.walletAddress; // Store wallet address too
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch wallet balance";
      })
      .addCase(fetchNFTsOwned.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNFTsOwned.fulfilled, (state, action) => {
        state.ownedNFTs = action.payload;

        state.listed = action.payload.filter(nft => nft.isListed).length;
        state.loading = false;
      })
      .addCase(fetchNFTsOwned.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchUserPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch purchases.";
      });
      
  },
});

// 🚀 Export actions and reducer
export const { updateProfile, resetProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
