import React, { useState, useEffect } from "react";
import {
  createPeriodLog,
  updatePeriodLog,
  deletePeriodLog,
} from "../../utils/apiUtils";
import "./PeriodLogForm.scss";
import SymptomButtons from "../SymptomButtons/SymptomButtons";

function PeriodLogForm({
  onSubmit,
  onClose,
  userId,
  selectedDate,
  existingLog,
  allSymptoms,
}) {
  const [hasPeriod, setHasPeriod] = useState(existingLog?.has_period || false);
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
      setHasPeriod(existingLog.has_period);
      setFlow(existingLog.flow || "");
      setPhysicalSymptoms(existingLog.physicalSymptoms || []);
      setMentalConditions(existingLog.mentalConditions || []);
    } else {
      setHasPeriod(false);
      setFlow("");
      setPhysicalSymptoms([]);
      setMentalConditions([]);
    }
  }, [existingLog]);

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingLog) return;

    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      setIsLoading(true);
      await deletePeriodLog(userId, formattedDate);
      onSubmit(null);
    } catch (error) {
      setError("Failed to delete log. Please try again.");
      console.error("Error deleting log:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="form__loading">Loading...</div>;
  if (error) return <div className="form__error">{error}</div>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">
        {existingLog ? "Update Period Log" : "Create Period Log"}
      </h2>
      <div className="form__field">
        <label className="form__label">Do you have your period today?</label>
        <div className="form__symptom-group">
          <SymptomButtons
            symptom={{ id: "yes", name: "Yes" }}
            isSelected={hasPeriod}
            onClick={() => setHasPeriod(true)}
          />
          <SymptomButtons
            symptom={{ id: "no", name: "No" }}
            isSelected={!hasPeriod}
            onClick={() => setHasPeriod(false)}
          />
        </div>
      </div>
      {hasPeriod && (
        <div className="form__field">
          <label className="form__label">How heavy is your flow?</label>
          <div className="form__symptom-group">
            {["light", "medium", "heavy"].map((flowType) => (
              <SymptomButtons
                key={flowType}
                symptom={{
                  id: flowType,
                  name: flowType.charAt(0).toUpperCase() + flowType.slice(1),
                }}
                isSelected={flow === flowType}
                onClick={() => setFlow(flowType)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="form__field">
        <label className="form__label">Any physical symptoms?</label>
        <div className="form__symptom-group">
          {allSymptoms.physical.map((symptom) => (
            <SymptomButtons
              key={symptom.id}
              symptom={symptom}
              isSelected={physicalSymptoms.includes(symptom.name)}
              onClick={() => {
                if (physicalSymptoms.includes(symptom.name)) {
                  setPhysicalSymptoms(
                    physicalSymptoms.filter((s) => s !== symptom.name)
                  );
                } else {
                  setPhysicalSymptoms([...physicalSymptoms, symptom.name]);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="form__field">
        <label className="form__label">How are you feeling?</label>
        <div className="form__symptom-group">
          {allSymptoms.mental.map((condition) => (
            <SymptomButtons
              key={condition.id}
              symptom={condition}
              isSelected={mentalConditions.includes(condition.name)}
              onClick={() => {
                if (mentalConditions.includes(condition.name)) {
                  setMentalConditions(
                    mentalConditions.filter((c) => c !== condition.name)
                  );
                } else {
                  setMentalConditions([...mentalConditions, condition.name]);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="form__actions">
        <button type="submit" className="form__button form__button--submit">
          {existingLog ? "Update" : "Save"}
          <i className="bx bxs-edit-alt"></i>
         
        </button>
        <button
          type="button"
          onClick={onClose}
          className="form__button form__button--cancel"
        >
          Cancel
          <i className="bx bxs-message-alt-x"></i>
        </button>
        {existingLog && (
          <button
            type="button"
            onClick={handleDelete}
            className="form__button form__button--delete"
          >
            Delete
            <i className='bx bxs-trash'></i>
          </button>
        )}
      
      </div>
    </form>
  );
}

export default PeriodLogForm;
