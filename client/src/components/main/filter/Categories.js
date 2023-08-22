import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, categoriesList} from "../../../redux/actions/categories";
import {browseState, localCategoreis} from "../../../redux/actions/rest";
import {useNavigate} from "react-router-dom";

function Categories() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [catIndex, setCatInedx] = useState(null);

    const categories = useSelector((store) => store.categories.categories);
    const page = useSelector((store) => store.rest.page);
    const currentBrowseState = useSelector((store) => store.rest?.browseStateInfo);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleCategoriesList = useCallback((category, index) => {
        dispatch(localCategoreis(category));
        dispatch(browseState("categories"));
        navigate("?page=1");
        setCatInedx(index);
    }, [dispatch, page]);

    return (
        <>
            <div className="categories">
                <ul>
                    {categories.map((item, index) => (
                        <li className={index === catIndex && currentBrowseState === "categories" ? "active-cat" : null} key={item.id}
                            onClick={() => handleCategoriesList(item.name, index)}><p>{item.name}</p></li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Categories;
