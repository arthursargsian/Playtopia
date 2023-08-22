import React, {useCallback, useState} from "react";
import {ReactComponent as User} from "../../../assets/img/svg/user.svg";
import Utils from "../../../Utils";
import Button from "../../common/Button";
import {useDispatch} from "react-redux";
import {sendComment} from "../../../redux/actions/comments";
import {useParams} from "react-router-dom";

const userName = Utils.getClient()?.name + " " + Utils.getClient()?.lastName;

function SendComment() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const handleSendComment = useCallback(() => {
        dispatch(sendComment({id, comment}));
        setComment("");
    }, [dispatch, id, comment]);

    const handleEnter = useCallback((ev) => {
        if (ev.key === "Enter" && !ev.shiftKey && comment) {
            ev.preventDefault();
            handleSendComment();
        }
    }, [handleSendComment]);

    const handleTextAreaInput = useCallback((ev) => {
        setComment(ev.target.value);
        ev.target.style.height = "auto";
        ev.target.style.height = ev.target.scrollHeight + "px";
    }, []);

    return (
        <div className="send-comment">
            <div className="user-line">
                <div className="user">
                    <User/>
                    <p className="user-name">{userName}</p>
                </div>
            </div>
            <textarea
                value={comment}
                onKeyUp={(ev) => handleEnter(ev)}
                onChange={handleTextAreaInput}
                placeholder="What are your thoughts?"
            ></textarea>
            <div className="respond-block">
                <Button
                    disabled={!comment}
                    onClick={handleSendComment}
                    variant={!comment ? "respond-disabled" : "respond"}
                >
                    Respond
                </Button>
            </div>
        </div>
    );
}

export default SendComment;
