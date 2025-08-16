import React,{useState} from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [tempSearchQuery, setTempSearchQuery] = useState("");

  const searchHandler = () => {
    console.log('button clicked')
    onSearch(tempSearchQuery);
  };
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Comments Dashboard</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={tempSearchQuery}
          onChange={(e) => setTempSearchQuery(e.target.value)}
          className="search-input"
          
        />
        <button onClick={searchHandler} className="search-button">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
