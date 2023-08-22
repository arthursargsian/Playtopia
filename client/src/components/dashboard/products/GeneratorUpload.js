import React from "react";
import CoverProduct from "./CoverProduct";
import GalleriesProduct from "./GalleriesProduct";

function GeneratorUpload({state, singleData}) {

    return (
        <>
            <main className="generator-upload">
                <CoverProduct state={state} coverProduct={singleData?.big_img}/>
                <GalleriesProduct state={state} galleriesProduct={singleData?.small_img}/>
            </main>
        </>
    );
}

export default GeneratorUpload;
