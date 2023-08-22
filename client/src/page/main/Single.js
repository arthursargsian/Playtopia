import React, {useCallback, useEffect, useState} from 'react';
import NavBar from "../../components/main/navigation/NavBar";
import ImageBar from "../../components/main/single/ImageBar";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {rating, single} from "../../redux/actions/single";
import ReactStars from "react-rating-stars-component";
import {ReactComponent as Favorite} from "../../assets/img/svg/favorite.svg";
import {ReactComponent as Basket} from "../../assets/img/svg/basket.svg";
import ProductsParams from "../../components/main/single/ProductsParams";
import Loading from "../../components/common/Loading";
import Delivery from "../../components/main/single/Delivery";
import Footer from "../../components/main/navigation/Footer";
import Comments from "../../components/main/single/Comments";
import {addFavorite, removeFavorite} from "../../redux/actions/favorite";
import {addBasket, removeBasket} from "../../redux/actions/payment";

function Single() {
    const dispatch = useDispatch();
    const {id} = useParams();

    const product = useSelector((store) => store.single.singleData?.product);
    const basketState = useSelector((store) => store.single.singleData?.basket?.count);
    const singleStatus = useSelector((store) => store.single.singleStatus);
    const favoriteState = useSelector((store) => store.single.singleData?.favorite?.count);

    useEffect(() => {
        dispatch(single(id));
    }, [dispatch, id]);

    const handleDelivery = useCallback((path, id) => {
        if (path === "favorite") {
            if (favoriteState) {
                dispatch(removeFavorite(id));
            } else {
                dispatch(addFavorite(id));
            }
        }
        if (path === "basket") {
            if (basketState) {
                dispatch(removeBasket(id));
            } else {
                dispatch(addBasket(id));
            }
        }
    }, [dispatch, favoriteState, basketState]);

    const handleRating = useCallback((stars) => {
        dispatch(rating({stars, id}));
    }, [dispatch, id]);

    return (
        <>
            <NavBar/>
            {singleStatus === "success" ?
                <>  <ImageBar cover={product.big_img} galleries={product.small_img}/>
                    <div className="single-container">
                        <p className="single-name">{product?.name}</p>
                        <p className="single-dev"><span>Developer:</span> Rockstar Games</p>
                        <p className="single-dev"><span>Release Date:</span> Nov 2018</p>
                        <p className="single-dev"><span>Genre:</span> {product.genres[0].name}</p>
                        <div className="gradient-line"></div>
                        <div className="delivery-row">
                            <ReactStars size={45} value={product.rating} edit={true} onChange={(ev) => handleRating(ev)}/>
                            <span>
                                <Favorite onClick={() => handleDelivery("favorite", product?.id)} className={`favorite ${favoriteState ? "active-delivery" : null}`}/>
                                <Basket className={`basket ${basketState ? "active-delivery" : null}`} onClick={() => handleDelivery("basket", product?.id)}/>
                            </span>
                        </div>
                        <div className="single-price">
                            <p className="basic-price">{product?.disc_price ? `$${product?.disc_price}` : `$${product?.price}`}</p>
                            <p className="disc-price">{product?.disc_price ? `$${product?.price}` : null}</p>
                        </div>
                        <Delivery/>
                        <ProductsParams params={product}/>
                        <Comments/>
                    </div>
                </> : <Loading/>}
            <Footer/>
        </>
    );
}

export default Single;
