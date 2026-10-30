export const getStorage = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error("LocalStorage read error:", error);
    return fallback;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("LocalStorage save error:", error);
    return false;
  }
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};