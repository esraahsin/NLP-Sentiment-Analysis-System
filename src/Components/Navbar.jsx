import React from "react";
import "./Navbar.css"; 

const Navbar = () => {
    return (
        <header>
            <input type="checkbox" id="toggler" />
            <label htmlFor="toggler" className="fas fa-bars"></label>
            <a href="#" className="logo">Clover of Memories🪶<span>.</span></a>
            <nav className="navbar">
                <a href="#home">home</a>
                <a href="#about">about</a>
                <a href="#products">products</a>
                <a href="#review">review</a>
                <a href="#contact">contact</a>
            </nav>
            <div className="icons">
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-shopping-cart"></a>
                <a href="#" className="fas fa-user"></a>
            </div>
        </header>
    );
};

export default Navbar;
