import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    const {data} = await Api.getCategories();
    return data;
});

export const addCategories = createAsyncThunk("categories/addCategories", async (name) => {
    const {data} = await Api.addCategories(name);
    return data;
});

export const deleteCategories = createAsyncThunk("categories/deleteCategories", async (name) => {
    const {data} = await Api.deleteCategories(name);
    return data;
});

export const categoriesList = createAsyncThunk("categories/categoriesList", async (payload) => {
    const {data} = await Api.categoriesList(payload);
    return data;
});

