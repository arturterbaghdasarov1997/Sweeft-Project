import React from "react";
import { NavBar } from "../components/NavBar";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useHistoryManager } from "../hooks/useHistoryManager";
import { HistoryList } from "../components/HistoryList";
import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  const { history, clearHistory, deleteHistoryItem } = useHistoryManager();
  const navigate = useNavigate();

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
          <HistoryList history={history} onDelete={deleteHistoryItem} onHistoryClick={handleHistoryClick} />
          <button onClick={clearHistory} className="clear-history-btn">
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
