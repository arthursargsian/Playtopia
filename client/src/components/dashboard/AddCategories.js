import React, {useCallback, useState} from "react";
import {ReactComponent as Plus} from "../../assets/img/svg/plus2.svg";
import Button from "../common/Button";
import {useDispatch, useSelector} from "react-redux";
import {addCategories} from "../../redux/actions/categories";

function AddCategories() {
    const dispatch = useDispatch();
    const [categoriesName, setCategoriesName] = useState("");

    const handleAddCategories = useCallback(() => {
        dispatch(addCategories(categoriesName));
        setCategoriesName("");
    }, [dispatch, categoriesName]);

    const handleKeyPress = useCallback((ev) => {
        if (ev.key === "Enter") handleAddCategories();
    }, [handleAddCategories]);

    return (
        <>
            <header className="products-control">
                <div className="dashboard-categories">
                    <input value={categoriesName} onChange={(ev) => setCategoriesName(ev.target.value)}
                           placeholder="New Category"
                           onKeyUp={(ev) => handleKeyPress(ev)}
                           type="text"/>
                    <Button onClick={handleAddCategories}><span><Plus/></span>Add</Button>
                </div>
            </header>
        </>
    );
}

export default AddCategories;
