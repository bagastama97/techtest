import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
function Filter() {
  const navigate = useNavigate();
  const [locationState, setLocationState] = useState({});
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    const storedLocationState = localStorage.getItem("locationState");
    const storedDateState = localStorage.getItem("dateState");
    const storedWhoState = localStorage.getItem("whoState");
    if (storedLocationState) {
      const result = JSON.parse(storedLocationState);
      setLocationState(result);
    }
    if (storedDateState) {
      setStartDate(new Date(storedDateState));
    }
    if (storedWhoState) {
      const result = JSON.parse(storedWhoState);
      setAdults(result.adults);
      setChildren(result.children);
      setInfants(result.infants);
    }
  }, []);

  const movePage = (page) => {
    navigate(page);
  };
  const pickDate = (date) => {
    localStorage.setItem("dateState", date);
    setStartDate(date);
  };
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const incrementCount = async (type) => {
    if (type === "adults") await setAdults((prevCount) => prevCount + 1);
    if (type === "children") await setChildren((prevCount) => prevCount + 1);
    if (type === "infants") await setInfants((prevCount) => prevCount + 1);

    const updatedState = {
      adults: type === "adults" ? adults + 1 : adults,
      children: type === "children" ? children + 1 : children,
      infants: type === "infants" ? infants + 1 : infants,
    };

    await localStorage.setItem("whoState", JSON.stringify(updatedState));
  };

  const decrementCount = async (type) => {
    let updatedAdults = adults;
    let updatedChildren = children;
    let updatedInfants = infants;

    if (type === "adults" && adults > 0) {
      await setAdults((prevCount) => prevCount - 1);
      updatedAdults -= 1;
    }
    if (type === "children" && children > 0) {
      await setChildren((prevCount) => prevCount - 1);
      updatedChildren -= 1;
    }
    if (type === "infants" && infants > 0) {
      await setInfants((prevCount) => prevCount - 1);
      updatedInfants -= 1;
    }

    const updatedState = {
      adults: updatedAdults,
      children: updatedChildren,
      infants: updatedInfants,
    };

    await localStorage.setItem("whoState", JSON.stringify(updatedState));
  };
  const clearAll = () => {
    localStorage.removeItem("locationState");
    localStorage.removeItem("dateState");
    localStorage.removeItem("whoState");
    setLocationState({});
    setStartDate(null);
    setAdults(0);
    setChildren(0);
    setInfants(0);
  };
  const searchExperiences = () => {
    const storedLocationState = localStorage.getItem("locationState");
    const storedDateState = localStorage.getItem("dateState");
    const storedWhoState = localStorage.getItem("whoState");
    if (!storedLocationState || !storedDateState || !storedWhoState) {
      alert("Please fill in all required fields before searching.");
      return;
    }
    movePage("list");
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
      <div className="container" onClick={() => movePage("location")}>
        <div className="text-section">
          <p className="gray-text2">Where</p>
          {locationState.name ? (
            <p className="black-text2">{locationState.name}</p>
          ) : (
            <p className="black-text2">Choose Destination</p>
          )}
        </div>
      </div>
      <div className="container">
        <div className="text-section">
          <p className="gray-text2">When</p>
          <div className="datepicker-container">
            <DatePicker
              selected={startDate}
              onChange={(date) => pickDate(date)}
              className="date-picker"
              placeholderText="Select date"
            />
          </div>
        </div>
      </div>
      <div
        className={`container ${expanded ? "expanded" : ""}`}
        onClick={toggleExpansion}
      >
        <div className="text-section">
          <p className="gray-text2">Who</p>
          <p className="black-text2">Fill how many</p>
        </div>
        {expanded && (
          <div className="input-section" onClick={stopPropagation}>
            <div className="input-row">
              <div className="input-label">
                <p className="input-title">Adults</p>
                <p className="input-subtitle">Ages 13 or above</p>
              </div>
              <div className="input-controls">
                <button onClick={() => decrementCount("adults")}>-</button>
                <p>{adults}</p>
                <button onClick={() => incrementCount("adults")}>+</button>
              </div>
            </div>
            <div className="input-row">
              <div className="input-label">
                <p className="input-title">Children</p>
                <p className="input-subtitle">Ages 2 - 12</p>
              </div>
              <div className="input-controls">
                <button onClick={() => decrementCount("children")}>-</button>
                <p>{children}</p>
                <button onClick={() => incrementCount("children")}>+</button>
              </div>
            </div>
            <div className="input-row">
              <div className="input-label">
                <p className="input-title">Infants</p>
                <p className="input-subtitle">Under 2</p>
              </div>
              <div className="input-controls">
                <button onClick={() => decrementCount("infants")}>-</button>
                <p>{infants}</p>
                <button onClick={() => incrementCount("infants")}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="search-button-container">
        <span className="clear-all-text" onClick={clearAll}>
          Clear All
        </span>
        <button className="search-button" onClick={searchExperiences}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Filter;
