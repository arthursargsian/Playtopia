import React, {useEffect} from "react";
import SortProducts from "../SortProducts";
import Paginate from "../../common/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../redux/actions/products";
import HeaderStatus from "./HeaderStatus";

function BrowseCom() {
    const dispatch = useDispatch();

    const productsList = useSelector((store) => store.products.getProductsList?.data);
    const getProductsStatus = useSelector((store) => store.products.getProductsStatus);
    const totalPages = useSelector((store) => store.products.getProductsList?.totalPages);
    const page = useSelector((store) => store.rest.page);

    useEffect(() => {
        dispatch(getProducts(page));
    }, [dispatch, page]);

    return (
        <>
            <div className="browse-container">
                <SortProducts data={productsList} status={getProductsStatus}/>
            </div>
            <div className="browse-paginate">
                <Paginate totalPages={totalPages}/>
            </div>
        </>
    );
}

export default BrowseCom;
