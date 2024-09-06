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
import FastFood from "./pages/FastFood";
import Rice from "./pages/Rice";
import Set from "./pages/Set";
import Value from "./pages/Value";
import Promotion from "./pages/Promotion";
import ChickenSet from "./pages/ChickenSet";
import Combo from "./pages/Combo";
import Chicken from "./pages/Chicken";
import Burger from "./pages/Burger";
import Product from "./pages/Product";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div style={{ width: '100%' }}>
      <ToastContainer
      autoClose={1000}


       />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bestSeller" element={<BestSeller />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/store" element={<Store />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/fastFood" element={<FastFood />} />
        <Route path="/rice" element={<Rice />} />
        <Route path="/set" element={<Set />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/chickenSet" element={<ChickenSet />} />
        <Route path="/combo" element={<Combo />} />
        <Route path="/value" element={<Value />} />
        <Route path="/chicken" element={<Chicken />} />
        <Route path="/burger" element={<Burger />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
