import {createReducer} from "@reduxjs/toolkit";
import {getComments, sendComment} from "../actions/comments";
import _ from "lodash";
import Utils from "../../Utils";

const initialState = {
    commentsList: [],
    commentsListStatus: "",
    totalPages: 1,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getComments.pending, (state, action) => {
            state.commentsListStatus = "loading";
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.commentsListStatus = "success";
            state.commentsList = action.payload.comments.reverse();
            state.totalPages = action.payload.totalPages;
        })
        .addCase(getComments.rejected, (state, action) => {
            state.commentsListStatus = "loading";
        })
        .addCase(sendComment.fulfilled, (state, action) => {
            state.commentsList = [{
                id: _.uniqueId(),
                createdAt: new Date().toISOString(),
                firstName: Utils.getClient()?.name,
                lastName: Utils.getClient()?.lastName,
                message: action.meta.arg.comment,
                productId: action.meta.arg.id,
            }, ...state.commentsList.reverse()];
        })
});

