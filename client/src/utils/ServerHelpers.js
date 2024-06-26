import { backendUrl } from "./Config";

const createUser = async (userData) => {

  try {
    const response = await fetch(`${backendUrl}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

const loginUser = async (userData) => {

  try {
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error(`Error loging user: ${error.message}`);
  }
}

const logoutAndClearCookie = async () => {

  try {
    const response = await fetch(`${backendUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    throw new Error(`Error loging user: ${error.message}`);
  }
}

export { createUser, loginUser, logoutAndClearCookie };