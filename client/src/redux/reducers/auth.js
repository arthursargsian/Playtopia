import {createReducer} from "@reduxjs/toolkit";
import {addAdmin, getClients, logOut, removeUsers, signIn, signUp} from "../actions/auth";

const initialState = {
    signUpStatus: "",
    signUpMessage: "",
    signInStatus: "",
    signInMessage: "",
    token: "",
    client: [],
    clientsStatus: "",
    adminsList: [],
    usersList: [],
    addAdminMessage: "",
    addAdminStatus: ""
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(signUp.pending, (state, action) => {
            state.signUpStatus = "loading";
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.signUpStatus = "success";
            state.signUpMessage = action.payload.msg;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.signUpStatus = "fail";
            state.signUpMessage = action.payload.response.data.msg;
        })
        .addCase(signIn.pending, (state, action) => {
            state.signInStatus = "loading";
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.signInStatus = "success";
            state.client = action.payload;
            state.token = action.payload.token;
            localStorage.setItem("client", JSON.stringify(action.payload));
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(signIn.rejected, (state, action) => {
            state.signInStatus = "fail";
            state.signInMessage = action.payload.response.data.msg;
        })
        .addCase(getClients.pending, (state, action) => {
            state.clientsStatus = "loading";
        })
        .addCase(getClients.fulfilled, (state, action) => {
            state.clientsStatus = "success";
            state.adminsList = action.payload.filter((item) => item.role === "admin");
            state.usersList = action.payload.filter((item) => item.role === "user");
        })
        .addCase(getClients.rejected, (state, action) => {
            state.clientsStatus = "fail";
        })
        .addCase(removeUsers.fulfilled, (state, action) => {
            state.usersList = [...state.usersList].filter((item) => item.uuid !== action.meta.arg);
        })
        .addCase(addAdmin.pending, (state, action) => {
            state.addAdminStatus = "loading";
        })
        .addCase(addAdmin.fulfilled, (state, action) => {
            state.addAdminStatus = "success";
            state.addAdminMessage = action.payload.msg;
        })
        .addCase(addAdmin.rejected, (state, action) => {
            state.addAdminStatus = "fail";
            state.addAdminMessage = action.payload.response.data.msg;
        })
        .addCase(logOut, () => {
            localStorage.removeItem("token");
            localStorage.removeItem("client");
        })
});

