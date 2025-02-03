import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { MdDeleteForever, MdDeleteSweep } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(storedHistory);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("searchHistory");
    sessionStorage.clear();
    setHistory([]);
  };

  const handleDelete = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleHistoryClick = (query: string) => {
    const cachedResults = sessionStorage.getItem(`cachedResults-${query}-page-1`);
  
    if (cachedResults) {
      sessionStorage.setItem("currentResults", cachedResults);
      navigate(`/?query=${query}`, { replace: true });
    } else {
      navigate(`/?query=${query}`);
    }
  };

  return (
    <div className="history-container">
      <NavBar />
      <h1>Search History</h1>
      {history.length > 0 ? (
        <>
          <ul>
            {history.map((query, index) => (
              <li key={index} className="history-item">
                <button onClick={() => handleHistoryClick(query)}>{query}</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  <MdDeleteSweep />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearHistory} className="clear-history-btn">
            <MdDeleteForever /> Clear History
          </button>
        </>
      ) : (
        <p className="no-history">No search history available.</p>
      )}
    </div>
  );
};

export default HistoryPage;