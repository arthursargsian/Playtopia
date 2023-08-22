import React, {useCallback, useEffect} from "react";
import ClientMenuComp from "./navigation/ClientMenuComp";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import Client from "../common/Client";
import {lastFavorites} from "../../redux/actions/favorite";
import {pathCover} from "../../Utils";
import {isArray} from "lodash";
import {useNavigate} from "react-router-dom";
import {stateProfile} from "../../redux/actions/rest";

function ClientMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((store) => store.rest.profile);
    const favorites = useSelector((store) => store.favorite.lastFavoritesList);
    const favoriteStatus = useSelector((store) => store.favorite.lastFavoritesStatus);

    useEffect(() => {
        dispatch(lastFavorites());
    }, [dispatch]);

    const handleSingle = useCallback((id) => {
        navigate(`/single/${id}`);
        dispatch(stateProfile(false));
    }, [navigate, dispatch]);

    return (
        <>
            <Helmet>
                <body className={profile ? "body-profile" : null}></body>
            </Helmet>
            {!profile ? <ClientMenuComp/> : null}
            <div className={`profile ${profile ? "profile-open" : null}`}>
                <div className="client-menu-comp">
                    <ClientMenuComp/>
                </div>
                <div className="client-block profile-client">
                    <Client/>
                </div>
                <h2 className="favorite-title">Last Favorites</h2>
                <div className="last-favorites">
                    {favoriteStatus === "success" && isArray(favorites) ? favorites.map((item) => (
                        <div key={item.id} className="favorites-item" onClick={() => handleSingle(item.id)}>
                            <img src={pathCover(item.big_img)} alt="no found image"/>
                        </div>
                    )) : null}
                </div>
            </div>
        </>
    );
}

export default ClientMenu;
