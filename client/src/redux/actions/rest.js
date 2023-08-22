import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const barsState = createAction("rest/barsState", (value) => {
    return {
        payload: {
            value,
        }
    }
});

export const generatorProductForm = createAction("rest/generatorProductForm", (form) => {
    return {
        payload: {
            form,
        }
    }
});

export const cover = createAction("rest/cover", (image) => {
    return {
        payload: {
            image,
        }
    }
});

export const galleriesProducts = createAction("rest/galleriesProducts", (images) => {
    return {
        payload: {
            images,
        }
    }
});

export const torrent = createAction("rest/torrent", (torrent) => {
    return {
        payload: {
            torrent,
        }
    }
});

export const pagenate = createAction("rest/pagenate", (page) => {
    return {
        payload: {
            page,
        }
    }
});

export const search = createAsyncThunk("rest/search", async (payload) => {
    const {data} = await Api.search(payload);
    return data;
});

export const localSearch = createAction("rest/localSearch", (text) => {
    return {
        payload: {
            text,
        }
    }
});

export const carousel = createAsyncThunk("rest/carousel", async () => {
    const {data} = await Api.carousel();
    return data;
});

export const filterState = createAction("rest/filterState", (state) => {
    return {
        payload: {
            state,
        }
    }
});

export const browseState = createAction("rest/browseState", (state) => {
    return {
        payload: {
            state,
        }
    }
});

export const localPage = createAction("rest/localPage", (page) => {
    return {
        payload: {
            page,
        }
    }
});

export const localCategoreis = createAction("rest/localCategoreis", (cat) => {
    return {
        payload: {
            cat,
        }
    }
});


export const stateProfile = createAction("rest/stateProfile", (state) => {
    return {
        payload: {
            state,
        }
    }
});
