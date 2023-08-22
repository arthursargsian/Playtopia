import React, {useCallback, useEffect, useState} from "react";
import Button from "../../common/Button";
import ProductsAddGalleriesEmpty from "./ProductsAddGalleriesEmpty";
import {showToast} from "../../../Utils";
import {useDispatch, useSelector} from "react-redux";
import {galleriesProducts} from "../../../redux/actions/rest";
import {pathGalleries} from "../../../Utils";

const MAX_GALLERY_FILES = 6;

function GalleriesProduct({state, galleriesProduct}) {
    const dispatch = useDispatch();
    const [galleries, setGalleries] = useState([]);
    const [galleriesUrl, setGalleriesUrl] = useState([]);
    const [emptyNumbers, setEmptyNumbers] = useState(6);
    const addProductStatus = useSelector((store) => store.products.addProductStatus);

    useEffect(() => {
        dispatch(galleriesProducts(galleries));
        if (addProductStatus === "success") {
            setGalleriesUrl([]);
            setGalleries([]);
            setEmptyNumbers(6);
        }
    }, [dispatch, galleries, addProductStatus]);

    useEffect(() => {
        if (state === "update" && galleriesProduct) {
            setEmptyNumbers(MAX_GALLERY_FILES - galleriesProduct.length);
            const generatedUrls = galleriesProduct?.map((item) => pathGalleries(item.name)) || [];
            setGalleriesUrl(generatedUrls);
            setGalleriesUrl(generatedUrls);
        }
    }, [state, galleriesProduct]);

    const handleGalleries = useCallback((ev) => {
        const selectedFiles = ev.target.files;
        if (selectedFiles.length > MAX_GALLERY_FILES) {
            showToast("fail", `You can select up to ${MAX_GALLERY_FILES} images.`);
            return;
        }
        const validImageTypes = ['image/jpeg', 'image/png'];
        const isValidFile = (file) => validImageTypes.includes(file.type);
        const filteredFiles = Array.from(selectedFiles).filter((file) => isValidFile(file));
        if (filteredFiles.length > MAX_GALLERY_FILES) {
            showToast("fail", 'Please select valid image files only.');
            return;
        }
        setGalleries((prev) => {
            return [...prev, ...filteredFiles];
        });
        const newUrls = filteredFiles.map((file) => URL.createObjectURL(file));
        setGalleriesUrl((prev) => {
            const totalUrls = [...prev, ...newUrls];
            return totalUrls.slice(-MAX_GALLERY_FILES);
        });
        setEmptyNumbers(emptyNumbers - selectedFiles.length);
    }, [emptyNumbers]);


    const handleGalleryCencel = useCallback((url) => {
        setGalleriesUrl((prevUrls) => prevUrls.filter((prevUrl) => prevUrl !== url));
        setEmptyNumbers(emptyNumbers + 1);
    }, [emptyNumbers]);
    return (
        <>
            <div className="generator-files">
                <input onChange={(ev) => handleGalleries(ev)} className="upload" accept="iamge/*" multiple max={6}
                       type="file" id="images"/>
                {galleriesUrl?.map((item) => (
                    <div className="small-img" key={item}>
                        <img src={item} alt="no found image"/>
                        <Button variant="cancel" onClick={() => handleGalleryCencel(item)}><span>X</span></Button>
                    </div>
                ))}
                <ProductsAddGalleriesEmpty emptyNumbers={emptyNumbers}/>
            </div>
        </>
    );
}

export default GalleriesProduct;
