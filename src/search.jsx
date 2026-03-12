import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Home2 from "./home2.jsx";

function SearchPage() {
  const { state } = useLocation();

  const results = state?.results || [];
  const searchText = state?.searchText || "";

// SearchPage.js - Updated return
return (
  <>
    <Navbar />
    {/* Inline style-ah remove pannittu CSS file-la handle pannunga */}
    <div className="home-container">
      {results.length > 0 ? (
        results.map(item => (
          <Home2
            key={item.pv_id}
            image={item.image}
            type={`${item.category}`}
            bio={item.bio}
            sizes={item.sizes}
          />
        ))
      ) : (
        <h2 className="no-results">
          No products found for "{searchText}"
        </h2>
      )}
    </div>
  </>
);
}

export default SearchPage;
