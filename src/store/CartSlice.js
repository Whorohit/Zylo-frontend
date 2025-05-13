import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateToast } from "./toastslice";
import { fetchAssetByIndex } from "../utils/utils";
import { fetchFromAPI } from "../utils/sharing";

// ✅ Common API fetch helper


// 🔹 1️⃣ Get Cart
export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
    try {
      // Fetch the cart items (assuming cart contains asset IDs)
      const data = await fetchFromAPI("http://localhost:5000/api/cart/cart");
      console.log(data);
      
      const cartItems = data.cart || [];
  
      // If the cart is empty, return an empty array immediately
      if (cartItems.length === 0) return [];
  
      // Fetch asset details for each cart item in parallel using Promise.all
      const assets = await Promise.all(cartItems.map((assetId) => fetchAssetByIndex(assetId)));
  
      return assets; // Return the detailed asset data
    } catch (error) {
        console.log(error);
        
      return rejectWithValue(error.message);
    }
  });
  

// 🔹 2️⃣ Add to Cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId, { rejectWithValue, dispatch }) => {
      try {
        const data = await fetchFromAPI("http://localhost:5000/api/cart/addtocart", "POST", { productId });
        dispatch(updateToast({ message: "added to cart!", type: "success" })); // ✅ Custom toast dispatch
        return data.cart;
      } catch (error) {
        dispatch(updateToast({ message: error.message, type: "error" })); // ✅ Error toast dispatch
        return rejectWithValue(error.message);
      }
    }
  );
  

// 🔹 3️⃣ Remove from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { rejectWithValue }) => {
    try {
        const data = await fetchFromAPI("http://localhost:5000/api/cart/removecart", "POST", { productId });
        return data.cart;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// 🔹 4️⃣ Clear Cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
    try {
        const data = await fetchFromAPI("http://localhost:5000/api/cart/clear", "GET");
        return [];
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//
// 🚀 Cart Slice — Redux Setup
//
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // 🛠️ Get Cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                console.log(action.payload);
                
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // 🛠️ Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // 🛠️ Remove from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // 🛠️ Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
