import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Database from "../services";

function SearchLocation() {
  const db = new Database();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchInputChange = async (event) => {
    if (event.target.value === "") setSearchResult([]);
    else {
      await setSearchResult(db.searchLocations(event.target.value));
      await setSearchInput(event.target.value);
    }
  };

  const handleLocationClick = async (locationId) => {
    await localStorage.setItem(
      "locationState",
      JSON.stringify(db.searchLocationsId(+locationId))
    );
    navigate(`/`);
  };
  return (
    <div className="main-container">
      <div className="header">
        <span className="back-icon">&lt;</span>
        <div className="title">
          <span className="gray-text">Stay</span>
          <span className="black-text">Experiences</span>
        </div>
      </div>
      <div
        className="container"
        style={{
          width: "100vw",
          borderRadius: 80,
          height: "100vh",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        value={searchInput}
        onChange={handleSearchInputChange}
      >
        <div className="search-container">
          <input
            type="text"
            className="gray-input"
            placeholder="Search location..."
          />
          <span className="search-icon">&#128269;</span>
        </div>
        {searchResult.map((location) => (
          <div className="searchResult" key={location.id}>
            <div className="searchIconCOntainer">&#128269;</div>
            <p
              className="searchResultText"
              onClick={() => handleLocationClick(location.id)}
            >
              {location.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLocation;
