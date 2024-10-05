import React, { useState } from "react";
import "./Login.css";
import { signInWithGoogle, loginWithEmail } from "./Firebase";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();

  const adminEmail = "hongdang18092004@gmail.com"; // Email của admin

  // Xử lý đăng nhập bằng email và mật khẩu
  // Xử lý đăng nhập bằng email và mật khẩu
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      // Đăng nhập bình thường cho user hoặc admin
      const user = await loginWithEmail(email, password);

      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
        onLogin();

        // Nếu ở chế độ admin, chuyển hướng đến trang admin
        if (isAdminMode && email === adminEmail) {
          // Sử dụng window.location.href nếu bạn muốn điều hướng đến URL bên ngoài
          window.location.href = "http://localhost:5174/admin";
        } else {
          navigate("/"); // Điều hướng đến trang người dùng
        }
      }
    } catch (error) {
      console.error("Error logging in with email:", error);
    }
  };


  // Xử lý đăng nhập bằng Google
  // Xử lý đăng nhập bằng Google
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        // Nếu ở chế độ admin và email của tài khoản Google không phải của admin thì từ chối đăng nhập
        if (isAdminMode && user.email !== adminEmail) {
          alert("Bạn không có quyền truy cập vào chế độ admin.");
          return;
        }

        // Đăng nhập bình thường cho user hoặc admin
        localStorage.setItem("userInfo", JSON.stringify(user));
        onLogin();

        // Nếu ở chế độ admin, chuyển hướng đến trang admin
        if (isAdminMode && user.email === adminEmail) {
          window.location.href = "http://localhost:5174/admin"; // Chuyển đến trang admin
        } else {
          navigate("/"); // Điều hướng đến trang người dùng
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Đăng nhập bằng Google không thành công, vui lòng thử lại.");
    }
  };


  // Xử lý chuyển hướng đến trang quên mật khẩu
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Xử lý chuyển hướng đến trang tạo tài khoản mới
  const handleRegister = () => {
    navigate("/register");
  };

  // Xử lý chuyển chế độ giữa người dùng và admin
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-0">Đăng nhập</h2>

        <button className="toggle-mode-btn" onClick={toggleAdminMode}>
          {isAdminMode ? "Admin" : "User"}
        </button>

        <form onSubmit={handleEmailLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="action-buttons">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="action-btn"
            >
              Quên mật khẩu?
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="action-btn"
            >
              Tạo tài khoản
            </button>
          </div>
          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
        </form>
        <p className="text-1">hoặc Đăng nhập bằng</p>
        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleSignIn}>
            GOOGLE
          </button>
        </div>
      </div>
      <div className="banner-img">
        <img
          src="https://th.bing.com/th/id/R.939539618b114aae1546c478ee95cd70?rik=G09qZmQz9iucDQ&pid=ImgRaw&r=0"
          alt="banner"
        />
      </div>
    </div>
  );
}

export default Login;
