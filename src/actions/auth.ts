import { API_BASE_URL } from "../constants";
import type { FormDataLogin } from "../types";

export const loginAction = async (data: FormDataLogin) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      console.log("API Error:", result.message || response.statusText);

      return {
        user: null,
        error: result.message || response.statusText,
      };
    }
    return result;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// TODO: logout action
