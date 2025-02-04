import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { HistoryListProps } from "../interfaces/historyListProps.interface";

export const HistoryList: React.FC<HistoryListProps> = ({ history, onDelete, onHistoryClick }) => {
  return (
    <ul>
      {history.map((query, index) => (
        <li key={index} className="history-item">
          <button onClick={() => onHistoryClick(query)}>{query}</button>
          <button onClick={() => onDelete(index)} className="delete-btn">
            <MdDeleteSweep />
          </button>
        </li>
      ))}
    </ul>
  );
};
