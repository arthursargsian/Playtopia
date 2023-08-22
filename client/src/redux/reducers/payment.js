import {createReducer} from "@reduxjs/toolkit";
import {basketSecret, getBasket, getClientSecret, paymentConfirm, paymentConfirmBasket} from "../actions/payment";

const initialState = {
    clientSecret: "",
    clientSecretStatus: "",
    torrent: "",
    torrentStatus: "",
    torrentName: "",
    basketListData: [],
    basketTotalPrice: 0,
    basketPage: 1,
    basketListStatus: "",
    basketClietSecret: "",
    basketClietSecretStatus: "",
    torrents: [],
    torrentsName: [],
    torrentsStatus: ""
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getClientSecret.pending, (state, action) => {
            state.clientSecretStatus = "loading";
        })
        .addCase(getClientSecret.fulfilled, (state, action) => {
            state.clientSecretStatus = "success";
            state.clientSecret = action.payload.paymentIntent.client_secret;
        })
        .addCase(getClientSecret.rejected, (state, action) => {
            state.clientSecretStatus = "fail";
        })
        .addCase(paymentConfirm.pending, (state, action) => {
            state.torrentStatus = "loading";
        })
        .addCase(paymentConfirm.fulfilled, (state, action) => {
            state.torrentStatus = "success";
            state.torrent = action.payload.charge.metadata.download_link;
            state.torrentName = action.payload.charge.metadata.product_name;
        })
        .addCase(paymentConfirm.rejected, (state, action) => {
            state.torrentStatus = "fail";
        })
        .addCase(getBasket.pending, (state, action) => {
            state.basketListStatus = "loading";
        })
        .addCase(getBasket.fulfilled, (state, action) => {
            state.basketListStatus = "success";
            state.basketListData = action.payload.data;
            state.basketTotalPrice = action.payload.totalPrice;
            state.basketPage = action.payload.totalPage;
        })
        .addCase(getBasket.rejected, (state, action) => {
            state.basketListStatus = "fail";
        })
        .addCase(basketSecret.pending, (state, action) => {
            state.basketClietSecretStatus = "loading";
        })
        .addCase(basketSecret.fulfilled, (state, action) => {
            state.basketClietSecretStatus = "success";
            state.basketClietSecret = action.payload.paymentIntent.client_secret;
        })
        .addCase(basketSecret.rejected, (state, action) => {
            state.basketClietSecretStatus = "fail";
        })
        .addCase(paymentConfirmBasket.pending, (state, action) => {
            state.torrentsStatus = "loading";
        })
        .addCase(paymentConfirmBasket.fulfilled, (state, action) => {
            state.torrentsStatus = "success";
            state.torrents = action.payload.charge.metadata.download_links;
        })
        .addCase(paymentConfirmBasket.rejected, (state, action) => {
            state.torrentsStatus = "fail";
        })
});

