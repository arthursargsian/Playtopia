import React, {useEffect} from "react";
import {ReactComponent as User} from "../../../assets/img/svg/user.svg";
import {ReactComponent as Dots} from "../../../assets/img/svg/dots.svg";
import SendComment from "./SendComment";
import {useDispatch, useSelector} from "react-redux";
import {getComments} from "../../../redux/actions/comments";
import {useParams} from "react-router-dom";
import Loading from "../../common/Loading";
import moment from "moment";
import Paginate from "../../common/Paginate";

function Comments() {
    const dispatch = useDispatch();
    const {id} = useParams();

    const commentsList = useSelector((store) => store.comments.commentsList);
    const totalPages = useSelector((store) => store.comments.totalPages);
    const commentsListStatus = useSelector((store) => store.comments.commentsListStatus);
    const page = useSelector((store) => store.rest.page);

    useEffect(() => {
        dispatch(getComments({id, page}));
    }, [dispatch, id, page]);

    return (
        <div className="comment-container">
            <p className="title">Comments</p>
            <div className="gradient-line"></div>
            {commentsListStatus === "success" ? commentsList.map((item) => (
                <div key={item.id} className="comment-block">
                    <div className="user-line">
                        <div className="user">
                            <User/>
                            <p className="user-name">{item.firstName + " " + item.lastName}</p>
                        </div>
                        <Dots/>
                    </div>
                    <div className="comment-body">
                        <p className="comment-text">{item.message}</p>
                        <p className="data">{moment(item.createdAt).format('DD.MM.YY')}</p>
                    </div>
                </div>
            )) : commentsListStatus === "loading" ?
                <Loading/> : commentsList?.length === 0 ? "No comments found on this page." : null}
            <div className="comments-paginate">
                <Paginate totalPages={totalPages}/>
            </div>
            <SendComment/>
        </div>
    );
}

export default Comments;
