import React, {useCallback, useEffect} from "react";
import discoverVideo from "../../../assets/videos/disoverVideo.mp4";
import {ReactComponent as Logo} from "../../../assets/img/svg/logo.svg";
import {useDispatch, useSelector} from "react-redux";
import {carousel} from "../../../redux/actions/rest";
import {pathCover, pathGalleries} from "../../../Utils";
import {useNavigate} from "react-router-dom";


function SlickSlide() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselList = useSelector((store) => store.rest.carouselData);

    useEffect(() => {
        dispatch(carousel());
    }, []);

    const handleGoToSingle = useCallback((id) => {
        navigate(`/single/${id}`);
    }, []);

    return (
        <>
            <div className="slick-slider">
                <video src={discoverVideo} loop autoPlay muted style={{width: '100%', height: 'auto'}}></video>
                <div className="center-logo">
                    <Logo/>
                    <h1>Playtopia</h1>
                </div>
            </div>
            <div className="container">
                <div className="last-games">
                    {carouselList.map((item) => (
                        <div key={item.id} className="game-item" onClick={() => handleGoToSingle(item.id)}>
                            <img src={pathCover(item.big_img)} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SlickSlide;
