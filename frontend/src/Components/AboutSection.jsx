import React from "react";
import './Navbar.css'
import video from './picrs/video.mp4'

export default function AboutSection() {
    return (
      <section className="about" id="about">
        <h1 className="heading"><span>about</span> us</h1>
        <div className="row">
          <div className="video-contain">
          <video src={video} loop autoPlay muted></video>
          <h3>Best old love letters writers</h3>
          </div>
          <div className="content">
            <h3>Why choose us?</h3>
            <p>
              We bring the beauty of heartfelt expression to life...
            </p>
            <a href="#" className="btn">learn more</a>
          </div>
        </div>
      </section>
    );
  }
  