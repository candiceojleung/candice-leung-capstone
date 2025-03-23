import React, { useState } from "react";
import "./AboutUs.scss";

function AboutUs() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    {
      title: "About Us",
      content:
        "periodic.ally is a web application dedicated to empowering individuals manage all the different elements of their reproductive health. Our mission is to serve as a trusted ally for those navigating the complex intersection between reproductive, physical, and mental well-being.",
    },
    {
      title: "Our Vision",
      content:
        "At periodic.ally, we believe that comprehensive health tracking can unlock valuable insights into your body's unique needs and patterns. By offering a user-friendly platform for monitoring various aspects of your health, we aim to bridge the gap in understanding different medical conditions and combat the prevalent issue of misdiagnosis in reproductive health.",
    },
    {
      title: "Our Commitment",
      content:
        "We are committed to providing a secure, user-friendly platform that not only helps individuals track their health but also contributes to a broader understanding of reproductive health conditions. By empowering our users with detailed health data, we aim to facilitate more informed discussions with healthcare providers and potentially reduce instances of misdiagnosis.",
    },
    {
      title: "Join Us",
      content:
        "Whether you're managing a specific health condition, trying to understand your body better, or simply looking for a comprehensive health tracking tool, periodic.ally is here to support you. Join us in revolutionizing reproductive health management and taking control of your well-being. Together, we can track the elements to a healthier you.",
    },
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <section className="about">
      <div className="about__panel">
        <i className="bx bx-chevron-left about__nav-icon" onClick={prevSection}></i>
        <div className="about__content">
          <h2 className="about__title">{sections[currentSection].title}</h2>
          <p className="about__description">{sections[currentSection].content}</p>
        </div>
        <i className="bx bx-chevron-right about__nav-icon" onClick={nextSection}></i>
      </div>

    </section>
  );
}

export default AboutUs;
