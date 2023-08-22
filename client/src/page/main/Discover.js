import React from "react";
import NavBar from "../../components/main/navigation/NavBar";
import CarouselComponent from "../../components/main/carousel/CarouselComponent";
import Footer from "../../components/main/navigation/Footer";
import DiscoverProducts from "../../components/main/DiscoverProducts";
import SlickSlide from "../../components/main/carousel/SlickSlide";

function Discover() {
    return (
        <div className="wrapper">
            <NavBar/>
            <SlickSlide/>
            <div className="container">
                {/*<CarouselComponent/>*/}
                <div className="products-block">
                    <DiscoverProducts/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Discover;
