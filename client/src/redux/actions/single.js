import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const single = createAsyncThunk("single/single", async (id) => {
    const {data} = await Api.single(id);
    return data;
});

export const rating = createAsyncThunk("single/rating", async (payload) => {
    const {data} = await Api.rating(payload);
    return data;
});

