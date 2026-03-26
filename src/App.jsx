import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import SearchPage from "./search.jsx";

/* USER PAGES */
import Collectionlist from "./Collectionlist.jsx";
import Shirtcollection from "./shirtcollection.jsx";
import Plaincollection from "./plaincollection.jsx";
import Checkedcollection from "./checkedcollection.jsx";
import Stripescollection from "./stripes.jsx";
import Printedcollection from "./printed.jsx";

import Phantcollection from "./phantcollection.jsx";
import FormalPantCollection from "./formalphant.jsx";
import LinenPantCollection from "./linenpant.jsx";
import CargoPantCollection from "./cargopant.jsx";
import TrackPantCollection from "./trackpant.jsx";

import Tshirtcollection from "./tshirtcollection.jsx";
import Polotshirtcollection from "./polotshirt.jsx";
import RoundNeckTshirtCollection from "./roundnecktshirt.jsx";
import VNeckTshirtCollection from "./vnecktshirt.jsx";
import DropShoulderTshirtCollection from "./droptshirt.jsx";

import Innercollectionlist from "./innercollection.jsx";
import Sleevelessvestcollection from "./sleevelessvest.jsx";
import VestCollection from "./vest.jsx";
import BriefsCollection from "./briefs.jsx";
import TrunksCollection from "./trunks.jsx";

import Buy from "./buy.jsx";
import Pay from "./pay.jsx";
import Likepage from "./likepage.jsx";
import Cartpage from "./cartpage.jsx";

/* AUTH */
import Login from "./admin/login.jsx";
import Signup from "./admin/signup.jsx";
import Forgetpassword from "./admin/forgetpassword.jsx";
import Forgetpassword2 from "./admin/forgetpassword2.jsx";

/* ADMIN */
import Adminhomepage from "./admin/adminhomepage.jsx";
import Todayorder from "./admin/todayorder.jsx";
import Delivered from "./admin/deliveredpage.jsx";
import Dashboard from "./admin/earning.jsx";
import Availablestock from "./admin/availablestock.jsx";
import Uploadstock from "./admin/upstock.jsx";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Routes>

            {/* SEARCH */}
            <Route path="/search" element={<SearchPage />} />

            {/* USER ROUTES */}
            <Route path="/" element={<Collectionlist />} />
            <Route path="/shirts" element={<Shirtcollection />} />
            <Route path="/phant" element={<Phantcollection />} />
            <Route path="/tshirt" element={<Tshirtcollection />} />
            <Route path="/inner" element={<Innercollectionlist />} />

            <Route path="/plainshirt" element={<Plaincollection />} />
            <Route path="/checkedshirt" element={<Checkedcollection />} />
            <Route path="/printedshirt" element={<Printedcollection />} />
            <Route path="/stripesshirt" element={<Stripescollection />} />

            <Route path="/formalpant" element={<FormalPantCollection />} />
            <Route path="/linenpant" element={<LinenPantCollection />} />
            <Route path="/cargopant" element={<CargoPantCollection />} />
            <Route path="/trackpant" element={<TrackPantCollection />} />

            <Route path="/polotshirt" element={<Polotshirtcollection />} />
            <Route path="/roundnecktshirt" element={<RoundNeckTshirtCollection />} />
            <Route path="/vnecktshirt" element={<VNeckTshirtCollection />} />
            <Route path="/dropshouldertshirt" element={<DropShoulderTshirtCollection />} />

            <Route path="/sleevelessvest" element={<Sleevelessvestcollection />} />
            <Route path="/vest" element={<VestCollection />} />
            <Route path="/briefs" element={<BriefsCollection />} />
            <Route path="/trunks" element={<TrunksCollection />} />

            <Route path="/buy" element={<Buy />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/cartpage" element={<Cartpage />} />
            <Route path="/likepage" element={<Likepage />} />

            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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