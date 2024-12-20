import React from "react";
import './Navbar.css'
export default function Header() {
    return (
      <header>
        <input type="checkbox" id="toggler" />
        <label htmlFor="toggler" className="fas fa-bars"></label>
        <a href="#" className="logo">Clover of Memories🪶<span>.</span></a>
        <div className="icons">
          <a href="#" className="fas fa-heart"></a>
          <a href="#" className="fas fa-shopping-cart"></a>
          <a href="#" className="fas fa-user"></a>
        </div>
      </header>
    );
  }
