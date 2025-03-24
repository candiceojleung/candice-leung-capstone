import "./Calendar.scss";
import { useState, useEffect } from "react";
import PeriodLogForm from "../PeriodLogForm/PeriodLogForm";
import { getAllPeriodLogs, getPeriodLogByDate } from "../../utils/apiUtils";
import { formatDateToISO } from "../../utils/dateUtils";

function Calendar({ userId }) {
  const daysOfWeek = ["Sun", "Mon", "TUE", "WED", "THU", "FRI", "SAT"];
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
  const [formSuccessMessage, setFormSuccessMessage] = useState(null);

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

  // Fetch all period logs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsResponse = await getAllPeriodLogs(userId);

        if (Array.isArray(logsResponse)) {
          const logsMap = {};
          logsResponse.forEach((log) => {
            const date = formatDateToISO(log.date);
            logsMap[date] = log;
          });
          setPeriodLogs(logsMap);
        } else {
          console.error("Unexpected response format from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, periodLogs]);

  //select date, and get period log for that date
  const handleDateClick = async (day) => {
    setFormSuccessMessage(null);
    const selectedDateObj = new Date(currentYear, currentMonth, day);
    const formattedDate = formatDateToISO(selectedDateObj);
    try {
      const response = await getPeriodLogByDate(userId, formattedDate);

      setSelectedDate(selectedDateObj);
      setSelectedLog(response.log || null);
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
    setSelectedDate(null);
    setFormSuccessMessage(
      selectedLog ? "Log updated successfully!" : "Log saved successfully!"
    );
    setShowForm(false);
    setTimeout(() => {
      setFormSuccessMessage(null);
    }, 3000);
  };

  // Close the form
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedDate(null);
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
    <section className="calendar">
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
            const date = formatDateToISO(
              new Date(currentYear, currentMonth, day + 1)
            );
            const log = periodLogs[date];
            const isSelected =
              selectedDate &&
              selectedDate.getDate() === day + 1 &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            const today = new Date();
            const isToday =
              today.getDate() === day + 1 &&
              today.getMonth() === currentMonth &&
              today.getFullYear() === currentYear;

            return (
              <div
                className={`calendar__number ${
                  isSelected ? "calendar__number--selected" : ""
                } ${isToday ? "calendar__number--today" : ""}`}
                key={day + 1}
                onClick={() => handleDateClick(day + 1)}
              >
                {day + 1}
                <div className="calendar__indicators">
                  {log?.has_period === 1 && (
                    <span className="calendar__indicator calendar__indicator--period"></span>
                  )}
                  {log?.physicalSymptoms?.length > 0 && (
                    <span className="calendar__indicator calendar__indicator--physical"></span>
                  )}
                  {log?.mentalConditions?.length > 0 && (
                    <span className="calendar__indicator calendar__indicator--mental"></span>
                  )}
                </div>
              </div>
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
          setSelectedDate={setSelectedDate}
          existingLog={selectedLog}
          allSymptoms={allSymptoms}
        />
      )}
      {formSuccessMessage && (
        <p className="form__message">{formSuccessMessage}</p>
      )}
    </section>
  );
}

export default Calendar;
