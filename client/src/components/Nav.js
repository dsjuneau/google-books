import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Book Search
      </Link>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/saved/" className="nav-link">
            Saved
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/search/" className="nav-link">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}
