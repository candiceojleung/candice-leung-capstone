import "./AboutUs.scss"

function AboutUs (){
    return(
        <section className="about">
            <h2 className="about__title">About Us</h2>
            <p className="about__description">
            periodic.ally is a revolutionary web application dedicated to empowering individuals manage all the different elements of their reproductive health. Our mission is to serve as a trusted ally for those navigating the complex interplay between reproductive, physical, and mental well-being.
            </p>

            <h3 className="about_subheader">Our Vision</h3>
            <p className="about__description"> At periodic.ally, we believe that comprehensive health tracking can unlock valuable insights into your body's unique needs and patterns. By offering a user-friendly platform for monitoring various aspects of your health, we aim to bridge the gap in understanding female-specific conditions and combat the prevalent issue of misdiagnosis in reproductive health.</p>

            <h3 className="about__subheader">Our Commitment</h3>
            <p className="about__description">  We are committed to providing a secure, user-friendly platform that not only helps individuals track their health but also contributes to a broader understanding of reproductive health conditions. By empowering our users with detailed health data, we aim to facilitate more informed discussions with healthcare providers and potentially reduce instances of misdiagnosis. </p>

            <h3 className="about__subheader">Join Us</h3>
            <p className="about__description">Whether you're managing a specific health condition, trying to understand your body better, or simply looking for a comprehensive health tracking tool, periodic.ally is here to support you. Join us in revolutionizing reproductive health management and taking control of your well-being.</p>

            <p className="about__tagline">Together, we can track the elemental insights to a healthier you .</p>
        </section>
    );
};

export default AboutUs