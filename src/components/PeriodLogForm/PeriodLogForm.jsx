import React, { useState, useEffect } from 'react';
import { getPeriodLogByDate, createPeriodLog, updatePeriodLog, deletePeriodLog, getPhysicalSymptoms, getMentalConditions } from '../utils/api';
import "./PeriodLogForm.scss";

function PeriodLogForm({ onSubmit, onClose, userId, selectedDate }) {
  const [hasPeriod, setHasPeriod] = useState(false);
  const [flow, setFlow] = useState('');
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
        const formattedDate = selectedDate.toISOString().split('T')[0];
        
        const logData = await getPeriodLogByDate(userId, formattedDate);
        if (logData) {
          setExistingLog(logData);
          setHasPeriod(logData.has_period);
          setFlow(logData.flow || '');
          setPhysicalSymptoms(logData.physicalSymptoms || []);
          setMentalConditions(logData.mentalConditions || []);
        } else {
          setExistingLog(null);
          setHasPeriod(false);
          setFlow('');
          setPhysicalSymptoms([]);
          setMentalConditions([]);
        }
        
        const physicalSymptomsData = await getPhysicalSymptoms();
        setPhysicalSymptomOptions(physicalSymptomsData);
        
        const mentalConditionsData = await getMentalConditions();
        setMentalConditionOptions(mentalConditionsData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const logData = {
      has_period: hasPeriod,
      flow: hasPeriod ? flow : null,
      physicalSymptoms,
      mentalConditions
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
      setError('Failed to save log. Please try again.');
      console.error('Error submitting log:', error);
    }
  };

  const handleDelete = async () => {
    if (!existingLog) return;

    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      await deletePeriodLog(userId, formattedDate);
      onSubmit(null); 
    } catch (error) {
      setError('Failed to delete log. Please try again.');
      console.error('Error deleting log:', error);
    }
  };

  if (isLoading) return <div className="period-log-form__loading">Loading...</div>;
  if (error) return <div className="period-log-form__error">{error}</div>;

}