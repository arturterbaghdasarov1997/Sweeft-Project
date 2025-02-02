import React from "react";
import { Link } from "react-router-dom";

export interface NavbarProps {
    query?: string;
    setQuery: (query: string) => void;
}

export const NavBar: React.FC<NavbarProps> = () => {
    return (
        <div className="navbar">
            <div className="navbarItem">
                <Link to="/">Home</Link>
                <Link to="/history">Search History</Link>
            </div>
        </div>
    );
};