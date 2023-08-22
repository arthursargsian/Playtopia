import React, {useCallback, useEffect, useState} from "react";
import {ReactComponent as X} from "../../../assets/img/svg/x.svg";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategories, getCategories} from "../../../redux/actions/categories";
import {browseState, filterState, localCategoreis} from "../../../redux/actions/rest";

function CategoriesList() {
    const dispatch = useDispatch();
    const [catIndex, setCatInedx] = useState(null);
    const categoriesList = useSelector((store) => store.categories.categories);
    const page = useSelector((store) => store.rest.page);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategoriesList = useCallback((category, index) => {
        dispatch(localCategoreis(category));
        dispatch(browseState("categories"));
        dispatch(filterState(false));
        setCatInedx(index);
    }, [dispatch, page]);

    return (
        <div className="categories-container container">
            <h2 className="cat-tit">Categories</h2>
            <div className="categories-block">
                {categoriesList.map((item, index) => (
                    <div onClick={() => handleCategoriesList(item.name, index)} key={item.id}
                         className={index === catIndex ? "active-mob categories-box" : "categories-box"}>
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesList;
