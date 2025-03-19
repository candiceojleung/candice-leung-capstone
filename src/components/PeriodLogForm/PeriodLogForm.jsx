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

}