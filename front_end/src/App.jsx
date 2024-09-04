import React from "react"
import Home from "./pages/Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import { assets } from "./assets/assetss";
import NavBar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Discount from "./pages/Discount";
import Store from "./pages/Store";
import Footer from "./components/Footer/Footer";
import BestSeller from "./pages/BestSeller";
import Drink from "./pages/Drink";
function App() {
  return (
    <div style={{width:'100%'}}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bestSeller" element={<BestSeller />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/store" element={<Store />} />
        <Route path="/drink" element={<Drink />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
