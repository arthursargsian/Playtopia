import React, {useCallback, useEffect, useState} from "react";
import {ReactComponent as FilterIcon} from "../../../assets/img/svg/filter.svg";
import FilterModal from "./FilterModal";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {filterState} from "../../../redux/actions/rest";

function Filter() {
    const dispatch = useDispatch();
    const filterModal = useSelector((store) => store.rest.filterModal);

    const handleFilterModal = useCallback((state) => {
        dispatch(filterState(state))
    }, [dispatch]);

    return (
        <>
            {filterModal && (
                <Helmet>
                    <style>{`body { overflow-y: hidden; }`}</style>
                </Helmet>
            )}
            {filterModal ? <FilterModal/> : null}
            <div className="container">
                <header className="filter-header">
                    <FilterIcon onClick={() => handleFilterModal(true)}/>
                </header>
            </div>
        </>
    );
}

export default Filter;
