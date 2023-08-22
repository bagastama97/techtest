import React, { useState } from "react";

const Other = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <div className="nav-navbar-center-other">
      <div className="nav-filter-container-other">
        <span className="nav-filter-text">Tampilkan harga total</span>
        <span className="nav-filter-icon" style={{ color: "GrayText" }}>
          Termasuk semua biaya, sebelum pajak{" "}
          <button
            className={`nav-filter-switch ${isOn ? "on" : "off"}`}
            onClick={toggleSwitch}
          >
            <span className="nav-filter-switch-handle"></span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Other;
