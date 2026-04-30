import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { useState, useEffect } from "react";

/* Static images for the 4 main categories */
import shirtImg from "./assets/shirt.jpg";
import phantImg from "./assets/phantjpg.webp";
import tshirtImg from "./assets/tshirt.jpg";
import innerImg from "./assets/inner.jpg";

/* ── Master list of all collections ── */
const ALL_COLLECTIONS = [
  {
    key: "Shirt",
    label: "SHIRTS",
    image: shirtImg,
    path: "shirts",
    description: "Premium formal & casual shirts",
  },
  {
    key: "Pant",
    label: "PANTS",
    image: phantImg,
    path: "pants",
    description: "Tailored trousers & casual pants",
  },
  {
    key: "Tshirt",
    label: "T-SHIRTS",
    image: tshirtImg,
    path: "tshirts",
    description: "Round-neck, V-neck & polo tees",
  },
  {
    key: "Innerwear",
    label: "INNERWEAR",
    image: innerImg,
    path: "innerwear",
    description: "Vests, briefs & trunks",
  },
];

function ShopCollections() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);




  useEffect(() => {
    loadShopName();
    loadProducts();
  }, [shopId]);




  const loadProducts = async () => {
    try {
      // 🔍 Removed '/api' prefix to match backend routes
      const res = await axios.get(`https://menswear-backend-production.up.railway.app/getAvailableStock/${shopId}`);
      if (res.data.success) {
        // 🔍 Inject shopId into each product so search results carry the correct shop context
        const productsWithShopId = res.data.data.map(p => ({ ...p, shopId }));
        setProducts(productsWithShopId);
      }
    } catch (error) {
      console.error("Error loading products for search:", error);
    }
  };

  // 🔍 SUGGESTIONS LOGIC
  useEffect(() => {
    if (search.trim().length > 0) {
      const filtered = filterProducts(search);
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search, products]);

  const filterProducts = (value) => {
    const text = value.toLowerCase().trim();
    if (!text) return [];

    // Split search into keywords to handle multi-word searches (e.g., "blue shirt")
    const keywords = text.split(/\s+/);

    return products.filter(item => {
      const p = (item.product || "").toLowerCase();
      const c = (item.category || "").toLowerCase();
      const v = (item.variety || "").toLowerCase();
      const cl = (item.color || "").toLowerCase();
      const b = (item.bio || "").toLowerCase();
      const s = (item.sizes || []).map(sz => sz.size.toLowerCase()).join(" ");

      const combinedData = `${p} ${c} ${v} ${cl} ${b} ${s}`;

      // All keywords must be present in the product's combined data
      return keywords.every(kw => combinedData.includes(kw));
    });
  };

  const handleSearchClick = () => {
    if (!search.trim()) return;
    const filtered = filterProducts(search);
    navigate("/search", {
      state: { results: filtered, searchText: search },
    });
  };

  const handleSuggestionClick = (item) => {
    navigate("/search", {
      state: { results: [item], searchText: `${item.category} ${item.product}` },
    });
  };

  const loadShopName = async () => {
    try {
      // Use existing /api/shops endpoint and find our shop
      const res = await axios.get("https://menswear-backend-production.up.railway.app/api/shops");
      const shop = res.data.find((s) => String(s.si_id) === String(shopId));
      if (shop) setShopName(shop.shopname);
    } catch (error) {
      console.error("Error loading shop name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔍 IN-PAGE SEARCH BAR (RIGHT ALIGNED - JUST BELOW NAVBAR) */}
      <div className="collection-page">
        <div className="collection-search-container" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px 4% 0 4%',
          position: 'relative',
          zIndex: 100
        }}>
          <div className="zen-search" style={{
            width: '100%',
            maxWidth: '350px',
            border: '2px solid #e2e8f0',
            padding: '5px 15px',
            height: '45px',
            borderRadius: '12px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
              type="text"
              placeholder={`Search in ${shopName || 'this shop'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search.trim() && setShowSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
              style={{
                height: '100%',
                fontSize: '0.9rem',
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent'
              }}
            />
            <GoSearch
              className="zen-search-icon"
              onClick={handleSearchClick}
              style={{ fontSize: '1.2rem' }}
            />

            {/* 🔥 SUGGESTIONS BOX */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="search-suggestions-box" style={{
                left: '0',
                right: '0',
                marginTop: '10px'
              }}>
                {filteredSuggestions.map((item) => (
                  <div
                    key={item.pv_id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    <img src={item.image} alt={item.product} className="suggestion-img" />
                    <div className="suggestion-info">
                      <span className="suggestion-name">{item.category} {item.product}</span>
                      <span className="suggestion-cat">{item.color} • {item.variety}</span>
                    </div>
                  </div>
                ))}
                <div className="suggestion-view-all" onClick={handleSearchClick}>
                  View all results for "{search}"
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="collection-header">
          <span className="collection-subtitle">
            {shopName ? shopName.toUpperCase() : "SHOP"}
          </span>
          <h1>Our Collections</h1>
          <p>
            Browse the exclusive collections available
            {shopName ? ` at ${shopName}` : ""}. Select a category to explore
            premium products.
          </p>


        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#94a3b8",
              fontSize: "1.1rem",
            }}
          >
            Loading collections...
          </div>
        ) : (
          <div className="collection-grid">
            {ALL_COLLECTIONS.map((col) => (
              <div
                key={col.key}
                className="card"
                onClick={() => navigate(`/shop/${shopId}/${col.path}`)}
              >
                <img src={col.image} alt={col.label} />
                <p>{col.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ShopCollections;
