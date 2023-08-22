import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const addProduct = createAsyncThunk("products/addProduct", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.addProduct(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const uploadCover = createAsyncThunk("upload/UploadCover", async (payload) => {
    setTimeout(async () => {
        const {data} = await Api.uploadCover(payload.cover, payload.gameName);
        return data;
    }, 1000);
});

export const uploadImages = createAsyncThunk("upload/uploadImages", async (payload) => {
    setTimeout(async () => {
        const {data} = await Api.uploadImages(payload.galleries, payload.gameName);
        return data;
    }, 1000);
});

export const uploadTorrent = createAsyncThunk("upload/uploadTorrent", async (payload) => {
    setTimeout(async () => {
        const {data} = await Api.uploadTorrent(payload.torrent, payload.gameName);
        return data;
    }, 1000);
});

export const getProducts = createAsyncThunk("products/getProducts", async (page) => {
    const {data} = await Api.getProducts(page);
    return data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    const {data} = await Api.deleteProduct(id);
    return data;
});


export const updateProduct = createAsyncThunk("products/updateProduct", async (payload) => {
    const {data} = await Api.updateProduct(payload.ProductForm, payload.id);
    return data;
});

