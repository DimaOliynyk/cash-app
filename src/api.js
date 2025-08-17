import axios from "axios";

// Base URL
const API_BASE_URL = 'http://192.168.0.247:3000/api';

// https://cash-app-server-cydp.onrender.com
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );
    localStorage.setItem("token", response.data.token); // adjust if token is nested differently

    
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response || error.message);
    throw error;
  }
};

export const registerUser = async ({ username, password, firstName, lastName, email }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      { username, password, firstName, lastName, email },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );
    localStorage.setItem("token", response.data.token); // adjust if token is nested differently

    
    return response.data;
  } catch (error) {
    console.error("Register failed:", error.response || error.message);
    throw error;
  }
};

export const verifyEmail = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/me`,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get user failed:", error.response || error.message);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/me`,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get user failed:", error.response || error.message);
    throw error;
  }
};


export const fetchExpenses = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/transactions/`,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Getting transactions failed:", error.response || error.message);
    throw error;
  }
};

export const getTransaction = async () => {
  try {
    const urlParts = window.location.pathname.split('/');
    const transactionId = urlParts[urlParts.length - 1];
    const response = await axios.get(
      `${API_BASE_URL}/transactions/${transactionId}`,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Getting transactions failed:", error.response || error.message);
    throw error;
  }
};


export const deleteTransaction = async ({ id }) => {
  try {

    const response = await axios.delete(
      `${API_BASE_URL}/transactions/${id}`,
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
      }
    );
    console.log("transaction deleted");
    return response.data;
  } catch (error) {
    console.error("Failed to delete transaction:", error.response || error.message);
    throw error;
  }
};


export const addIncomeRequest = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/transactions/income`,
      JSON.stringify(credentials),
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Adding income failed:", error.response || error.message);
    throw error;
  }
};

export const addExpenseRequest = async (credentials) => {
  try {
    console.log(credentials)
    const response = await axios.post(
      `${API_BASE_URL}/transactions/expense`,
      JSON.stringify(credentials),
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Adding income failed:", error.response || error.message);
    throw error;
  }
};

