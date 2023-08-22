import React, {useEffect, useState} from "react";
import NavBar from "../../components/main/navigation/NavBar";
import SortProducts from "../../components/main/SortProducts";
import {useDispatch, useSelector} from "react-redux";
import {getFavorite} from "../../redux/actions/favorite";
import Paginate from "../../components/common/Paginate";
import {pathCover} from "../../Utils";
import ReactStars from "react-rating-stars-component";
import Empty from "../../components/common/Empty";
import Loading from "../../components/common/Loading";
import {useNavigate} from "react-router-dom";

function Favorite() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favoriteList = useSelector((store) => store.favorite.favoriteList.data);
    const totalPages = useSelector((store) => store.favorite.favoriteList.totalPages);
    const favoriteListStatus = useSelector((store) => store.favorite.favoriteListStatus);

    const page = useSelector((store) => store.rest.page);

    useEffect(() => {
        dispatch(getFavorite(page));
    }, [dispatch, page]);

    return (
        <>
            <div className="wrapper">
                <NavBar/>
                <div className="container">
                    <h6 className="page-title">Favorite Games</h6>
                    <div className="products-container">
                        {favoriteListStatus === "success" ? favoriteList?.map((item) => (
                            <div key={item.productId} className="browse-card"
                                 onClick={() => navigate(`/single/${item.productId}`)}>
                                <img src={pathCover(item.product.big_img)} alt=""/>
                                <div className="browse-footer">
                                    <h3>{item.product.name}</h3>
                                    <div className="browse-price-card">
                                        <h3>{item.product.disc_price ? `$${item.product.disc_price}` : `$${item.product.price}`}</h3>
                                        {item.product.disc_price && <h4>{`$${item.product.price}`}</h4>}
                                    </div>
                                    <div className="browse-stars-card">
                                        <ReactStars size={30} value={item.product?.rating} edit={false}/>
                                    </div>
                                </div>
                            </div>
                        )) : favoriteListStatus === "fail" ? (
                            <Empty/>
                        ) : favoriteListStatus === "loading" ? (
                            <div className="loading-browse">
                                <Loading/>
                            </div>
                        ) : favoriteList?.length === 0 ? (
                            <Empty/>
                        ) : null}
                    </div>
                    <div className="favorite-pagenation">
                        <Paginate totalPages={totalPages}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favorite;
