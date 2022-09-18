import { useState, useEffect } from "react";

const useDebounce = (value, time) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => clearTimeout(timer);
  }, [value, time]);

  return debouncedValue;
};

export default useDebounce;
