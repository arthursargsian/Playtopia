import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/actions/products";
import Loading from "../common/Loading";
import Empty from "../common/Empty";
import {useNavigate} from "react-router-dom";
import {pathCover} from "../../Utils";


const LIMIT_DATA = 100;

function DiscoverProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [scrollPage, setScrollPage] = useState(1);
    const [productsList, setProductsList] = useState([]);

    const fetchedProductsList = useSelector((store) => store.products.getProductsList?.data);
    const getProductsStatus = useSelector((store) => store.products.getProductsStatus);
    const totalPages = useSelector((store) => store.products.getProductsList?.totalPages);

    useEffect(() => {
        dispatch(getProducts(scrollPage));
    }, [dispatch, scrollPage]);

    useEffect(() => {
        const handleScroll = (ev) => {
            const scrollHeight = ev.target.documentElement.scrollHeight;
            const currentHeight =
                ev.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 200 >= scrollHeight) {
                if (LIMIT_DATA >= scrollPage && scrollPage < totalPages) {
                    setScrollPage((prevPage) => prevPage + 1);
                }
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollPage, totalPages]);

    useEffect(() => {
        if (fetchedProductsList && fetchedProductsList.length > 0) {
            const uniqueProductIds = new Set(productsList.map(product => product.id));
            const newProducts = fetchedProductsList.filter(product => !uniqueProductIds.has(product.id));
            setProductsList((prevList) => [
                ...newProducts.reverse(),
                ...prevList,
            ]);
        }
    }, [fetchedProductsList]);
    return (
        <>
            {getProductsStatus === "success" ? productsList?.map((item) => (
                <div key={item.id} className="product-card" onClick={() => navigate(`/single/${item.id}`)}>
                    <img src={pathCover(item.big_img)} alt=""/>
                    {/*<div className="product-footer">*/}
                    {/*    /!*<h3>{item.name}</h3>*!/*/}
                    {/*    /!*<div className="price-card">*!/*/}
                    {/*    /!*    <h3>{item.disc_price ? `$${item.disc_price}` : `$${item.price}`}</h3>*!/*/}
                    {/*    /!*    {item.disc_price && <h4>{`$${item.price}`}</h4>}*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    /!*<div className="stars-card">*!/*/}
                    {/*    /!*    <ReactStars size={30} value={item.rating} edit={false}/>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                </div>
            )) : getProductsStatus === "fail" ? (
                <Empty/>
            ) : getProductsStatus === "loading" ? (
                <Loading/>
            ) : productsList?.length === 0 ? (
                <Empty/>
            ) : null}
        </>
    );
}

export default DiscoverProducts;
