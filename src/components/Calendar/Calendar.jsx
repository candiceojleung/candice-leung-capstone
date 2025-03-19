import "./Calendar.scss";
import { useState } from "react";

function Calendar() {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initialDate = new Date(2025, 2, 1); 
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();


  return (
    <div className="calendar">
      <div className="calendar__container">
        <div className="calendar__heading">
          <div className="calendar__navigate">
            <h2 className="calendar__month">March</h2>
            <h2 className="calendar__year">2025</h2>
            <div className="calendar__buttons"></div>
            <i className="bx bx-chevron-left"></i>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
        <div className="calendar__weekdays">
          {daysOfWeek.map((day, index) => (
            <span className="calendar__dayname" key={index}>
              {day}
            </span>
          ))}
        </div>
        <div className="calendar__days">
          {[...Array((firstDayOfMonth + 6) % 7).keys()].map((_, index) => (
            <span key={`empty-${index}`}></span>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span className="calendar__number" key={day + 1}>
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="event">
        <div className="event__date-wrapper">
          <div className="event__date">March 10, 2025</div>
          <div className="event__time">10:00</div>
        </div>
        <div className="event__text">Meeting with John</div>
        <div className="event__btns">
          <i className="bx bxs-edit-alt"></i>
          <i className="bx bxs-message-alt-x"></i>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
