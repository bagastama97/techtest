import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarIcon = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const icons = [
    { id: 1, logo: "/camp.png", name: "camp" },
    { id: 2, logo: "/castle.png", name: "castle" },
    { id: 3, logo: "/dekat-danau.png", name: "lake" },
    { id: 4, logo: "/gua.png", name: "camp" },
    { id: 5, logo: "/ikonis.png", name: "history" },
    { id: 6, logo: "/kamar-besar.png", name: "big bed" },
    { id: 7, logo: "/kebun-anggur.png", name: "farm" },
    { id: 8, logo: "/kolam.png", name: "pool" },
    { id: 9, logo: "/kopi.png", name: "coffee" },
    { id: 10, logo: "/luxe.png", name: "luxe" },
    { id: 11, logo: "/pantai.png", name: "beach" },
    { id: 12, logo: "/pedesaan.png", name: "vilage" },
    { id: 13, logo: "/peternakan.png", name: "pasteur" },
    { id: 14, logo: "/populer.png", name: "poppuler" },
    { id: 15, logo: "/pulau.png", name: "island" },
    { id: 16, logo: "/rumah kecil.png", name: "tiny house" },
    { id: 17, logo: "/ski.png", name: "ski" },
    { id: 18, logo: "/surfing.png", name: "surf" },
    { id: 19, logo: "/tropis.png", name: "tropical" },
    { id: 20, logo: "/wow.png", name: "wow" },
  ];
  const iconsPerPage = 10;
  const totalIcons = icons.length;

  const startIndex = (currentPage - 1) * iconsPerPage;
  const endIndex = startIndex + iconsPerPage;

  const visibleIcons = icons.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === Math.ceil(totalIcons / iconsPerPage) ? 1 : prevPage + 1
    );
  };
  const navigate = useNavigate();

  const movePage = () => {
    navigate("/filter");
  };

  return (
    <div className="NavIcon-navbar">
      <div className="NavIcon-icon-container">
        {visibleIcons.map((icon, index) => (
          <div
            key={index}
            className={`NavIcon-icon-item ${
              activeIndex === icon.id ? "NavIcon-active" : ""
            }`}
            onClick={() => setActiveIndex(icon.id)}
            style={{ transitionDelay: `${index * 0.5}s` }}
          >
            <img src={icon.logo} alt={`${index}`} />
            <span>{icon.name}</span>
          </div>
        ))}
      </div>
      <button className="NavIcon-pagination-button" onClick={handleNextPage}>
        {">"}
      </button>
      <button className="NavIcon-filter" onClick={movePage}>
        <img src="/filter.png" className="NavIcon-filter-icon" /> Filter
      </button>
    </div>
  );
};

export default NavbarIcon;
