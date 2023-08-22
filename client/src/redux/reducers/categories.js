import {createReducer} from "@reduxjs/toolkit";
import {addCategories, categoriesList, deleteCategories, getCategories} from "../actions/categories";
import _ from "lodash";

const initialState = {
    categories: [],
    categoriesStatus: "",
    categoriesList: [],
    categoriesListStatus: "",
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(getCategories.pending, (state, action) => {
            state.categoriesStatus = "loading";
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categoriesStatus = "success";
            state.categories = action.payload;
        })
        .addCase(addCategories.pending, (state, action) => {
            state.categoriesStatus = "loading";
        })
        .addCase(addCategories.fulfilled, (state, action) => {
            const newCategory = {
                id: _.uniqueId("www"),
                name: action.meta.arg,
                createdAt: new Date().toISOString(),
                updateAt: new Date().toISOString()
            }
            state.categories = [...state.categories, newCategory];
        })
        .addCase(deleteCategories.fulfilled, (state, action) => {
            state.categories = [...state.categories].filter((item) => item.name !== action.meta.arg);
        })
        .addCase(categoriesList.pending, (state, action) => {
            state.categoriesListStatus = "loading";
        })
        .addCase(categoriesList.fulfilled, (state, action) => {
            state.categoriesListStatus = "success";
            state.categoriesList = action.payload;
        })
        .addCase(categoriesList.rejected, (state, action) => {
            state.categoriesListStatus = "fail";
        })
});

