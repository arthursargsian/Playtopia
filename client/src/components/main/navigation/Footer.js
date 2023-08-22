import React from "react";
import {FaDiscord, FaFacebookSquare, FaLinkedin} from 'react-icons/fa';
import {BiLogoInstagramAlt} from "react-icons/bi";
import {BsArrowUpSquareFill} from "react-icons/bs";


function Footer() {
    return (
        <>
            <div className="wrapper">
                <footer className="footer">
                    <div className="container">
                        <div className="is-footer">
                            <div className="social">
                                <ul>
                                    <li><BiLogoInstagramAlt/></li>
                                    <li><FaFacebookSquare/></li>
                                    <li><FaDiscord/></li>
                                    <li><FaLinkedin/></li>
                                </ul>
                            </div>
                            <div className="left-block">
                                <a href="#header"><BsArrowUpSquareFill/></a>
                            </div>
                        </div>
                        <p className="footer-desc">
                            © 2023, Games, Inc. All rights reserved. Games, the Games logo, Fortnite,
                            the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and
                            the
                            Unreal Tournament logo are trademarks or registered trademarks of Games, Inc. in the
                            United
                            States of America and elsewhere. Other brands or product names are the trademarks of
                            their
                            respective owners.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;
