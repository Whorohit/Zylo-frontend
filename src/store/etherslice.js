import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import MarketplaceABI from "../contracts/NFTMarketplace.json";
import { updateToast } from "./toastslice";
import { fetchImage, fetchMetadata } from "../utils/utils";

// Contract address (Sepolia Testnet)
// const CONTRACT_ADDRESS = "0x3067A66Cc55cFd6c3f7C096eF6EbbC3b3F5feBc4";  // old wth 15 image 
// const CONTRACT_ADDRESS = "0xc3a4ebE30a23c32b99Fa5F2Ce0676FD67cfeEd6f";  date  8/3/25  contrract
// const CONTRACT_ADDRESS = "0x0FDDA41c906E38B03DB335DcE85c19420343f1ff"; // date  8/3/25      getassets condition checking   contrract
// const CONTRACT_ADDRESS = "0xCc288b6f98C10a0738b79023fcC228c5dD7E0d6a"; // date  8/3/25      getassets condition checking   contrract
// const CONTRACT_ADDRESS = "0x56d623170D2563B0D572E6E0c2d841ccb432acc8"; // date  8/3/25      getassets condition checking   contrract
// const CONTRACT_ADDRESS = "0x5E4f3b298A2Af5DAd7d141381fa996D8E0E9BDAf"; // date  8/3/25      getassets condition checking   contrract
const CONTRACT_ADDRESS = "0xE910Eaabd6D47e1D4bE0b0447Ce3e0E40191996c"; // date  8/3/25      getassets condition checking   contrract

// Category mapping to match Solidity enum
const categoryEnum = {
  DigitalArt: 0,
  Illustrations: 1,
  Photography: 2,
  Music: 3,
  Gaming: 4,
  Collectibles: 5,
};

// Singleton pattern for contract instance
let contractInstance = null;

// ✅ Function to get the contract instance
// const getContract = async (needSigner = false) => {
//   try {
//     if (!window.ethereum) {
//       console.error("MetaMask is not installed");
//       throw new Error("MetaMask is not installed");
//     }

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signerOrProvider = needSigner ? await provider.getSigner() : provider;

//     if (!contractInstance || needSigner) {
//       contractInstance = new ethers.Contract(CONTRACT_ADDRESS, MarketplaceABI.abi, signerOrProvider);
//       console.log("Contract initialized:", contractInstance);
//     }

//     return contractInstance;
//   } catch (error) {
//     console.error("Error initializing contract:", error);
//     throw error;
//   }
// };

 export  const getContract = async (needSigner = false) => {
  try {
    // Use public RPC for fetching
    const rpcProvider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");

    // Use MetaMask provider for signing transactions
    const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : rpcProvider;
    const signerOrProvider = needSigner && window.ethereum ? await provider.getSigner() : provider;

    return new ethers.Contract(CONTRACT_ADDRESS, MarketplaceABI.abi, signerOrProvider);
  } catch (error) {
    console.error("Error initializing contract:", error);
    throw error;
  }
};


// ✅ Function to check MetaMask login
// const checkMetaMaskLogin = async () => {
//   if (!window.ethereum) {
//     throw new Error("MetaMask is not installed.");
//   }

//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum);
    
//     // Get currently connected accounts
//     const accounts = await provider.send("eth_accounts", []);

//     if (accounts.length > 0) {
//       console.log("MetaMask already connected:", accounts[0]);
//       localStorage.setItem("isMetaMaskConnected", "true");
//       return accounts[0];
//     }

//     // If no account is connected, request connection
//     console.log("Requesting MetaMask connection...");
//     const requestedAccounts = await provider.send("eth_requestAccounts", []);

//     if (requestedAccounts.length > 0) {
//       console.log("MetaMask login successful:", requestedAccounts[0]);
//       localStorage.setItem("isMetaMaskConnected", "true");
//       return requestedAccounts[0];
//     } else {
//       throw new Error("User denied MetaMask connection.");
//     }
//   } catch (error) {
//     console.error("MetaMask authentication error:", error);
//     throw error;
//   }
// };



export const checkLogin = async (getState, dispatch) => {
  try {
    const { token, user } = getState().auth;

    if (!token || !user) throw new Error("User not logged in.");
    if (!window.ethereum) throw new Error("MetaMask is not installed.");

    const provider = new ethers.BrowserProvider(window.ethereum);

    let accounts = await provider.send("eth_accounts", []);

    if (accounts.length === 0) {
      console.log("🔓 No wallet connected — requesting MetaMask login...");
      
      try {
        // ✅ Use `window.ethereum.request` to **ensure it waits for user approval**
        accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        throw new Error("MetaMask login request was rejected.");
      }
    }

    if (accounts.length === 0) throw new Error("No accounts found. Please connect your wallet.");

    const signer = await provider.getSigner();
    const currentWallet = await signer.getAddress();

    console.log("🔍 Current wallet:", currentWallet);

    if (user.walletAddress && user.walletAddress.toLowerCase() !== currentWallet.toLowerCase()) {
      throw new Error("Connected wallet doesn't match your linked wallet.");
    }

    if (!user.walletAddress) {
      console.log("🔗 Linking wallet...");
      const response = await fetch("http://localhost:5000/api/user/link-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ walletAddress: currentWallet }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Failed to link wallet.");

      dispatch(updateToast({ message: "Wallet linked successfully!", type: "success" }));
    }

    return { walletAddress: currentWallet };
  } catch (error) {
    console.error("🚨 Error:", error);
    dispatch(updateToast({ message: error.message, type: "error" }));
    return null;
  }
};




