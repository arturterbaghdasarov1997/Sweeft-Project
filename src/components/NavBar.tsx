import { Link } from "react-router-dom";
import "./NavBar.css";

interface NavBarProps {
  query?: string;
  setQuery?: (query: string) => void;
}

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className="navbar">
      <div className="navbarItem">
        <Link to="/">Home</Link>
        <Link to="/history">Search History</Link>
      </div>
    </div>
  );
};
