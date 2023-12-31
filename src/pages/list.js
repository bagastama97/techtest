import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Database from "../services";
import SNavbar from "../components/navbar";
import NavbarIcon from "../components/iconNavbar";
import Other from "../components/other";
function ListPage() {
  const navigate = useNavigate();
  const db = new Database();
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await db.searchAllExperiences();
        setResults(data);
        console.log(data, "<<<<<<<<<<<<<<<<");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const movePage = () => {
    navigate("../maps");
  };

  return (
    <>
      <SNavbar />
      <NavbarIcon />
      <Other />
      <div className="list-main">
        <main className="list-content">
          <section className="list-listings">
            {results.map((result) => (
              <article key={result.id} className="list-listing">
                <img
                  src={result.mainImage}
                  alt={result.name}
                  className="list-main-image"
                  style={{ borderRadius: "10px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h2>{result.name}</h2>
                  <div className="list-rating">
                    <span className="list-rating-stars">&#9733;</span>
                    <span className="list-rating-number">{result.rate}</span>
                    <span className="list-rating-reviews">
                      ({result.orders})
                    </span>
                  </div>
                </div>
                <p className="list-listing-desc">{result.desc}</p>
                <div className="list-price">
                  <p style={{ fontWeight: "bold" }}>
                    Rp.{formatNumber(result.price)}
                  </p>
                  <p>/malam</p>
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
    </>
  );
}

export default ListPage;
