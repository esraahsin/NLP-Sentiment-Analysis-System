import React from "react";
import "./Navbar.css"
import contact from "./picrs/telecharger.jpg"
export default function ContactSection() {
    return (
      <section className="contact">
        <h1 className="heading"><span>contact</span> us</h1>
        <div className="row">
          <form>
            <input type="text" placeholder="name" className="box" />
            <input type="email" placeholder="email" className="box" />
            <input type="number" placeholder="number" className="box" />
            <textarea placeholder="message" className="box" rows="10"></textarea>
            <input type="submit" value="send message" className="btn" />
          </form>
          <div className="image">
            <img src={contact} alt="Contact" />
          </div>
        </div>
      </section>
    );
  }
  