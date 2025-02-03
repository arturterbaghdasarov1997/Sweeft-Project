import { useState, useEffect } from "react";

export const useHistoryManager = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    sessionStorage.clear();
    setHistory([]);
  };

  const deleteHistoryItem = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return { history, setHistory, clearHistory, deleteHistoryItem };
};
