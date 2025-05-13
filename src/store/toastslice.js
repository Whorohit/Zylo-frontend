import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { message: "", type: "info", show: false },
  reducers: {
    updateToast(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = true;
    },
    clearToast(state) {
      state.show = false;
      state.message = "";
      state.type = "info";
    },
  },
});

export const { updateToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
