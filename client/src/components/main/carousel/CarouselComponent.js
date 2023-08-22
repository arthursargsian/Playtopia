import React, {useCallback, useEffect, useState, Fragment} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {carousel} from "../../../redux/actions/rest";
import AOS from "aos";
import Carousel from "nuka-carousel";
import Button from "../../common/Button";
import {pathCover, pathGalleries} from "../../../Utils";

const CarouselComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [indexImage, setIndexImage] = useState(1);
    const [activeCarouel, setActiveCarousel] = useState(1);
    const [slideIndex, setSlideIndex] = useState(1);
    const [counter, setCounter] = useState(0);

    const carouselList = useSelector((store) => store.rest.carouselData);
    const time = 5000;

    useEffect(() => {
        dispatch(carousel());
        AOS.init({
            duration: 200,
            easing: 'ease-in-out',
        });
        const interval = setInterval(() => {
            setActiveCarousel((prevIndex) => (prevIndex + 1) % 4);
        }, time);
        return () => clearInterval(interval);
    }, []);

    const handleClickMap = useCallback((index) => {
        setIndexImage(index);
        setActiveCarousel(index);
    }, [indexImage, activeCarouel]);

    const handleGoToSingle = useCallback((id) => {
        navigate(`/single/${id}`);
    }, []);

    return (
        <div className="wrapper">
            <div className={"block"}>
                <div className={"slider"}>
                    <Carousel
                        renderCenterRightControls={false} renderCenterLeftControls={false} slideIndex={indexImage}
                        className="carousel" autoplay={true} autoplayInterval={time} wrapAround={true}
                        dragging={false} disableAnimation={false} speed={0} pauseOnHover={false}
                    >
                        {carouselList.map((item, i) => (
                            <Fragment key={_.uniqueId()}>
                                <div onClick={() => handleGoToSingle(item.id)} className="slide-layout">
                                    <div className="carousel-desc">
                                        <h2 data-aos="fade-left">{item.name}</h2>
                                        <span data-aos="fade-left">COMMING SOON</span>
                                        <h3 data-aos="fade-left">{item.desc.slice(0, 200)}</h3>
                                        <div data-aos="fade-left" className="price-block">
                                            <span data-aos="fade-left">STARTING AT</span>
                                            <div data-aos="fade-left" className="price-box">
                                                <h3 data-aos="fade-left">{item?.disc_price ? `${item?.disc_price}$` : `${item?.price}$`}</h3>
                                                <h4 data-aos="fade-left">{item?.disc_price ? `${item?.price}$` : null}</h4>
                                            </div>
                                        </div>
                                        <Button variant="carousel-buy">READ MORE</Button>
                                    </div>
                                </div>
                                <div className="carousel-layout"></div>
                                <img className="slide-img"
                                     src={pathGalleries(item.small_img[0]?.name)} alt="X"/>
                            </Fragment>
                        ))}
                    </Carousel>
                </div>
                <div className="map">
                    {carouselList.map((item, index) => (
                        <div key={_.uniqueId()} onClick={() => handleClickMap(index)}
                             className={activeCarouel === index ? "map-boxes active-carousel" : "map-boxes"}>
                            <div className="desc-box">
                                <h4 className={activeCarouel === index ? "map-title active-txt" : "map-title"}>{item.name}</h4>
                                <p className={activeCarouel === index ? "map-desc active-txt" : "map-desc"}>{item.desc.slice(0, 110)}</p>
                            </div>
                            <img className="map-img" src={pathCover(item.big_img)} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
