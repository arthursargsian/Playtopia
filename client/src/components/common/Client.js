import React, {useCallback} from "react";
import {ReactComponent as ClientIcon} from "../../assets/img/svg/user.svg";
import Utils from "../../Utils";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/actions/auth";
import {useNavigate} from "react-router-dom";

function Client() {
    const diaptsch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = useCallback(async () => {
        await diaptsch(logOut());
        navigate("/");
    }, [diaptsch]);

    return (
        <>
            <div className="client-icon">
                <ClientIcon/>
            </div>
            <h2 className="client-name">{Utils.getClient()?.name} {Utils.getClient()?.lastName}</h2>
            <h2 className="client-email">{Utils.getClient()?.email}</h2>
            <div onClick={handleLogOut} className="client-btn">Log out</div>
        </>
    );
}

export default Client;
