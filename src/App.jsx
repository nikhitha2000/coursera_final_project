import '@mantine/core/styles.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Menus from "./pages/Menus";
import Reservations from "./pages/Reservations";
import Orderonline from "./pages/Orderonline";
import Account from "./pages/Account";
import SpecialOffers from "./pages/SpecialOffers";
import Joinmember from "./pages/Joinmember";
import Reviews from "./pages/Reviews";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menus" element={<Menus />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="order-online" element={<Orderonline />} />
          <Route path="account" element={<Account />} />
          <Route path="special-offers" element={<SpecialOffers />} />
          <Route path="join-member" element={<Joinmember />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
  );
}

export default App;
