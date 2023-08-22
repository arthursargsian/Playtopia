import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showToast} from "../../../../Utils";
import {addProduct, updateProduct, uploadCover, uploadImages, uploadTorrent} from "../../../../redux/actions/products";
import GeneratorForm from "../GeneratorForm";
import {ReactComponent as Update} from "../../../../assets/img/svg/update2.svg";
import GeneratorUpload from "../GeneratorUpload";
import TorrentFile from "../TorrentFile";
import Button from "../../../common/Button";
import {useParams} from "react-router-dom";
import {single} from "../../../../redux/actions/single";

function GeneratorUpdateProduct() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const cover = useSelector((store) => store.rest.cover);
    const galleries = useSelector((store) => store.rest.galleries);
    const torrent = useSelector((store) => store.rest.torrent);
    const ProductForm = useSelector((store) => store.rest.ProductForm);

    const singleData = useSelector((store) => store.single.singleData.product);

    // useEffect(() => {
    //     showToast(addProductStatus, addProductMessage);
    // }, [addProductStatus, addProductMessage]);

    useEffect(() => {
        dispatch(single(id));
    }, [id, dispatch]);

    const handleUpdateProduct = useCallback(() => {
        const gameName = ProductForm.name;
        dispatch(updateProduct({ProductForm, id}));
        if (cover) dispatch(uploadCover({cover, gameName}));
        if (galleries[0]) dispatch(uploadImages({galleries, gameName}));
        if (torrent.type) dispatch(uploadTorrent({torrent, gameName}));
    }, [cover, galleries, torrent, ProductForm]);

    return (
        <>
            <main className="generator">
                <GeneratorForm state={"update"} singleData={singleData}/>
                <GeneratorUpload state={"update"} singleData={singleData}/>
            </main>
            <div className="generator-footer">
                <TorrentFile state={"update"} name={singleData?.name}/>
                <Button onClick={handleUpdateProduct} variant="add-product">
                    <span><Update/></span> Update Product
                </Button>
            </div>
        </>
    );
}

export default GeneratorUpdateProduct;
