import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-navbar">
      <div className="nav-navbar-left">
        <Link to="/" className="nav-logo-container">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-navbar-center">
        <div className="nav-filter-container">
          <span className="nav-filter-text">Kemana Saja</span>
          <span className="nav-filter-text">Minggu Mana pun</span>
          <span className="nav-filter-icon" style={{ color: "GrayText" }}>
            Tambahkan Tamu{" "}
            <img
              src="/search.png"
              alt="Search Icon"
              className="nav-filter-icon-search"
              style={{ marginLeft: "10px" }}
            />
          </span>
        </div>
      </div>
      <div className="nav-navbar-right">
        <span className="nav-profile-text">Jadikan rumah Anda Airbnb</span>
        <div className="nav-profile-container">
          <span className="nav-profile-icon">
            <img src="/user.png" alt="Profile Icon" className="profile-icon" />
          </span>
          <div className="nav-dropdown">
            <span className="nav-dropdown-item">Daftar</span>
            <span className="nav-dropdown-item">Masuk</span>
            <div className="nav-dropdown-separator"></div>
            <span className="nav-dropdown-item">Logout</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
