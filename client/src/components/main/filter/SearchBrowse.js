import React, {useCallback, useEffect, useState} from "react";
import {ReactComponent as SearchIcon} from "../../../assets/img/svg/search.svg";
import {useDispatch, useSelector} from "react-redux";
import {browseState, filterState, localSearch, search} from "../../../redux/actions/rest";
import {useNavigate} from "react-router-dom";

function SearchBrowse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const searchFromBrowse = useCallback(() => {
        if (title) {
            dispatch(browseState("search"));
            dispatch(localSearch(title));
            dispatch(filterState(false));
            navigate("?page=1");
        }
    }, [title]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchFromBrowse();
        }
    }, [searchFromBrowse]);

    return (
        <>
            <form className="browse-form">
                <div className="dashboard-search">
                    <SearchIcon onClick={searchFromBrowse}/>
                    <input
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                        onKeyPress={handleKeyPress}
                        type="text"
                        placeholder="Search game"
                    />
                </div>
            </form>
        </>
    );
}

export default SearchBrowse;
