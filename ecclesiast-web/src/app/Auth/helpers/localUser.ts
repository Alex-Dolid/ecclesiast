import { User } from "../types";

export const getLocalUser = (): User | null => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user)
  }

  return null;
};

export const setLocalUser = (payload: User): void => localStorage.setItem("user", JSON.stringify(payload));
