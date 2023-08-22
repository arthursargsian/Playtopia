import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const signUp = createAsyncThunk("auth/signUp", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.signUp(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const signIn = createAsyncThunk("auth/signIn", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.signIn(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getClients = createAsyncThunk("auth/getClients", async () => {
    const {data} = await Api.getClients();
    return data;
});

export const removeUsers = createAsyncThunk("auth/removeUsers", async (id) => {
    const {data} = await Api.removeUsers(id);
    return data;
});

export const addAdmin = createAsyncThunk("auth/addAdmin", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.addAdmin(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const logOut = createAction("auth/logOut");




