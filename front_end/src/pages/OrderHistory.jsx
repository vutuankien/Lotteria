import React, { useState, useEffect } from "react";
import AccountPage from "./AccountPage";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {}; // Lấy thông tin người dùng

  // Fetch orders from db.json (mock API)
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:5000/Bills`); // Lấy tất cả đơn hàng
      const data = await response.json();

      // Chuyển đổi dữ liệu thành mảng và trích xuất thông tin của người dùng
      const userOrders = Object.values(data)
        .filter((order) => order.userId === userInfo.id && order.status === 'Shipped') // Lọc theo userId và status 'shipped'
        .map((order) => ({
          id: order.id,
          orderId: order.orderId,
          total: order.totalPrice,
          status: order.status,
          time: order.time,
          products: order.products,
        }));

      setOrders(userOrders);
    };

    if (userInfo.id) {
      fetchOrders();
    }
  }, [userInfo.id]);

  return (
    <AccountPage>
      <div className="order-history-wrapper">
        <div className="order-history">
          <div className="box-title">
            <h2 className="title">Lịch Sử Đặt Hàng</h2>
          </div>

          <div className="order-list">
            {orders.length === 0 ? (
              <p>Bạn chưa đặt hàng.</p>
            ) : (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    <div className="order-details">
                      <p>
                        <strong>Order #{order.orderId}</strong>
                      </p>
                      <p>Status: {order.status}</p>
                      <p>Total: {order.total}.000 VNĐ</p>
                      <p>Time: {order.time}</p>{" "}
                    </div>
                    <div className="product-list">
                      <h4>Sản phẩm:</h4>
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index}>
                            Product ID: {product.productId}, Quantity:{" "}
                            {product.quantity}, Price: {product.price}.000 VNĐ
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AccountPage>
  );
};

export default OrderHistory;
