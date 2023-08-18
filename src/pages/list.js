import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Database from "../services";
function ListPage() {
  const navigate = useNavigate();
  const db = new Database();
  const storedLocationState = JSON.parse(localStorage.getItem("locationState"));
  const storedDateState = new Date(localStorage.getItem("dateState"));
  const storedWhoState = JSON.parse(localStorage.getItem("whoState"));
  const day = String(storedDateState.getDate()).padStart(2, "0");
  const month = String(storedDateState.getMonth() + 1).padStart(2, "0");
  const year = storedDateState.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  const [results, setResults] = useState([]);
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
  const movePage = () => {
    navigate("../maps");
  };

  return (
    <div className="list-main">
      <div className="list-choosed-location">
        <div className="list-left-section">
          <div className="list-back-icon">&#8592;</div>
          <div className="list-title">
            <h2>{storedLocationState.name}</h2>
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
      <main className="list-content">
        <section className="list-listings">
          {results.map((result) => (
            <article key={result.id} className="list-listing">
              <div className="list-image-container">
                <img
                  src={result.mainImage}
                  alt={result.name}
                  className="list-main-image"
                />
              </div>
              <h2>{result.name}</h2>
              <p className="list-listing-desc">{result.desc}</p>
              <p className="list-price">from ${result.price}/person</p>
              <div className="list-rating">
                <span className="list-rating-stars">&#9733;</span>
                <span className="list-rating-number">{result.rate}</span>
                <span className="list-rating-reviews">({result.orders})</span>
              </div>
              <div className="list-author-container">
                <img
                  src={result.subImage}
                  alt={`Author: ${result.hosted}`}
                  className="list-author-image"
                />
                <p className="list-author">Author: {result.hosted}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <div class="floating-button">
        <button class="view-on-maps-button" onClick={() => movePage()}>
          <span class="icon">🗺️</span> View on Maps
        </button>
      </div>
    </div>
  );
}

export default ListPage;
