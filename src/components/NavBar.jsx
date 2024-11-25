import { useState } from "react";
import "../assets/css/navbar.css";

const NavBar = ({
  setOpen,
  notes,
  sortBy,
  onSort,
  palette,
  changePalette,
  currentPalette,
  setCurrentPalette,
  palettes,
}) => {
  const [onPalette, setOnPalette] = useState(false);

  const handlePalette = (item) => {
    setCurrentPalette(item);
    changePalette(item);
    setOnPalette(false);
  };

  return (
    <div
    className={`navbar ${currentPalette?.name || palette?.name || ""}`}
    >
      <div className="nav-wrapper container">
        <span className="logo">Notes ({notes.length})</span>
        <div className="nav-options">
          <div className="select">
            <select value={sortBy} onChange={onSort}>
              <option value="">Sort</option>
              <option value="latest">Sort based on latest note</option>
              <option value="earliest">Sort based on earliest note</option>
            </select>
          </div>
          <div className="nav-icon">
            <div className={`palettes ${onPalette && "active"}`}>
              {palettes.map((palette) => (
                <div
                  onClick={() => handlePalette(palette)}
                  className={`palette-item ${
                    currentPalette?.id === palette?.id && "active"
                  }`}
                  key={palette.id}
                  style={{ backgroundColor: `${palette?.color}` }}
                ></div>
              ))}
            </div>

            <i
              onClick={() => setOnPalette((prev) => !prev)}
              className="fa-solid fa-circle-half-stroke"
            ></i>
          </div>
          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
