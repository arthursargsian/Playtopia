import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../redux/actions/products";
import ProductsTable from "./ProductsTable";

function DashboardProductsPanel() {
    const dispatch = useDispatch();

    const getProductsList = useSelector((store) => store.products.getProductsList?.data?.slice().reverse());
    const getProductsStatus = useSelector((store) => store.products.getProductsStatus);
    const totalPages = useSelector((store) => store.products.getProductsList?.totalPages);

    const searchResults = useSelector((store) => store.rest.searchList?.products?.slice().reverse());
    const searchTotalPages = useSelector((store) => store.rest.searchList?.totalPages);
    const searchStatus = useSelector((store) => store.rest.searchStatus);

    const page = useSelector((store) => store.rest.page);
    const localSearch = useSelector((store) => store.rest.localSearch);

    useEffect(() => {
        dispatch(getProducts(page));
    }, [dispatch, page]);

    return (
        <>
            <div>&nbsp;</div>
            {localSearch ?
                <ProductsTable data={searchResults} status={searchStatus} totalPages={searchTotalPages}/> :
                <ProductsTable data={getProductsList} status={getProductsStatus} totalPages={totalPages}/>
            }
        </>
    );
}

export default DashboardProductsPanel;
