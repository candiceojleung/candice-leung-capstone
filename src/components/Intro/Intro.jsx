import "./Intro.scss";
import { useState, useEffect } from "react";
import { getUser } from "../../utils/apiUtils";

function Intro({ userId }) {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const userData = await getUser(userId);
          const firstName = userData.name.split(" ")[0]; 
          setUserName(firstName); 
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    fetchUserData();
  }, [userId]);

  return (
    <section className="intro">
      <div className="intro__greeting">
      <h2 className="intro__title">Hello </h2>
      <h2 className="intro__name">{userName},</h2>
      </div>
      <div className="intro__pagraph">
        <p className="intro__text">
          {" "}
          Start your journey today to a healthier you. Select a date, log
          your menstrual cycle, track your symptoms, and unlock patterns that will
          help you manage all the elements of your reproductive health.{" "}
        </p>
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
