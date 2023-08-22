import React, {useCallback, useEffect, useState} from "react";
import Button from "../../common/Button";
import {ReactComponent as Add} from "../../../assets/img/svg/plus.svg";
import {showToast} from "../../../Utils";
import {useDispatch, useSelector} from "react-redux";
import {cover} from "../../../redux/actions/rest";
import {pathCover} from "../../../Utils";


function CoverProduct({state, coverProduct}) {
    const dispatch = useDispatch();
    const [coverUrl, setCoverUrl] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const addProductStatus = useSelector((store) => store.products.addProductStatus);

    useEffect(() => {
        if (state === "update" && coverProduct) {
            setCoverUrl(pathCover(coverProduct));
            setCoverImage(coverProduct);
        }
    }, [state, coverProduct]);

    useEffect(() => {
        dispatch(cover(coverImage));
        if (addProductStatus === "success") {
            setCoverUrl("");
            setCoverImage([]);
        }
    }, [dispatch, coverImage, addProductStatus]);

    const handleCoverImage = useCallback((ev) => {
        const [file] = ev.target.files;
        if (!file) return;
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(file.type)) {
            showToast("fail", "Please select a valid image file.")
            return;
        }
        const url = URL.createObjectURL(file);
        setCoverImage(ev.target.files[0]);
        setCoverUrl(url);
    }, []);

    const handleCencelCover = useCallback(() => {
        const timeoutId = setTimeout(() => {
            setCoverImage("");
            setCoverUrl("");
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [coverUrl, coverImage]);

    return (
        <>
            <div className="generator-file">
                {!coverUrl ? <input onChange={(ev) => handleCoverImage(ev)} accept="iamge/*" required className="upload" id="file" type="file"/> : null}
                <label htmlFor="file">
                    <div className="big-img">
                        {coverUrl ? <img src={coverUrl} alt=""/> : <Add/>}
                        {coverUrl ? <Button variant="cancel" onClick={handleCencelCover}><span>X</span>
                        </Button> : null}
                    </div>
                </label>
            </div>
        </>
    );
}

export default CoverProduct;
