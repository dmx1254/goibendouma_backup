import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import {
  BackDrop,
  Footer,
  Navbar,
  ResetPassword,
  SideDrawer,
  Signin,
  Signup,
} from "./components";
import Loader from "./components/Loader";
import PaymentDescription from "./components/PaymentDescription";
import { BuySolde, Home, KamasExchange, Profil, SellKamas } from "./pages";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const [sideToggle, setSideToggle] = useState(false);
  const { loading } = useSelector((state) => state.servers);

  return (
    <div className="app">
      <div>
        <Navbar click={() => setSideToggle(!sideToggle)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell-kamas" element={<SellKamas />} />
          <Route path="/kamas-exchange" element={<KamasExchange />} />
          <Route path="/buy-solde" element={<BuySolde />} />
          <Route path="/profil" element={user.user ? <Profil /> : <Home />} />
          <Route path="/profil/:profilname" element={user.user ? <Profil /> : <Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/secure-payment" element={<PaymentDescription />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
