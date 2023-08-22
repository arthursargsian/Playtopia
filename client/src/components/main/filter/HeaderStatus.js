import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {browseState} from "../../../redux/actions/rest";
import {useNavigate} from "react-router-dom";

function HeaderStatus({count}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localSearch = useSelector((store) => store.rest.localSearch);

    const handleBack = useCallback(() => {
        dispatch(browseState("browse"));
        navigate("?page=1");
    }, [dispatch]);

    return (
        <>
            {count === 0 || !count ?
                <p className="header-status">No results found {localSearch}.<span onClick={handleBack}>&lt;</span></p> :
                <p className="header-status">Results found games with the name {localSearch}. <span
                    onClick={handleBack}>&lt;</span></p>}
        </>
    );
}

export default HeaderStatus;
