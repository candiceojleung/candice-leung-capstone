import "./Calendar.scss";
import { useState } from "react";
import PeriodLogForm from "./PeriodLogForm";
import { getAllPeriodLogs } from "../utils/api";

function Calendar({ userId }) {
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

  const initialDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [periodLogs, setPeriodLogs] = useState({});

  useEffect(() => {
    const fetchPeriodLogs = async () => {
      try {
        const logs = await getAllPeriodLogs(userId);
        const logsMap = logs.reduce((acc, log) => {
          acc[log.date] = log;
          return acc;
        }, {});
        setPeriodLogs(logsMap);
      } catch (error) {
        console.error("Error fetching period logs:", error);
      }
    };

    fetchPeriodLogs();
  }, [userId]);

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(selectedDate);
    setShowForm(true);
  };

  const handleFormSubmit = (logData) => {
    setPeriodLogs((prev) => ({
      ...prev,
      [logData.date]: logData,
    }));
    setShowForm(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="calendar">
      <div className="calendar__container">
        <div className="calendar__heading">
          <div className="calendar__navigate">
            <h2 className="calendar__month">{monthsOfYear[currentMonth]}</h2>
            <h2 className="calendar__year">{currentYear}</h2>
            <div className="calendar__buttons">
              <i className="bx bx-chevron-left" onClick={prevMonth}></i>
              <i className="bx bx-chevron-right" onClick={nextMonth}></i>
            </div>
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
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => {
            const date = new Date(currentYear, currentMonth, day + 1)
              .toISOString()
              .split("T")[0];
            const hasLog = periodLogs[date];
            return (
              <span
                className={`calendar__number ${hasLog ? "has-log" : ""}`}
                key={day + 1}
                onClick={() => handleDateClick(day + 1)}
              >
                {day + 1}
              </span>
            );
          })}
        </div>
      </div>
      {showForm && (
        <PeriodLogForm
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          userId={userId}
          selectedDate={selectedDate}
        />
      )}

      <div className="event__btns">
        <i className="bx bxs-edit-alt"></i>
        <i className="bx bxs-message-alt-x"></i>
      </div>
    </div>
  );
}

export default Calendar;
