import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getClients, removeUsers} from "../../redux/actions/auth";
import {ReactComponent as Remove} from "../../assets/img/svg/remove.svg";
import {ReactComponent as Plus} from "../../assets/img/svg/plus2.svg";
import {ReactComponent as Search} from "../../assets/img/svg/search.svg";
import Button from "../common/Button";



function UsersList() {
    const dispatch = useDispatch();
    const usersList = useSelector((store) => store.auth.usersList);

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleRemoveUsers = useCallback((id) => {
        dispatch(removeUsers(id))
    }, [dispatch]);

    return (
        <>
            <header className="products-control">
                <div className="dashboard-search">
                    <Search/>
                    <input type="text" placeholder="Serach game"/>
                </div>
            </header>
            <section className="client-list">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-wrap">
                            <table className="table table-bordered table-dark table-hover table-responsive">
                                <thead>
                                <tr className="header-client">
                                    <th>
                                        <span>First Name</span>
                                    </th>
                                    <th>
                                        <span>Last Name</span>
                                    </th>
                                    <th>
                                        <span>Email</span>
                                    </th>
                                    <th>
                                        <span>Delete</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {usersList.map((item) => (
                                    <tr className="users-list" key={item.uuid}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div onClick={() => handleRemoveUsers(item.uuid)}><Remove/></div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UsersList;
