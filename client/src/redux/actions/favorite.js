import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const addFavorite = createAsyncThunk("favorite/addFavorite", async (id) => {
    const {data} = await Api.addFavorite(id);
    return data;
});

export const removeFavorite = createAsyncThunk("favorite/removeFavorite", async (id) => {
    const {data} = await Api.removeFavorite(id);
    return data;
});

export const getFavorite = createAsyncThunk("favorite/getFavorite", async (page) => {
    const {data} = await Api.getFavorite(page);
    return data;
});

export const lastFavorites = createAsyncThunk("favorite/lastFavorites", async () => {
    const {data} = await Api.lastFavorites();
    return data;
});

