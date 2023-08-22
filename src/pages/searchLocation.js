import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/navbar";
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
    navigate(`/filter`);
  };
  return (
    <>
      <Navbar />
      <div className="main-container">
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
            marginTop: "10vh",
          }}
          value={searchInput}
          onChange={handleSearchInputChange}
        >
          <div className="search-container" style={{ marginTop: "5vh" }}>
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
    </>
  );
}

export default SearchLocation;
