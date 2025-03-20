import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// User API calls
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/users/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/api/users/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Period Log API calls
export const getAllPeriodLogs = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/log/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllPeriodLogs:", error.response || error);
    throw error;
  }
};


export const getPeriodLogByDate = async (userId, date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/log/user/${userId}/date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching period log by date:", error);
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const createPeriodLog = async (userId, date, logData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/log/user/${userId}/date/${date}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating period log:", error);
    throw error;
  }
};

export const updatePeriodLog = async (userId, date, logData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/log/user/${userId}/date/${date}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating period log:", error);
    throw error;
  }
};

export const deletePeriodLog = async (userId, date) => {
  try {
    await axios.delete(`${BASE_URL}/api/log/user/${userId}/date/${date}`);
    return true;
  } catch (error) {
    console.error("Error deleting period log:", error);
    throw error;
  }
};
