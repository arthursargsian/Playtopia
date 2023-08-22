import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/style/style.scss";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./redux/reducers";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const store = configureStore({
    reducer: reducers,
    devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ToastContainer/>
        <App/>
    </Provider>
);

reportWebVitals();
