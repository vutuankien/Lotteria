import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleLogout = () => {
    // Xử lý đăng xuất
    localStorage.removeItem("isLoggedIn");
    window.location.href = "http://localhost:5173/login"; // Điều hướng đến trang login
  };


  return (
    <header style={{ borderBottom: '1px solid #ccc', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/admin">
          <img
            src="https://www.lotteria.vn/grs-static/images/lotteria_logo.png"
            alt="Lotteria Logo"
            style={{ height: '50px' }}
          />
        </a>
        <button className="btn btn-danger ml-auto" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
