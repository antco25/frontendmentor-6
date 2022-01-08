import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Header.scss";
import logo from "./logo.svg";
import avatar from "./image-avatar.png";
import CartDropdown from "../CartDropDown/CartDropdown";
import menuIcon from "./icon-menu.svg";
import closeIcon from "./icon-close.svg";

function Header(props) {

    const onMediaQueryChange = (matches) => {
        if (!matches) onMobileMenuOpen(false);
    }
    const isMobile = useMediaQuery({ maxWidth: 768 }, undefined, onMediaQueryChange)
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const onMobileMenuOpen = (isOpen) => {
        if (isOpen) {
            window.scrollTo(0, 0);
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        setMobileMenuOpen(isOpen)
    }

    const links = ["Collections", "Men", "Women", "About", "Contact"]

    return (
        <div className="header">
            <div className="menu-icon">
                <img src={menuIcon} onClick={() => onMobileMenuOpen(true)} />
                <div className={`nav-mobile${mobileMenuOpen ? ' nav-mobile-visible' : ''}`}>
                    <div className="nav-mobile-inner">
                        <div className="wrapper">
                            <img src={closeIcon} onClick={() => { onMobileMenuOpen(false) }} />
                            <ul>
                                {links.map((link, index) => <li key={index}><a href="#" onClick={() => { onMobileMenuOpen(false) }}>{link}</a></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logo">
                <img src={logo} />
            </div>
            <nav>
                <ul>
                    {links.map((link, index) => <li key={index}><a href="#">{link}</a></li>)}
                </ul>
            </nav>
            <div className="session">
                <CartDropdown className="session-cart" cartItems={props.cartItems} deleteCartItem={props.deleteCartItem} />
                <img src={avatar} className="icon-avatar" />
            </div>
        </div>
    );
}

export default Header;