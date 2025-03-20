import "./Calendar.scss";
import { useState, useEffect } from "react";
import PeriodLogForm from "../PeriodLogForm/PeriodLogForm";
import { getAllPeriodLogs, getPeriodLogByDate } from "../../utils/apiUtils";

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

  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [periodLogs, setPeriodLogs] = useState({});
  const [selectedLog, setSelectedLog] = useState(null);
  const [error, setError] = useState(null);
  const [allSymptoms, setAllSymptoms] = useState({ physical: [], mental: [] });

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

  useEffect(() => {
    const fetchPeriodLogs = async () => {
      try {
        const response = await getAllPeriodLogs(userId);
        console.log("API Response:", response); // Log the entire response

        let logsMap = {};
        if (Array.isArray(response)) {
          response.forEach((log) => {
            logsMap[log.date] = log;
          });
        } else if (typeof response === "object" && response !== null) {
          logsMap = response;
        } else {
          throw new Error("Unexpected response format from API");
        }

        setPeriodLogs(logsMap);
        setError(null);
      } catch (error) {
        console.error("Error fetching period logs:", error);
        setError("Failed to fetch period logs. Please try again.");
      }
    };

    fetchPeriodLogs();
  }, [userId]);

  const handleDateClick = async (day) => {
    const selectedDateObj = new Date(currentYear, currentMonth, day);
    const formattedDate = selectedDateObj.toISOString().split("T")[0];
    try {
      const logData = await getPeriodLogByDate(userId, formattedDate);

      setSelectedDate(selectedDateObj);
      setSelectedLog(logData || null);

      setAllSymptoms({
        physical: logData?.allPhysicalSymptoms || [],
        mental: logData?.allMentalConditions || [],
      });

      setShowForm(true);
    } catch (error) {
      console.error("Error fetching period log for selected date:", error);
    }
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
            <div className="calendar__wrapper">
            <h2 className="calendar__month">{monthsOfYear[currentMonth]}</h2>
            <h2 className="calendar__year">{currentYear}</h2>
            </div>
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
                className={`calendar__number ${hasLog ? "calendar__number--entry" : ""}`}
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
          existingLog={selectedLog}
          allSymptoms={allSymptoms}
        />
      )}
    </div>
  );
}

export default Calendar;
