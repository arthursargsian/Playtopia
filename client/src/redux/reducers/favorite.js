import {createReducer} from "@reduxjs/toolkit";
import {getFavorite, lastFavorites} from "../actions/favorite";

const initialState = {
    favoriteList: [],
    favoriteListStatus: "",
    lastFavoritesList: [],
    lastFavoritesStatus: "",
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getFavorite.pending, (state, action) => {
            state.favoriteListStatus = "loading";
        })
        .addCase(getFavorite.fulfilled, (state, action) => {
            state.favoriteListStatus = "success";
            state.favoriteList = action.payload;
        })
        .addCase(getFavorite.rejected, (state, action) => {
            state.favoriteListStatus = "loading";
        })
        .addCase(lastFavorites.pending, (state, action) => {
            state.lastFavoritesStatus = "loading";
        })
        .addCase(lastFavorites.fulfilled, (state, action) => {
            state.lastFavoritesStatus = "success";
            state.lastFavoritesList = action.payload;
        })
        .addCase(lastFavorites.rejected, (state, action) => {
            state.lastFavoritesStatus = "loading";
        })
});

