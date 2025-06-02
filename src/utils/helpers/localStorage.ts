import type { UserFavourite } from "../../../store/userFavourites/userFavouritesSlice";

export const saveToLocalStorage = (key: string, value: UserFavourite[]): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
export const getFromLocalStorage = (key: string): UserFavourite[] => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return [];
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error getting from localStorage", error);
    return  [];
  }
};
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};