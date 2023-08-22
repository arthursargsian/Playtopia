import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const sendComment = createAsyncThunk("comments/sendComment", async (payload) => {
    const {data} = await Api.sendComment(payload);
    return data;
});

export const getComments = createAsyncThunk("comments/getComments", async (payload) => {
    const {data} = await Api.getComments(payload);
    return data;
});
