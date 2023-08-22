import {createReducer} from "@reduxjs/toolkit";
import {
    barsState,
    cover,
    galleriesProducts,
    generatorProductForm,
    torrent,
    pagenate,
    search,
    localSearch,
    carousel,
    filterState,
    browseState,
    localPage,
    localCategoreis,
    stateProfile
} from "../actions/rest";
import {getProducts} from "../actions/products";

const initialState = {
    barsState: false,
    ProductForm: [],
    cover: [],
    galleries: [],
    torrent: [],
    page: 1,
    searchList: [],
    searchStatus: "",
    localSearch: "",
    carouselData: [],
    carouselStatus: "",
    filterModal: false,
    browseStateInfo: "browse",
    localCategoreis: "",
    profile: false
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(barsState, (state, action) => {
            state.barsState = action.payload.value;
        })
        .addCase(generatorProductForm, (state, action) => {
            state.ProductForm = action.payload.form;
        })
        .addCase(cover, (state, action) => {
            state.cover = action.payload.image;
        })
        .addCase(galleriesProducts, (state, action) => {
            state.galleries = action.payload.images;
        })
        .addCase(torrent, (state, action) => {
            state.torrent = action.payload.torrent;
        })
        .addCase(pagenate, (state, action) => {
            state.page = action.payload.page;
        })
        .addCase(search.pending, (state, action) => {
            state.searchStatus = "loading";
        })
        .addCase(search.fulfilled, (state, action) => {
            state.searchStatus = "success";
            state.searchList = action.payload;
        })
        .addCase(search.rejected, (state, action) => {
            state.searchStatus = "fail";
        })
        .addCase(localSearch, (state, action) => {
            state.localSearch = action.payload.text;
        })
        .addCase(carousel.pending, (state, action) => {
            state.carouselStatus = "loading";
        })
        .addCase(carousel.fulfilled, (state, action) => {
            state.carouselStatus = "success";
            state.carouselData = action.payload;
        })
        .addCase(carousel.rejected, (state, action) => {
            state.carouselStatus = "fail";
        })
        .addCase(filterState, (state, action) => {
            state.filterModal = action.payload.state;
        })
        .addCase(browseState, (state, action) => {
            state.browseStateInfo = action.payload.state;
        })
        .addCase(localCategoreis, (state, action) => {
            state.localCategoreis = action.payload.cat;
        })
        .addCase(stateProfile, (state, action) => {
            state.profile = action.payload.state;
        })
});

