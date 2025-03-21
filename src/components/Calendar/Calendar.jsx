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
  const [allSymptoms, setAllSymptoms] = useState({ physical: [], mental: [] });
  const [error, setError] = useState(null);

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((year) => (currentMonth === 0 ? year - 1 : year));
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((year) => (currentMonth === 11 ? year + 1 : year));
  };

  // Fetch all period logs when the component mounts or userId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsResponse = await getAllPeriodLogs(userId);

        let logsMap = {};
        if (Array.isArray(logsResponse)) {
          logsResponse.forEach((log) => {
            logsMap[log.date] = log;
          });
        } else if (typeof logsResponse === "object" && logsResponse !== null) {
          logsMap = logsResponse;
        } else {
          throw new Error("Unexpected response format from API");
        }

        setPeriodLogs(logsMap);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, [userId]);

  // Handle date click to fetch log and symptom data
  const handleDateClick = async (day) => {
    const selectedDateObj = new Date(currentYear, currentMonth, day);
    const formattedDate = selectedDateObj.toISOString().split("T")[0];
    try {
      const response = await getPeriodLogByDate(userId, formattedDate);

      setSelectedDate(selectedDateObj);
      setSelectedLog(response.log || null); // Existing log or null
      setAllSymptoms({
        physical: response.allPhysicalSymptoms,
        mental: response.allMentalConditions,
      });
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching period log for selected date:", error);
    }
  };


  // Handle form submission
  const handleFormSubmit = (logData) => {
    setPeriodLogs((prev) => ({
      ...prev,
      [logData.date]: logData,
    }));
    setShowForm(false);
  };

  // Close the form
  const handleFormClose = () => {
    setShowForm(false);
  };

  
  //Delete log
  const handleLogDelete = (deletedDate) => {
    setPeriodLogs((prevLogs) => {
      const updatedLogs = { ...prevLogs };
      delete updatedLogs[deletedDate];
      return updatedLogs;
    });
    setSelectedDate(null);
    setSelectedLog(null);
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
            const isSelected =
            selectedDate &&
            selectedDate.getDate() === day + 1 &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

            return (
              <span
              className={`calendar__number ${isSelected ? "calendar__number--selected" : ""}`}
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
          onDelete={handleLogDelete}
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
