import React, {useCallback, useEffect, useState} from "react";
import AddCategories from "./AddCategories";
import {ReactComponent as X} from "../../assets/img/svg/x.svg";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategories, getCategories} from "../../redux/actions/categories";

function CategoriesList() {
    const dispatch = useDispatch();
    const categoriesList = useSelector((store) => store.categories.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleDeleteCategory = useCallback((name) => {
        dispatch(deleteCategories(name));
    }, [dispatch]);

    return (
        <div className="categories-container">
            <AddCategories/>
            <div className="categories-block">
                {categoriesList.map((item) => (
                    <div key={item.id} className="categories-box"><h2>{item.name}</h2><X
                        onClick={() => handleDeleteCategory(item.name)}/></div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesList;
