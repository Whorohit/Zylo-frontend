import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import marketplacereducer from './etherslice';
import toastreducer from './toastslice'
import userProfileReducer from './userprofileslice'
import cartReducer from './CartSlice'
import searchByNameReducer from './Searchslice'
import usersalesreducer from './usersale.slice'
import userTransactionsSlice from './history.slice'
import Categoryreducer from './category.slice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    marketplace: marketplacereducer,
    toast: toastreducer,
    userProfile: userProfileReducer,
    cart: cartReducer,
    searchByName: searchByNameReducer,
    userSales: usersalesreducer,
    userTransactions:userTransactionsSlice,
    category:Categoryreducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
