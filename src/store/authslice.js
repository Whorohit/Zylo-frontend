import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { updateToast } from './toastslice';
import { fetchFromAPI } from '../utils/sharing';
// import { updateToast, updateToast } from "./toastslice";

 const apiUrl = import.meta.env.VITE_API_URL;
// Async thunk for MetaMask login
export const metaMaskLogin = createAsyncThunk(
  "auth/metaMaskLogin",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Check if MetaMask (Ethereum provider) is installed
      if (!window.ethereum) {
        dispatch(updateToast({ message: "MetaMask is not installed.", type: "error" }));
        return rejectWithValue("MetaMask is not installed.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      // Request accounts to ensure we get the ACTIVE one (the user actually selects)
      const requestedAccounts = await provider.send("eth_requestAccounts", []);

      if (requestedAccounts.length === 0) {
        dispatch(updateToast({ message: "No account selected or user denied connection.", type: "error" }));
        return rejectWithValue("No account selected or user denied connection.");
      }

      const activeAddress = requestedAccounts[0]; // Get the first one, which is the connected account
      console.log("Connected wallet address:", activeAddress);

      // Get signer linked to this active account
      const signer = await provider.getSigner();
      const message = `Sign in with your wallet: ${activeAddress}`;
      const signature = await signer.signMessage(message);

      // Send wallet address and signature to backend for authentication
      const response = await fetch(`${apiUrl}/api/user/metamask-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: activeAddress, signature }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // Handle errors from backend
      if (!data?.success) throw new Error(data.message || "MetaMask login failed.");

      dispatch(updateToast({ message: "MetaMask login successful!", type: "success" }));

      // Return user data for Redux state
      return data;
    } catch (error) {
      console.error("MetaMask login error:", error);
      dispatch(updateToast({ message: error?.message || "MetaMask login failed.", type: "error" }));
      return rejectWithValue(error.message || "MetaMask login failed.");
    }
  }
);





// Async thunk for email/password login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();


      if (!data?.success) {
        throw new Error(data.error || "Login failed.");
      }

      dispatch(updateToast({ message: data.message, type: "success" }));
      return data;
    } catch (error) {
      dispatch(
        updateToast({ message: error?.message || "Login failed.", type: "error" })
      );
      return rejectWithValue(error.message || "Login failed.");
    }
  }
);


// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed.");
      }

      dispatch(
        updateToast({
          message: data?.message || "Registration successful! You can now log in.",
          type: "success",
        })
      );

      return data;
    } catch (error) {
      dispatch(
        updateToast({
          message: error.message || "Registration failed.",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Registration failed.");
    }
  }
);

export const fetchProfileInfo = createAsyncThunk(
  "auth/fetchProfileInfo",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const response = await fetch(`${apiUrl}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.error || "Failed to fetch profile info.");

      return data.user;
    } catch (error) {
      dispatch(updateToast({ message: error.message || "Failed to fetch profile info", type: "error" }));
      return rejectWithValue(error.message);
    }
  }
);



export const linkWallet = createAsyncThunk(
  "auth/linkWallet",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;

      if (!window.ethereum) {
        dispatch(updateToast({ message: "MetaMask is not installed.", type: "error" }));
        return rejectWithValue("MetaMask is not installed.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();



      // 🔥 Send wallet to backend
      const response = await fetch(`${apiUrl}/api/user/link-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Failed to link wallet.");

      dispatch(updateToast({ message: "Wallet linked successfully!", type: "success" }));

      return { walletAddress };
    } catch (error) {
      console.error("Wallet link error:", error);
      dispatch(updateToast({ message: error.message || "Failed to link wallet.", type: "error" }));
      return rejectWithValue(error.message);
    }
  }
);



export const updateprofile = createAsyncThunk(
  "auth/updateprofile",
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const data = await fetchFromAPI(`${apiUrl}/api/user/updateprofile`, "POST", body);
      dispatch(updateToast({ message: "userprofile successfully updated", type: "success" }));
      console.log(data);
       // ✅ Custom toast dispatch
      return data.user;
    } catch (error) {
      dispatch(updateToast({ message: error.message, type: "error" })); // ✅ Error toast dispatch
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    iswallet: false,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    authmodel: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    showauthmodel: (state, action) => {
      state.authmodel = action.payload
    },
    setauthdata: (state, action) => {
      state.user = action.payload.user
      state.token = localStorage.getItem('token')
      state.iswallet = action.payload.walletAddress.length > 0
      state.isAuthenticated = !!localStorage.getItem('token')
    },
    setWalletAddress(state, action) {
      if (state.user) {
        state.user.walletAddress = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle MetaMask login
      .addCase(metaMaskLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(metaMaskLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.iswallet = action.payload.user.walletAddress.length > 0;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
      })
      .addCase(metaMaskLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle email/password login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.iswallet = action.payload.user?.walletAddress?.length > 0;
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.iswallet = action.payload.user?.walletAddress?.length > 0;
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(linkWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(linkWallet.fulfilled, (state, action) => {
        state.user.walletAddress = action.payload.walletAddress;
        state.iswallet = true;
        state.loading = false;
      })
      .addCase(linkWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateprofile.pending,(state,action)=>{
        state.loading=true;
        state.error = null;

      })
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateprofile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.iswallet = action.payload?.walletAddress?.length > 0;
        state.loading = false;
      })
      .addCase(fetchProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});



export const { logout, showauthmodel, setauthdata } = authSlice.actions;
export default authSlice.reducer;
