import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import Database from "../services";

function Maps() {
  const db = new Database();
  const storedLocationState = JSON.parse(localStorage.getItem("locationState"));
  const storedDateState = new Date(localStorage.getItem("dateState"));
  const storedWhoState = JSON.parse(localStorage.getItem("whoState"));
  const day = String(storedDateState.getDate()).padStart(2, "0");
  const month = String(storedDateState.getMonth() + 1).padStart(2, "0");
  const year = storedDateState.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  const [results, setResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await db.searchExperiences(
          storedLocationState.id,
          formattedDate,
          storedWhoState.adults,
          storedWhoState.children,
          storedWhoState.infants
        );
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const viewDetail = (data) => {
    setSelectedMarker(data);
  };

  const clearSelectedMarker = () => {
    setSelectedMarker(null);
  };
  const getIconUrl = (type) => {
    if (type === "food") {
      return "/food.png";
    } else if (type === "nature") {
      return "/nature.png";
    } else if (type === "history") {
      return "/history.png";
    }
    return "/skateboarding.svg"; // Default icon
  };

  return (
    <div className="list-main">
      <div className="list-choosed-location">
        <div className="list-left-section">
          <div className="list-back-icon">&#8592;</div>
          <div className="list-title">
            <h2>usa</h2>
            <p>Anytime - Add guest</p>
          </div>
        </div>
        <div className="list-right-section">
          <div className="list-filter-icon">&#9776;</div>
        </div>
      </div>
      <header className="list-header">
        <div className="list-header-container">
          <h1>Explore Nearby Stays</h1>
        </div>
      </header>
      <MapContainer
        center={[storedLocationState.latitude, storedLocationState.longitude]}
        zoom={6}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {results.map((result) => (
          <Marker
            key={result.id}
            position={[result.latitude, result.longitude]}
            icon={
              new Icon({ iconUrl: getIconUrl(result.type), iconSize: [25, 25] })
            }
            eventHandlers={{
              click: () => viewDetail(result),
            }}
          />
        ))}
      </MapContainer>
      {selectedMarker && (
        <div className="leafcard" onClick={clearSelectedMarker}>
          <div className="leafcard-image">
            <img src={selectedMarker.mainImage} alt="Gambar Tempat" />
          </div>
          <div className="leafcard-details">
            <div className="leafcard-rating">Rate: {selectedMarker.rate}</div>
            <div className="leafcard-name">{selectedMarker.name}</div>
            <div className="leafcard-price">
              From: ${selectedMarker.price}/person
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Maps;
