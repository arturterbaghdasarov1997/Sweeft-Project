import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineManageSearch } from "react-icons/md";
import { LuTextSearch } from "react-icons/lu";

interface NavBarProps {
  query?: string;
  setQuery?: (query: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({setQuery}) => {
    const location = useLocation();

    const handleHomeClick = () => {
        if (setQuery) {
            setQuery("");
        }
    };

  return (
    <div className="navbar">
      <div className="navbarItem">
        <Link
            to="/"
            onClick={handleHomeClick}
            className={location.pathname === "/" ? "active" : ""}
            >
          <IoHomeSharp /> Home
        </Link>
        <Link
            to="/history"
            className={location.pathname === "/history" ? "active" : ""}
        >
          <LuTextSearch /> Search History
        </Link>
      </div>
    </div>
  );
};
