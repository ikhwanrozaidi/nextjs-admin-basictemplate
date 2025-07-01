import { AuthCredentials } from "../type/auth";

export const getStoredCredentials = (): AuthCredentials => {
  if (typeof window === "undefined") {
    return new AuthCredentials();
  }

  try {
    const email = localStorage.getItem("userEmail") || "";
    const password = localStorage.getItem("userPassword") || "";
    return new AuthCredentials(email, password);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return new AuthCredentials();
  }
};

export const saveCredentials = (credentials: AuthCredentials): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("userPassword", credentials.password);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const clearCredentials = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
