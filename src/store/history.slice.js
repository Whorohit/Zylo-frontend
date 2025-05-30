import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Use Sepolia API endpoint instead of mainnet
const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";
const ETHERSCAN_API_KEY = "R7VVTUM37ZTF3THHHKYB29Z5J1T5WR589D";

export const fetchUserTransactions = createAsyncThunk(
  "userTransactions/fetchUserTransactions",
  async (walletAddress, { rejectWithValue }) => {
    try {
      const url = `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "1") {
        return data.result.map((tx) => ({
          date: new Date(tx.timeStamp * 1000).toLocaleDateString(),
          type: tx.to.toLowerCase() === walletAddress.toLowerCase() ? "Received" : "Sent",
          nft: "N/A", // You can enhance this if you're tracking NFTs separately
          price: `${parseFloat(tx.value) / 1e18} ETH`,
          status: tx.isError === "0" ? "Completed" : "Failed",
        }));
      } else {
        return rejectWithValue(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Redux slice remains unchanged
const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactions } = userTransactionsSlice.actions;
export default userTransactionsSlice.reducer;
