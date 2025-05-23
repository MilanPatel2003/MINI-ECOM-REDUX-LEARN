import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: { rate: number; count: number };
  image: string;
}

interface ProductState {
  items: Product[];
  singleProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  singleProduct: null,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id: number) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
