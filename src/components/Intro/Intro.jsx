import "./Intro.scss";

function Intro() {
  return (
    <section className="intro">
      <h2 className="intro__title">Hi Jane</h2>
      <div className="intro__pagraph">
        <p className="intro__text"> Start your journey today to a healthier you. Select a date and log your menstrual cycle, track symptoms, and unlock patterns, that will help you manage all the elements of your  reproductive health. </p>
      </div>
      <p className="intro__subheader">Calendar Indicators</p>
      <div className="intro__legend">
        <ul className="intro__list">
          <li className="intro__indicator intro__indicator--period">
            have period
          </li>
          <li className="intro__indicator intro__indicator--physical">
            have physical symptoms
          </li>
          <li className="intro__indicator intro__indicator--mental">
            have mental health symptoms
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Intro;
