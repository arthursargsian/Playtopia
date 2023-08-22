import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getClientSecret = createAsyncThunk("payment/getClientSecret", async (id) => {
    const {data} = await Api.getClientSecret(id);
    return data;
});

export const paymentConfirm = createAsyncThunk("payment/paymentConfirm", async (paymentConfirm) => {
    const {data} = await Api.paymentConfirm(paymentConfirm);
    return data;
});

export const addBasket = createAsyncThunk("payment/addBasket", async (id) => {
    const {data} = await Api.addBasket(id);
    return data;
});

export const removeBasket = createAsyncThunk("payment/removeBasket", async (id) => {
    const {data} = await Api.removeBasket(id);
    return data;
});

export const getBasket = createAsyncThunk("payment/getBasket", async (id) => {
    const {data} = await Api.getBasket(id);
    return data;
});

export const basketSecret = createAsyncThunk("payment/basketSecret", async () => {
    const {data} = await Api.basketSecret();
    return data;
});

export const paymentConfirmBasket = createAsyncThunk("payment/paymentConfirmBasket", async (paymentIntent) => {
    const {data} = await Api.paymentConfirmBasket(paymentIntent);
    return data;
});
