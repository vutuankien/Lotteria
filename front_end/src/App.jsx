import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Discount from "./pages/Discount";
import Parent from "./pages/Parent"
import Store from "./pages/Store";
import BrandStory from "./pages/BrandStory";
import Franchise from "./pages/Fran";
import Care from "./pages/Care";
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
import Login from "./pages/Login";
import Burger from "./pages/Burger";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Searchbar from "./components/SearchBar/Searchbar";
import NextStep from "./pages/NextStep";
import DiscountDetail from "./pages/DiscountDetail";
import AccountInfo from "./pages/AccountInfo";
import ShippingAddress from "./pages/ShippingAddress";
import OrderHistory from "./pages/OrderHistory";
import Feedback from "./pages/Feedback";
import ForgotPassword from "./pages/Forgotpassword";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Trạng thái kiểm tra đăng nhập
  const location = useLocation();

  // Kiểm tra trạng thái đăng nhập từ localStorage khi khởi chạy ứng dụng
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
    setIsCheckingAuth(false); // Sau khi kiểm tra xong
  }, []);

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập vào localStorage
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập khỏi localStorage
  };

  // Nếu đang kiểm tra trạng thái đăng nhập, hiển thị màn hình chờ
  if (isCheckingAuth) {
    return <div>Loading...</div>; // Bạn có thể thay thế bằng một giao diện chờ hoặc spinner
  }

  return (
    <div style={{ width: "100%" }}>
      <ToastContainer autoClose={1000} />
      {/* Hiển thị NavBar và Searchbar chỉ khi đã đăng nhập */}
      {isLoggedIn && location.pathname !== "/login" && (
        <>
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Searchbar />
        </>
      )}

      <Routes>
        {/* Kiểm tra trạng thái đăng nhập */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Parent" element={<Parent />} />
        <Route path="/Store"element={<Store />}/>
        <Route path="/Fran"element={<Franchise />}/>
        <Route path="/BrandStory"element={<BrandStory />}/>
        <Route path="/Care" element={<Care />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/bestSeller"
          element={isLoggedIn ? <BestSeller /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:productId"
          element={isLoggedIn ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/discount"
          element={isLoggedIn ? <Discount /> : <Navigate to="/login" />}
        />
        <Route
          path="/discount/:blogId"
          element={isLoggedIn ? <DiscountDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/store"
          element={isLoggedIn ? <Store /> : <Navigate to="/login" />}
        />
        <Route
          path="/drink"
          element={isLoggedIn ? <Drink /> : <Navigate to="/login" />}
        />
        <Route
          path="/fastFood"
          element={isLoggedIn ? <FastFood /> : <Navigate to="/login" />}
        />
        <Route
          path="/rice"
          element={isLoggedIn ? <Rice /> : <Navigate to="/login" />}
        />
        <Route
          path="/set"
          element={isLoggedIn ? <Set /> : <Navigate to="/login" />}
        />
        <Route
          path="/promotion"
          element={isLoggedIn ? <Promotion /> : <Navigate to="/login" />}
        />
        <Route
          path="/chickenSet"
          element={isLoggedIn ? <ChickenSet /> : <Navigate to="/login" />}
        />
        <Route
          path="/combo"
          element={isLoggedIn ? <Combo /> : <Navigate to="/login" />}
        />
        <Route
          path="/value"
          element={isLoggedIn ? <Value /> : <Navigate to="/login" />}
        />
        <Route
          path="/chicken"
          element={isLoggedIn ? <Chicken /> : <Navigate to="/login" />}
        />
        <Route
          path="/burger"
          element={isLoggedIn ? <Burger /> : <Navigate to="/login" />}
        />
        <Route
          path="/next_step"
          element={isLoggedIn ? <NextStep /> : <Navigate to="/login" />}
        />

        {/* Trang login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Các trang Account và chức năng khác */}
        <Route
          path="/accountInfo"
          element={isLoggedIn ? <AccountInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/shippingAddress"
          element={isLoggedIn ? <ShippingAddress /> : <Navigate to="/login" />}
        />
        <Route
          path="/orderHistory"
          element={isLoggedIn ? <OrderHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedback"
          element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
