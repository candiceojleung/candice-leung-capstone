import React, { useState, useEffect } from "react";
import {
  getPeriodLogByDate,
  createPeriodLog,
  updatePeriodLog,
  deletePeriodLog,
  getPhysicalSymptoms,
  getMentalConditions,
} from "../utils/api";
import "./PeriodLogForm.scss";
import SymptomButtons from "../SymptomButtons/SymptomButtons";

function PeriodLogForm({ onSubmit, onClose, userId, selectedDate }) {
  const [hasPeriod, setHasPeriod] = useState(false);
  const [flow, setFlow] = useState("");
  const [physicalSymptoms, setPhysicalSymptoms] = useState([]);
  const [mentalConditions, setMentalConditions] = useState([]);
  const [physicalSymptomOptions, setPhysicalSymptomOptions] = useState([]);
  const [mentalConditionOptions, setMentalConditionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [existingLog, setExistingLog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const logData = await getPeriodLogByDate(userId, formattedDate);
        if (logData) {
          setExistingLog(logData);
          setHasPeriod(logData.has_period);
          setFlow(logData.flow || "");
          setPhysicalSymptoms(logData.physicalSymptoms || []);
          setMentalConditions(logData.mentalConditions || []);
        } else {
          setExistingLog(null);
          setHasPeriod(false);
          setFlow("");
          setPhysicalSymptoms([]);
          setMentalConditions([]);
        }

        const physicalSymptomsData = await getPhysicalSymptoms();
        setPhysicalSymptomOptions(physicalSymptomsData);

        const mentalConditionsData = await getMentalConditions();
        setMentalConditionOptions(mentalConditionsData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toISOString().split("T")[0];

    const logData = {
      has_period: hasPeriod,
      flow: hasPeriod ? flow : null,
      physicalSymptoms,
      mentalConditions,
    };

    try {
      let response;
      if (existingLog) {
        response = await updatePeriodLog(userId, formattedDate, logData);
      } else {
        response = await createPeriodLog(userId, formattedDate, logData);
      }
      onSubmit(response);
    } catch (error) {
      setError("Failed to save log. Please try again.");
      console.error("Error submitting log:", error);
    }
  };

  const handleDelete = async () => {
    if (!existingLog) return;

    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      await deletePeriodLog(userId, formattedDate);
      onSubmit(null);
    } catch (error) {
      setError("Failed to delete log. Please try again.");
      console.error("Error deleting log:", error);
    }
  };

  if (isLoading)
    return <div className="period-log-form__loading">Loading...</div>;
  if (error) return <div className="period-log-form__error">{error}</div>;

  return (
    <form className="period-log-form" onSubmit={handleSubmit}>
      <h2 className="period-log-form__title">
        {existingLog ? "Update Period Log" : "Create Period Log"}
      </h2>
      <div className="period-log-form__field">
        <label className="period-log-form__label">
          Do you have your period today?
          <input
            type="checkbox"
            checked={hasPeriod}
            onChange={(e) => setHasPeriod(e.target.checked)}
            className="period-log-form__checkbox"
          />
        </label>
      </div>
      {hasPeriod && (
        <div className="period-log-form__field">
          <label className="period-log-form__label">
            How heavy is your flow?
            <select
              value={flow}
              onChange={(e) => setFlow(e.target.value)}
              className="period-log-form__select"
            >
              <option value="">Select</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>
          </label>
        </div>
      )}
      <div className="period-log-form__field">
        <label className="period-log-form__label">Any symptoms?</label>
        <div className="period-log-form__symptom-group">
          {physicalSymptomOptions.map((symptom) => (
            <SymptomButton
              key={symptom.id}
              symptom={symptom}
              isSelected={physicalSymptoms.includes(symptom.name)}
              onClick={(selectedSymptom) => {
                if (physicalSymptoms.includes(selectedSymptom.name)) {
                  setPhysicalSymptoms(
                    physicalSymptoms.filter((s) => s !== selectedSymptom.name)
                  );
                } else {
                  setPhysicalSymptoms([
                    ...physicalSymptoms,
                    selectedSymptom.name,
                  ]);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="period-log-form__field">
        <label className="period-log-form__label">How are you feeling?</label>
        <div className="period-log-form__symptom-group">
          {mentalConditionOptions.map((condition) => (
            <SymptomButton
              key={condition.id}
              symptom={condition}
              isSelected={mentalConditions.includes(condition.name)}
              onClick={(selectedCondition) => {
                if (mentalConditions.includes(selectedCondition.name)) {
                  setMentalConditions(
                    mentalConditions.filter((c) => c !== selectedCondition.name)
                  );
                } else {
                  setMentalConditions([
                    ...mentalConditions,
                    selectedCondition.name,
                  ]);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="period-log-form__actions">
        <button
          type="submit"
          className="period-log-form__button period-log-form__button--submit"
        >
          {existingLog ? "Update" : "Save"}
        </button>
        {existingLog && (
          <button
            type="button"
            onClick={handleDelete}
            className="period-log-form__button period-log-form__button--delete"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="period-log-form__button period-log-form__button--cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PeriodLogForm;
