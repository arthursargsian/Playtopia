import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as Search} from "../../../assets/img/svg/search.svg";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Plus} from "../../../assets/img/svg/plus2.svg";
import Button from "../../common/Button";
import {useDispatch, useSelector} from "react-redux";
import {localSearch, search} from "../../../redux/actions/rest";

function ProductsControl() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchRef = useRef();
    const [isSearch, setSearch] = useState("");
    const page = useSelector((store) => store.rest.page);

    useEffect(() => {
        if (isSearch) {
            clearTimeout(searchRef.current);
            searchRef.current = setTimeout(() => {
                dispatch(search({name: isSearch, page}));
            }, 300);
        }
        dispatch(localSearch(isSearch));
    }, [isSearch, page]);

    return (
        <>
            <header className="products-control">
                <Button variant="add-product" onClick={() => navigate("/admin/products/add-product")}>
                    <span><Plus/></span> Add Product
                </Button>
                <div className="dashboard-search">
                    <Search/>
                    <input value={isSearch} onChange={(ev) => setSearch(ev.target.value)} type="text"
                           placeholder="Serach game"/>
                </div>
            </header>
        </>
    );
}

export default ProductsControl;
