import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {pagenate} from "../../redux/actions/rest";

function Paginate({totalPages}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        dispatch(pagenate(page));
        navigate(`${location.pathname}?page=${page}`);
    }, [page]);

    useEffect(() => {
        setPage(initialPage);
    }, [initialPage]);

    return (
        <>
            {totalPages >= 2 ? <ReactPaginate
                breakLabel="..."
                className="page"
                marginPagesDisplayed={1}
                nextLabel=">"
                forcePage={page - 1}
                onPageChange={(ev) => setPage(ev.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                activeClassName="active-page"
            /> : null}
        </>
    );
}

export default Paginate;
