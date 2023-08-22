import React, {useEffect, useState} from "react";
import NavBar from "../../components/main/navigation/NavBar";
import Footer from "../../components/main/navigation/Footer";
import Categories from "../../components/main/filter/Categories";
import SearchBrowse from "../../components/main/filter/SearchBrowse";
import BrowseMiddleware from "../../components/main/BrowseMiddleware";
import Filter from "../../components/main/filter/Filter";

function Browse() {
    const [screenState, setScreenState] = useState(false);

    useEffect(() => {
        if (window.screen.availWidth <= 1052) setScreenState(true);
    }, []);

    return (
        <>
            <NavBar/>
            <div className="container">
                <div className="browes-block">
                    {!screenState ? <Categories/> : null}
                    <div className="control-browse">
                        {!screenState ? <SearchBrowse/> : null}
                        {screenState ? <Filter/> : null}
                        <BrowseMiddleware/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Browse;
