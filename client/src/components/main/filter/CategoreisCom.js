import React, {useEffect} from "react";
import SortProducts from "../SortProducts";
import Paginate from "../../common/Paginate";
import {useDispatch, useSelector} from "react-redux";
import HeaderStatus from "./HeaderStatus";
import {categoriesList} from "../../../redux/actions/categories";

function CategoreisCom() {
    const dispatch = useDispatch();
    const productsList = useSelector((store) => store.categories?.categoriesList?.products);
    const getProductsStatus = useSelector((store) => store.categories?.categoriesListStatus);
    const totalPages = useSelector((store) => store.categories?.categoriesList?.totalPages);

    const page = useSelector((store) => store.rest.page);
    const category = useSelector((store) => store.rest.localCategoreis);

    useEffect(() => {
        dispatch(categoriesList({category, page,}));
    }, [dispatch, page, category]);
    
    return (
        <>
            <HeaderStatus count={productsList?.length}/>
            <div className="browse-container">
                <SortProducts data={productsList} status={getProductsStatus}/>
            </div>
            <div className="browse-paginate">
                <Paginate totalPages={totalPages}/>
            </div>
        </>
    );
}

export default CategoreisCom;
