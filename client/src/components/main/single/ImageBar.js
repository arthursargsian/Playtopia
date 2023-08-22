import React, {useCallback, useState} from "react";
import {pathCover, pathGalleries} from "../../../Utils";
import ImageGallery from "react-image-gallery";

function ImageBar({cover, galleries}) {
    const [zoomed, setZoomed] = useState(false);

    const images = galleries
        ? galleries.map((gallery) => ({
            original: pathGalleries(gallery?.name),
            thumbnail: pathGalleries(gallery?.name),
        }))
        : [];

    const handleScreenChange = useCallback((isFullscreen) => {
        setZoomed(isFullscreen);
    }, [setZoomed]);

    return (
        <>
            <div className="container">
                <div className="images-container">
                    <div className="cover-block">
                        <img src={pathCover(cover)} alt="no found"/>
                    </div>
                    <div className={`galleries-block ${zoomed ? "zoomed" : ""}`}>
                        <ImageGallery onScreenChange={handleScreenChange} autoPlay={true} slideInterval={5000}
                                      disableSwipe={true} items={images}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ImageBar;
