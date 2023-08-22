import React, {useCallback, useEffect, useState} from "react";
import GeneratorForm from "../GeneratorForm";
import GeneratorUpload from "../GeneratorUpload";
import {ReactComponent as Plus} from "../../../../assets/img/svg/plus2.svg";
import Button from "../../../common/Button";
import TorrentFile from "../TorrentFile";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, uploadCover, uploadImages, uploadTorrent} from "../../../../redux/actions/products";
import {showToast} from "../../../../Utils";


function GeneratorAddProduct() {
    const dispatch = useDispatch();
    const cover = useSelector((store) => store.rest.cover);
    const galleries = useSelector((store) => store.rest.galleries);
    const torrent = useSelector((store) => store.rest.torrent);
    const ProductForm = useSelector((store) => store.rest.ProductForm);

    const addProductMessage = useSelector((store) => store.products.addProductMessage);
    const addProductStatus = useSelector((store) => store.products.addProductStatus);

    useEffect(() => {
        showToast(addProductStatus, addProductMessage);
    }, [addProductStatus, addProductMessage]);

    const handleAddProduct = useCallback(() => {
        const gameName = ProductForm.name;
        dispatch(addProduct(ProductForm));
        if (cover.type) dispatch(uploadCover({cover, gameName}));
        if (galleries) dispatch(uploadImages({galleries, gameName}));
        if (torrent.type) dispatch(uploadTorrent({torrent, gameName}));
    }, [cover, galleries, torrent, ProductForm]);

    return (
        <>
            <main className="generator">
                <GeneratorForm/>
                <GeneratorUpload/>
            </main>
            <div className="generator-footer">
                <TorrentFile/>
                <Button onClick={handleAddProduct} variant="add-product">
                    <span><Plus/></span> Add Product
                </Button>
            </div>
        </>
    );
}

export default GeneratorAddProduct;
