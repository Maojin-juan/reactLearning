import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clientProductAPI } from "@/services/client/product";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await clientProductAPI.getCart();
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    status: "idle",
    error: null,
  },
  reducers: {
    resetCartStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetCartStatus } = cartSlice.actions;
export default cartSlice.reducer;
