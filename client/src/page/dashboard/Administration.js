import React, {useCallback, useEffect, useState} from 'react';
import DashboardMenu from "../../components/dashboard/DashboardMenu";
import {useDispatch, useSelector} from "react-redux";
import {barsState} from "../../redux/actions/rest";
import {ReactComponent as Bars} from "../../assets/img/svg/bars.svg";
import AdministrationList from "../../components/dashboard/AdministrationList";

function Administration() {
    const dispatch = useDispatch();
    const [burger, setBurger] = useState(false);
    const bars = useSelector((store) => store.rest.barsState);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (window.screen.availWidth <= 1201) {
            setBurger(true);
            setMenu(false);
        }
        if (window.screen.availWidth >= 1201) setMenu(true);
    }, [burger]);

    const handleChangeState = useCallback((state) => {
        dispatch(barsState(state));
    }, []);

    return (
        <div className="wrapper dashboard">
            {window.screen.availWidth >= 1201 ? <DashboardMenu/> : bars ? <DashboardMenu/> : null}
            <main className="dashboard-main wrapper">
                <h3 className="dashboard-title">
                    {burger ? <Bars onClick={() => handleChangeState(true)}/> : null}
                    <span>Administration List</span>
                </h3>
                <AdministrationList/>
            </main>
        </div>
    );
}

export default Administration;
