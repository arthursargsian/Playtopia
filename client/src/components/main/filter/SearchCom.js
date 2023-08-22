import React, {useEffect} from "react";
import SortProducts from "../SortProducts";
import Paginate from "../../common/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {search} from "../../../redux/actions/rest";
import HeaderStatus from "./HeaderStatus";

function SearchCom() {
    const dispatch = useDispatch();

    const productsList = useSelector((store) => store.rest.searchList?.products);
    const getProductsStatus = useSelector((store) => store.rest?.searchStatus);
    const totalPages = useSelector((store) => store.rest?.searchList?.totalPages);

    const page = useSelector((store) => store.rest.page);
    const localSearch = useSelector((store) => store.rest.localSearch);

    useEffect(() => {
        dispatch(search({name: localSearch, page,}));
    }, [dispatch, page, localSearch]);

    return (
        <>
            <HeaderStatus count={productsList?.length}/>
            <div className="browse-container">
                <SortProducts data={productsList} status={getProductsStatus}/>
            </div>
            <div className="browse-paginate">
                <Paginate totalPages={getProductsStatus === "success" ? totalPages : 0}/>
            </div>
        </>
    );
}

export default SearchCom;