export const fetchAssetByIndex = createAsyncThunk(
  "marketplace/fetchAssetById",
  async (assetId, { rejectWithValue }) => {
    try {
      const contract = await getContract(false);
     
      const asset = await contract.assets(assetId);
      if (!asset.isListed) throw new Error(`Asset ${assetId} is not listed.`);

      const tokenURI = await contract.tokenURI(assetId);

      // Fetch metadata and image separately
      const metadata = await fetchMetadata(tokenURI);
      const imageUrl = fetchImage(metadata.file);

      return {
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
      };
    } catch (error) {
      console.error(`Error fetching asset ${assetId}:`, error);
      return rejectWithValue(error.message);
    }
  }
);


// 🔹 Fetch all listed assets
export const fetchAssets = createAsyncThunk(
  "marketplace/fetchAssets",
  async (_, { rejectWithValue }) => {
    try {
      const contract = await getContract(false);
      const totalAssets = await contract.getTotalAssets();

      console.log("✨ Total assets in contract:", totalAssets.toString());

      // 🔥 Create an array of promises for asset fetching
      const assetPromises = Array.from(
        { length: Math.min(Number(totalAssets), 10) },
        (_, i) => i + 1
      ).map(async (i) => {
        try {
          const asset = await contract.assets(i);
          if (!asset.isListed) return null; // Skip unlisted assets

          const tokenURI = await contract.tokenURI(i);

          // ✅ Fetch metadata and image separately
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

      // 🌟 Run all promises in parallel!
      const assets = (await Promise.all(assetPromises)).filter(Boolean);

      console.log("✅ Final Fetched Assets:", assets);
      return assets;
    } catch (error) {
      console.error("🚨 Error in fetchAssets:", error);
      return rejectWithValue(error.message);
    }
  }
);




// ✅ List a new asset (Requires MetaMask login)
export const listAsset = createAsyncThunk(
  "marketplace/listAsset",
  async ({ name, metadataURI, price, category }, { getState, dispatch, rejectWithValue }) => {
    try {
      // ✅ Ensure user is logged in and wallet is linked
      const loginResult = await checkLogin(getState, dispatch);
      if (!loginResult || !loginResult.walletAddress) {
        throw new Error("Wallet login or linking failed.");
      }

      const contract = await getContract(true); // Require signer for transactions
      console.log("Received data:", { name, metadataURI, price, category });

      if (!price || isNaN(price)) {
        throw new Error(`Invalid price value: ${price}. Expected a number.`);
      }

      if (!Object.keys(categoryEnum).includes(category)) {
        throw new Error(`Invalid category: ${category}`);
      }

      const priceInWei = ethers.parseEther(price.toString());
      const categoryIndex = categoryEnum[category];

      console.log("Metadata URI:", metadataURI);
      console.log("Price in Wei:", priceInWei.toString());
      console.log("Category Index:", categoryIndex);

      // 🎉 Call the contract to list the asset
      const tx = await contract.listAsset(name, metadataURI, priceInWei, categoryIndex);
      const receipt = await tx.wait();

      const event = receipt.logs[0]?.args;
      if (!event) {
        throw new Error("No event emitted from the contract.");
      }

      dispatch(updateToast({ message:"listed successfully", type: "error" }));

      return {
        id: event.assetId,
        metadataURI,
        price,
        category,
      };
    } catch (error) {
      console.error("Error listing asset:", error);
      dispatch(updateToast({ message: error.message, type: "error" }));
      return rejectWithValue(error.message);
    }
  }
);




export const purchaseAsset = createAsyncThunk(
  "purchase/execute",
  async (nft, { getState, rejectWithValue, dispatch }) => {
    try {
      // ✅ Check login and wallet status first
      const loginResult = await checkLogin(getState, dispatch);
      if (!loginResult) return rejectWithValue("Wallet verification failed.");

      const { user } = getState().auth;
      const { walletAddress } = loginResult;

      console.log(`🔍 Verified wallet: ${walletAddress}`);

      // ✅ Get contract and prepare for purchase
      const contract = await getContract(true);
      const priceInWei = ethers.parseEther(nft.price);

      console.log(`🚀 Purchasing NFT ${nft.id} for ${nft.price} ETH...`);

      // ✅ Execute transaction
      const tx = await contract.purchase([nft.id], { value: priceInWei });

      console.log("⌛ Waiting for transaction confirmation...");
      await tx.wait();

      console.log(`✅ NFT ${nft.id} purchased successfully!`);

      // ✅ Show success toast
      dispatch(updateToast({ message: "Purchase successful!", type: "success" }));

      return { assetId: nft.id };
    } catch (error) {
      console.error("❌ Purchase failed:", error);

      // ❌ Show error toast
      dispatch(updateToast({ message: error.reason || error.message, type: "error" }));

      return rejectWithValue(error.reason || error.message);
    }
  }
);














// ✅ Redux Slice
const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState: {
    assets: [],
    cart:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(listAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })
      .addCase(fetchAssetByIndex.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssetByIndex.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsset = action.payload;
      })
      .addCase(fetchAssetByIndex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;}
      )
      .addCase(purchaseAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(purchaseAsset.fulfilled, (state, action) => {
        state.loading = false;
        const assetId = action.payload.assetId;
        const assetIndex = state.assets.findIndex((a) => a.id === assetId);
        if (assetIndex !== -1) {
          state.assets[assetIndex].isListed = false; // Mark as sold
        }
      })
      .addCase(purchaseAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(addToCart.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(addToCart.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.cart.push(action.payload);
      // })
      // .addCase(addToCart.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // .addCase(fetchUserCart.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchUserCart.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.cart = action.payload; // ✅ User ke cart items Redux store mai save karo
      // })
      // .addCase(fetchUserCart.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      
  },
});

export default marketplaceSlice.reducer;
