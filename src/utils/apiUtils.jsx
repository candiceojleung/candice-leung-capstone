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
    console.error("Error fetching all period logs:", error);
    throw error;
  }
};

export const getPeriodLogByDate = async (userId, date) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/log/user/${userId}/date/${date}`
    );
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

export const getAllArticles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/articles`);
    if (!response.ok) throw new Error("Failed to fetch articles");
    return await response.json();
  } catch (error) {
    console.error("Error fetching all articles:", error);
    throw error;
  }
};

export const getArticlesByCategory = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/articles/category/${category}`
    );
    if (!response.ok) throw new Error("Failed to fetch articles by category");
    return await response.json();
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/articles/${id}`);
    if (!response.ok) throw new Error("Failed to fetch article by ID");
    return await response.json();
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error;
  }
};
