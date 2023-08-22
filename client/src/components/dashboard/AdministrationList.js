import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getClients, removeUsers} from "../../redux/actions/auth";
import {ReactComponent as Plus} from "../../assets/img/svg/plus2.svg";
import {ReactComponent as Search} from "../../assets/img/svg/search.svg";
import Button from "../common/Button";
import {useNavigate} from "react-router-dom";

function AdministrationList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usersList = useSelector((store) => store.auth.adminsList);

    useEffect(() => {
        dispatch(getClients());
    }, [dispatch]);

    const handleRemoveUsers = useCallback((id) => {
        dispatch(removeUsers(id))
    }, [dispatch]);

    return (
        <>
            <header className="products-control">
                <Button onClick={() => navigate("/admin/administration/add-admin")} variant="add-product">
                    <span><Plus/></span> Add Admin
                </Button>
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
                                    <th className="admin-table">
                                        <span>First Name</span>
                                    </th>
                                    <th className="admin-table">
                                        <span>Last Name</span>
                                    </th>
                                    <th className="admin-table">
                                        <span>Email</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {usersList.map((item) => (
                                    <tr className="users-list" key={item.uuid}>
                                        <td className="admin-table">{item.firstName}</td>
                                        <td className="admin-table">{item.lastName}</td>
                                        <td className="admin-table">{item.email}</td>
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

export default AdministrationList;
