import React from "react";
import { Link } from "react-router-dom";
import logo from "../meetup-new.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <nav className="navbar bg-white">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="110"
            height="80"
            className="d-inline-block align-text-top"
          />
        </Link>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or topic..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
