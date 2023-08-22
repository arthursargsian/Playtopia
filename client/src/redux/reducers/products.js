import {createReducer} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, getCategories, getProducts} from "../actions/products";

const initialState = {
    addProductStatus: "",
    addProductMessage: "",
    getProductsStatus: "",
    getProductsList: [],
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(addProduct.pending, (state, action) => {
            state.addProductStatus = "loading";
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.addProductStatus = "success";
            state.addProductMessage = action.payload.msg;
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.addProductStatus = "fail";
            state.addProductMessage = action.payload.response.data;
        })
        .addCase(getProducts.pending, (state, action) => {
            state.getProductsStatus = "loading";
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.getProductsStatus = "success";
            state.getProductsList = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.getProductsStatus = "fail";
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.getProductsList.data = [...state.getProductsList.data].filter((item) => item.id !== action.meta.arg);
        })
});

