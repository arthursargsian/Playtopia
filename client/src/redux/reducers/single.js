import {createReducer} from "@reduxjs/toolkit";
import {single} from "../actions/single";
import {addFavorite, removeFavorite} from "../actions/favorite";
import {addBasket, removeBasket} from "../actions/payment";

const initialState = {
    singleData: [],
    singleStatus: "",
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(single.pending, (state, action) => {
            state.singleStatus = "loading";
        })
        .addCase(single.fulfilled, (state, action) => {
            state.singleStatus = "success";
            state.singleData = action.payload;
        })
        .addCase(single.rejected, (state, action) => {
            state.singleStatus = "fail";
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
            state.singleData = {...state.singleData, favorite: {count: true}}
        })
        .addCase(removeFavorite.fulfilled, (state, action) => {
            state.singleData = {...state.singleData, favorite: {count: false}}
        })
        .addCase(addBasket.fulfilled, (state, action) => {
            state.singleData = {...state.singleData, basket: {count: true}}
        })
        .addCase(removeBasket.fulfilled, (state, action) => {
            state.singleData = {...state.singleData, basket: {count: false}}
        })
});

