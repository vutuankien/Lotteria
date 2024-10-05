import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import SweetAlert2 from "react-sweetalert2";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assetss";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import PolicyFooter from "../components/Policy_Footer/PolicyFooter";

const NextStep = () => {
  const [method, setMethod] = useState("Cash");
  const {
    orders,
    currency,
    products,
    billAPI,
    setOrders,
    ordersAPI,
    navigate,
    sendEmail
  } = useContext(ShopContext);
  const [swalProps, setSwalProps] = useState({});
  const [bill, setBill] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (localUserInfo) {
      setUserInfo(localUserInfo);
      fetchUserAddress(localUserInfo.id); // Gọi hàm lấy địa chỉ sau khi có userInfo
    } else {
      // Nếu không có trong localStorage, lấy từ db.json
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/1`); // Giả định userId là 1
          setUserInfo(response.data);
          fetchUserAddress(response.data.id); // Lấy địa chỉ người dùng sau khi lấy thông tin
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, []);

  const fetchUserAddress = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/address?userId=${userId}`
      );
      const addresses = response.data;
      const defaultAddress = addresses.find((address) => address.isDefault);
      setUserAddress(defaultAddress || addresses[0] || null); // Lấy địa chỉ mặc định hoặc địa chỉ đầu tiên
    } catch (error) {
      console.error("Error fetching user address:", error);
    }
  };

  const handleClick = async () => {
    // Hiển thị thông báo thanh toán
    setSwalProps({
      show: true,
      icon: method === "Cash" ? "success" : "info",
    });

    // Copy Bill
    const updatedBills = [...bill];

    for (const order of orders) {
      const existingBillIndex = updatedBills.findIndex(
        (b) => b.orderId === order.id
      );

      if (existingBillIndex !== -1) {
        const existingProducts = updatedBills[existingBillIndex].products;
        order.products.forEach((newProduct) => {
          const existingProductIndex = existingProducts.findIndex(
            (p) => p.productId === newProduct.productId
          );
          if (existingProductIndex !== -1) {
            existingProducts[existingProductIndex].quantity +=
              newProduct.quantity;
            existingProducts[existingProductIndex].totalMoney +=
              newProduct.totalMoney;
          } else {
            existingProducts.push(newProduct);
          }
        });
        updatedBills[existingBillIndex].totalPrice += order.totalPrice;
      } else {
        const newBill = {
          orderId: order.id,
          userId: order.userId,
          products: order.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            totalMoney: product.totalMoney,
            price: product.price,
          })),
          totalPrice: order.totalPrice,
          time: order.time,
          status: order.status,
        };
        updatedBills.push(newBill);
      }
    }

    setBill(updatedBills);
    setOrders([]);
    try {
      const response = await axios.post(billAPI, updatedBills);
      console.log("Response:", response.data);

      const orderDeletePromises = orders.map((order) =>
        axios.delete(`${ordersAPI}/${order.id}`)
      );
      const deleteResponses = await Promise.all(orderDeletePromises);
      deleteResponses.forEach((res) =>
        console.log("Deleted Order Response:", res.data)
      );
    } catch (error) {
      console.error("Error:", error);
    }


    sendEmail()
  };

  return (
    <div style={{ marginTop: "480px" }}>
      <Container>
        <Row>
          <Col md={8} className="d-flex flex-column gap-4">
            {/* Phần chọn phương thức thanh toán */}
            <div className="d-flex align-items-center gap-2">
              <Icon.StarFill className="mb-3 mt-0 fs-2 text-danger" />
              <p className="fs-2 fw-bold">Phương thức thanh toán</p>
            </div>
            <div className="w-100 d-flex gap-4">
              <div
                className={`border d-flex flex-column align-items-center rounded-4 justify-content-center ${
                  method === "Cash" ? "border-danger border-3 shadow-lg" : ""
                }`}
                style={{ width: "20%", height: "100px", cursor: "pointer" }}
                onClick={() => {
                  setMethod("Cash");
                }}
              >
                <Icon.Cash className="fs-1 text-danger" />
                <p className="fs-5 fw-medium text-body-secondary">Tiền mặt</p>
              </div>
              <div
                className={`border d-flex flex-column align-items-center rounded-4 justify-content-center ${
                  method === "Card" ? "border-danger border-3 shadow-lg" : ""
                }`}
                style={{ width: "20%", height: "100px", cursor: "pointer" }}
                onClick={() => {
                  setMethod("Card");
                }}
              >
                <Icon.CardHeading className="fs-1 text-danger" />
                <p className="fs-5 fw-medium text-body-secondary">
                  Thanh toán thẻ
                </p>
              </div>
            </div>

            {/* Phần hóa đơn */}
            <div className="d-flex align-items-center gap-2 mb-0">
              <Icon.StarFill className="mb-3 mt-0 fs-2 text-danger" />
              <p className="fs-2 fw-bold">Hóa Đơn</p>
            </div>
            <div>
              {orders.map((order, orderIndex) => (
                <div key={orderIndex}>
                  {order.products.map((product, productIndex) => {
                    const matchingProduct = products.find(
                      (p) => p.id === product.productId
                    );
                    return (
                      <div
                        key={productIndex}
                        className="border mb-2 p-2 rounded-4 shadow border-3"
                      >
                        <div className="d-flex gap-3">
                          <div>
                            <img
                              src={matchingProduct.image}
                              width={"100px"}
                              height={"100px"}
                              alt="Money Icon"
                            />
                          </div>
                          <div>
                            <h4>{matchingProduct.name}</h4>
                            <p className="fs-5 mb-0 fw-medium text-dark-emphasis">
                              {matchingProduct.price}.000{currency}
                            </p>
                            <p className="fs-5 mb-0 fw-medium text-dark-emphasis">
                              x{product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Tổng tiền và nút thanh toán */}
            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#000",
                margin: "10px 0",
              }}
            />
            <div className="w-100 d-flex justify-content-between">
              <h2 className="text-danger">
                Tổng tiền:{" "}
                {orders.reduce((total, order) => total + order.totalPrice, 0)}
                .000{currency}
              </h2>
              <Button className="fs-5 fw-medium shadow" onClick={handleClick}>
                Thanh toán
              </Button>
              <SweetAlert2 {...swalProps} onConfirm={() => navigate("/")}>
                {method === "Cash" ? (
                  <div>
                    <p className="fs-3 text-black fw-bold">
                      Cảm ơn bạn đã đặt hàng
                    </p>
                    <p className="fs-5 text-black fw-bold">
                      Chúc bạn có một bữa ăn ngon miệng
                    </p>
                  </div>
                ) : (
                  <div>
                    <div>
                      <p className="fs-3 text-black fw-bold">
                        Quét mã QR để thanh toán
                      </p>
                      <p className="fs-5 text-black fw-bold">
                        Xin vui lòng cảm ơn!{" "}
                      </p>
                      <img src={assets.qrbank} width={200} />
                    </div>
                  </div>
                )}
              </SweetAlert2>
            </div>
          </Col>

          <Col md={4} className="border-start border-2">
            <div className="d-flex flex-column gap-2">
              {/* Hiển thị thông tin người dùng */}
              <h2 className="fs-5 fw-bold">Thông tin người dùng</h2>
              {userInfo && (
                <div className="border p-3 rounded-4 shadow-sm mb-3">
                  <p>Tên: {userInfo.fullName}</p>
                  <p>Email: {userInfo.email}</p>
                  <p>Điện thoại: {userInfo.phone}</p>
                </div>
              )}

              {/* Hiển thị địa chỉ người dùng */}
              <h2 className="fs-5 fw-bold">Địa chỉ giao hàng</h2>
              {userAddress ? (
                <div className="border p-3 rounded-4 shadow-sm mb-3">
                  <p>Tên địa chỉ: {userAddress.addressName}</p>
                  <p>Địa chỉ: {userAddress.address}</p>
                  <p>Ghi chú: {userAddress.note}</p>
                </div>
              ) : (
                <p className="text-danger">Chưa có địa chỉ giao hàng.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
      <PolicyFooter />
    </div>
  );
};

export default NextStep;
