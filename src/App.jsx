import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import SearchPage from "./search.jsx";

/* MULTI-SHOP ROUTES */
import ShopSelect from "./shopselect.jsx";
import ShopCollections from "./ShopCollections.jsx";

/* CATEGORY LIST PAGES */
import Shirtcollection from "./shirtcollection.jsx";
import Phantcollection from "./phantcollection.jsx";
import Tshirtcollection from "./tshirtcollection.jsx";
import Innercollectionlist from "./innercollection.jsx";

/* SHIRT SUB-CATEGORIES */
import Plaincollection from "./plaincollection.jsx";
import Checkedcollection from "./checkedcollection.jsx";
import Stripescollection from "./stripes.jsx";
import Printedcollection from "./printed.jsx";

/* PANT SUB-CATEGORIES */
import FormalPantCollection from "./formalphant.jsx";
import LinenPantCollection from "./linenpant.jsx";
import CargoPantCollection from "./cargopant.jsx";
import TrackPantCollection from "./trackpant.jsx";

/* TSHIRT SUB-CATEGORIES */
import Polotshirtcollection from "./polotshirt.jsx";
import RoundNeckTshirtCollection from "./roundnecktshirt.jsx";
import VNeckTshirtCollection from "./vnecktshirt.jsx";
import DropShoulderTshirtCollection from "./droptshirt.jsx";

/* INNERWEAR SUB-CATEGORIES */
import Sleevelessvestcollection from "./sleevelessvest.jsx";
import VestCollection from "./vest.jsx";
import BriefsCollection from "./briefs.jsx";
import TrunksCollection from "./trunks.jsx";

import Buy from "./buy.jsx";
import Pay from "./pay.jsx";
import Likepage from "./likepage.jsx";
import Cartpage from "./cartpage.jsx";
import CustomerOrders from "./customerorders.jsx";

/* AUTH */
import Login from "./admin/login.jsx";
import ShopRegister from "./admin/shopregister.jsx";
import Forgetpassword from "./admin/forgetpassword.jsx";
import Forgetpassword2 from "./admin/forgetpassword2.jsx";

/* ADMIN */
import Adminhomepage from "./admin/adminhomepage.jsx";
import Todayorder from "./admin/todayorder.jsx";
import Delivered from "./admin/deliveredpage.jsx";
import Dashboard from "./admin/earning.jsx";
import Availablestock from "./admin/availablestock.jsx";
import Uploadstock from "./admin/upstock.jsx";

import ScrollToTop from "./ScrollToTop.jsx";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>

            {/* SEARCH */}
            <Route path="/search" element={<SearchPage />} />

            {/* ── SHOP SELECT (LANDING) ── */}
            <Route path="/" element={<ShopSelect />} />

            {/* ── SHOP COLLECTIONS (after selecting a shop) ── */}
            <Route path="/shop/:shopId/collections" element={<ShopCollections />} />

            {/* ── CATEGORY LIST PAGES (shop-scoped) ── */}
            <Route path="/shop/:shopId/shirts" element={<Shirtcollection />} />
            <Route path="/shop/:shopId/pants" element={<Phantcollection />} />
            <Route path="/shop/:shopId/tshirts" element={<Tshirtcollection />} />
            <Route path="/shop/:shopId/innerwear" element={<Innercollectionlist />} />

            {/* ── SHIRT SUB-CATEGORIES (shop-scoped) ── */}
            <Route path="/shop/:shopId/plainshirt" element={<Plaincollection />} />
            <Route path="/shop/:shopId/checkedshirt" element={<Checkedcollection />} />
            <Route path="/shop/:shopId/printedshirt" element={<Printedcollection />} />
            <Route path="/shop/:shopId/stripesshirt" element={<Stripescollection />} />

            {/* ── PANT SUB-CATEGORIES (shop-scoped) ── */}
            <Route path="/shop/:shopId/formalpant" element={<FormalPantCollection />} />
            <Route path="/shop/:shopId/linenpant" element={<LinenPantCollection />} />
            <Route path="/shop/:shopId/cargopant" element={<CargoPantCollection />} />
            <Route path="/shop/:shopId/trackpant" element={<TrackPantCollection />} />

            {/* ── TSHIRT SUB-CATEGORIES (shop-scoped) ── */}
            <Route path="/shop/:shopId/polotshirt" element={<Polotshirtcollection />} />
            <Route path="/shop/:shopId/roundnecktshirt" element={<RoundNeckTshirtCollection />} />
            <Route path="/shop/:shopId/vnecktshirt" element={<VNeckTshirtCollection />} />
            <Route path="/shop/:shopId/dropshouldertshirt" element={<DropShoulderTshirtCollection />} />

            {/* ── INNERWEAR SUB-CATEGORIES (shop-scoped) ── */}
            <Route path="/shop/:shopId/sleevelessvest" element={<Sleevelessvestcollection />} />
            <Route path="/shop/:shopId/vest" element={<VestCollection />} />
            <Route path="/shop/:shopId/briefs" element={<BriefsCollection />} />
            <Route path="/shop/:shopId/trunks" element={<TrunksCollection />} />

            {/* ── PURCHASE FLOW ── */}
            <Route path="/buy" element={<Buy />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/cartpage" element={<Cartpage />} />
            <Route path="/likepage" element={<Likepage />} />
            <Route path="/orders" element={<CustomerOrders />} />

            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/shopregister" element={<ShopRegister />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/forgetpassword2" element={<Forgetpassword2 />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/home" element={<Adminhomepage />} />
            <Route path="/admin/todayorder" element={<Todayorder />} />
            <Route path="/admin/delivered" element={<Delivered />} />
            <Route path="/admin/earning" element={<Dashboard />} />
            <Route path="/admin/available" element={<Availablestock />} />
            <Route path="/admin/upload" element={<Uploadstock />} />

          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;