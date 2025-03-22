import React, { useState, useEffect } from "react";
import "./PeriodLogForm.scss";
import SymptomButtons from "../SymptomButtons/SymptomButtons";
import {
  createPeriodLog,
  updatePeriodLog,
  deletePeriodLog,
} from "../../utils/apiUtils";

import { formatDateToISO } from "../../utils/dateUtils";

function PeriodLogForm({
  onSubmit,
  onClose,
  userId,
  selectedDate,
  existingLog,
  allSymptoms,
  onDelete,
}) {
  const [hasPeriod, setHasPeriod] = useState(existingLog?.has_period ?? null);
  const [flow, setFlow] = useState(existingLog?.flow || "");
  const [physicalSymptoms, setPhysicalSymptoms] = useState(
    existingLog?.physicalSymptoms || []
  );
  const [mentalConditions, setMentalConditions] = useState(
    existingLog?.mentalConditions || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingLog) {
      setHasPeriod(
        existingLog.has_period === true || existingLog.has_period === 1
      );
      setFlow(existingLog.flow || "");
      setPhysicalSymptoms(existingLog.physicalSymptoms || []);
      setMentalConditions(existingLog.mentalConditions || []);
    } else {
      setHasPeriod(null);
      setFlow("");
      setPhysicalSymptoms([]);
      setMentalConditions([]);
    }
  }, [existingLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const physicalSymptomIds = physicalSymptoms
      .map((name) => {
        const symptom = allSymptoms.physical.find((s) => s.name === name);
        return symptom ? symptom.id : null;
      })
      .filter((id) => id !== null);

    const mentalConditionIds = mentalConditions
      .map((name) => {
        const condition = allSymptoms.mental.find((c) => c.name === name);
        return condition ? condition.id : null;
      })
      .filter((id) => id !== null);

    const logData = {
      has_period: hasPeriod,
      flow: hasPeriod ? flow : null,
      physicalSymptoms: physicalSymptomIds,
      mentalConditions: mentalConditionIds,
    };

    try {
      let response;
      const formattedDate = formatDateToISO(selectedDate);

      if (existingLog) {
        response = await updatePeriodLog(userId, formattedDate, logData);
      } else {
        response = await createPeriodLog(userId, formattedDate, logData);
      }

      onSubmit(response);

      setError(null);
    } catch (error) {
      console.error("Error submitting period log:", error);
      setError("Failed to save log. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingLog) return;

    setIsLoading(true);
    setError(null);

    try {
      const formattedDate = formatDateToISO(selectedDate);
      await deletePeriodLog(userId, formattedDate);
      onDelete(formattedDate);
    } catch (error) {
      console.error("Error deleting period log:", error);
      setError("Failed to delete log. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSymptom = (symptomName, isPhysical) => {
    const setSymptoms = isPhysical ? setPhysicalSymptoms : setMentalConditions;
    setSymptoms(prev => 
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">
        {existingLog ? "Update Period Log" : "Create Period Log"}
      </h2>

      <div className="form__tracker">
        <label className="form__question">Do you have your period today?</label>
        <div className="form__options">
          <SymptomButtons
            symptom={{ id: "yes", name: "Yes" }}
            isSelected={hasPeriod === true}
            onClick={() => setHasPeriod(true)}
            className="form__button"
          />
          <SymptomButtons
            symptom={{ id: "no", name: "No" }}
            isSelected={hasPeriod === false}
            onClick={() => setHasPeriod(false)}
            className="form__button"
          />
        </div>
      </div>

      {hasPeriod && (
        <div className="form__tracker">
          <label className="form__question">How heavy is your flow?</label>
          <div className="form__options">
            {["light", "medium", "heavy"].map((flowType) => (
              <SymptomButtons
                key={flowType}
                symptom={{ id: flowType, name: flowType }}
                isSelected={flow === flowType}
                onClick={() => setFlow(flowType)}
                className="form__button"
              />
            ))}
          </div>
        </div>
      )}

      <div className="form__tracker">
        <label className="form__question">Any physical discomfort?</label>
        <div className="form__options">
          {allSymptoms.physical.map((symptom) => (
            <SymptomButtons
              key={symptom.id}
              symptom={symptom}
              isSelected={physicalSymptoms.includes(symptom.name)}
              onClick={() => toggleSymptom(symptom.name, true)}
              className="form__button"
            />
          ))}
        </div>
      </div>

      <div className="form__tracker">
        <label className="form__question">How do you feel?</label>
        <div className="form__options">
          {allSymptoms.mental.map((condition) => (
            <SymptomButtons
              key={condition.id}
              symptom={condition}
              isSelected={mentalConditions.includes(condition.name)}
              onClick={() => toggleSymptom(condition.name, false)}
              className="form__button"
            />
          ))}
        </div>
      </div>

      <div className="form__submit">
        <button className="form__actions" type="submit">
          {existingLog ? "Update" : "Save"}
        </button>
        {existingLog && (
          <button
            className="form__actions"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        <button className="form__actions" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PeriodLogForm;
