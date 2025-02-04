export interface HistoryListProps {
  history: string[];
  onDelete: (index: number) => void;
  onHistoryClick: (query: string) => void;
}