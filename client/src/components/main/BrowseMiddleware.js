import React from "react";
import {useSelector} from "react-redux";
import BrowseCom from "./filter/BrowseCom";
import SearchCom from "./filter/SearchCom";
import CategoreisCom from "./filter/CategoreisCom";

function BrowseMiddleware() {
    const browseState = useSelector((store) => store.rest.browseStateInfo);

    return (
        <>
            {browseState === "browse" ? <BrowseCom/> : browseState === "search" ? <SearchCom/> : <CategoreisCom/>}
        </>
    );
}

export default BrowseMiddleware;
