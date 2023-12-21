import { useState, useEffect } from "react";

export const useResultForm = () => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [result]);

  return { result, setResult };
};
