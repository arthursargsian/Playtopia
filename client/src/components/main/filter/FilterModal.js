import React, {useCallback} from "react";
import {ReactComponent as X} from "../../../assets/img/svg/x.svg";
import {useDispatch, useSelector} from "react-redux";
import {filterState} from "../../../redux/actions/rest";
import SearchBrowse from "./SearchBrowse";
import CategoriesList from "../../main/filter/CategoriesList";
import Button from "../../common/Button";

function FilterModal() {
    const dispatch = useDispatch();
    const filterModal = useSelector((store) => store.rest.filterModal);

    const handleFilterModal = useCallback((state) => {
        dispatch(filterState(state))
    }, [dispatch]);

    return (
        <>
            <nav className="filter-modal">
                <header className="filter-h">
                    <h2>Filter</h2>
                    <X onClick={() => handleFilterModal(false)}/>
                </header>
                <div className="search-mob">
                    <SearchBrowse/>
                </div>
                <div className="categoreis-mob">
                    <CategoriesList/>
                </div>
            </nav>
        </>
    );
}

export default FilterModal;
