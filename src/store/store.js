import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import marketplacereducer from './etherslice';
import toastreducer from './toastslice'
import userProfileReducer from './userprofileslice'
import cartReducer from './CartSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    marketplace:marketplacereducer,
    toast:toastreducer ,
    userProfile: userProfileReducer,
    cart:cartReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
