import { useEffect, useState } from "react";

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
};

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(
    () => getLocalStorage(key) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;