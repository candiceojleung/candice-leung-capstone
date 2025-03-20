import React, { useState, useEffect } from "react";
import "./PeriodLogForm.scss";
import SymptomButtons from "../SymptomButtons/SymptomButtons";
import {
  createPeriodLog,
  updatePeriodLog,
  deletePeriodLog,
} from "../../utils/apiUtils";

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

    const logData = {
      has_period: hasPeriod,
      flow: hasPeriod ? flow : null,
      physicalSymptoms,
      mentalConditions,
    };

    try {
      let response;
      const formattedDate = selectedDate.toISOString().split("T")[0];

      if (existingLog) {
        response = await updatePeriodLog(userId, formattedDate, logData);
      } else {
        response = await createPeriodLog(userId, formattedDate, logData);
      }

      onSubmit(response);
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
      const formattedDate = selectedDate.toISOString().split("T")[0];
      await deletePeriodLog(userId, formattedDate);
      onDelete(formattedDate); // Call the new onDelete prop
    } catch (error) {
      console.error("Error deleting period log:", error);
      setError("Failed to delete log. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSymptom = (symptomName, isPhysical) => {
    if (isPhysical) {
      setPhysicalSymptoms((prev) =>
        prev.includes(symptomName)
          ? prev.filter((s) => s !== symptomName)
          : [...prev, symptomName]
      );
    } else {
      setMentalConditions((prev) =>
        prev.includes(symptomName)
          ? prev.filter((c) => c !== symptomName)
          : [...prev, symptomName]
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingLog ? "Update Period Log" : "Create Period Log"}</h2>

      <div>
        <label>Do you have your period today?</label>
        <SymptomButtons
          symptom={{ id: "yes", name: "Yes" }}
          isSelected={hasPeriod === true}
          onClick={() => setHasPeriod(true)}
        />
        <SymptomButtons
          symptom={{ id: "no", name: "No" }}
          isSelected={hasPeriod === false}
          onClick={() => setHasPeriod(false)}
        />
      </div>

      {hasPeriod && (
        <div>
          <label>How heavy is your flow?</label>
          {["light", "medium", "heavy"].map((flowType) => (
            <SymptomButtons
              key={flowType}
              symptom={{ id: flowType, name: flowType }}
              isSelected={flow === flowType}
              onClick={() => setFlow(flowType)}
            />
          ))}
        </div>
      )}

      <div>
        <label>Physical Symptoms</label>
        {allSymptoms.physical.map((symptom) => (
          <SymptomButtons
            key={symptom.id}
            symptom={symptom}
            isSelected={physicalSymptoms.includes(symptom.name)}
            onClick={() => toggleSymptom(symptom.name, true)}
          />
        ))}
      </div>

      <div>
        <label>Mental Conditions</label>
        {allSymptoms.mental.map((condition) => (
          <SymptomButtons
            key={condition.id}
            symptom={condition}
            isSelected={mentalConditions.includes(condition.name)}
            onClick={() => toggleSymptom(condition.name, false)}
          />
        ))}
      </div>

      <button type="submit">{existingLog ? "Update" : "Save"}</button>
      {existingLog && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default PeriodLogForm;
