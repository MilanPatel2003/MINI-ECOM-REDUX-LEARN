import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get("https://fakestoreapi.com/products")
    return res.data
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export default productSlice.reducer;