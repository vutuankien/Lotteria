import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Col, Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Footer from "../components/Footer/Footer";
import PolicyFooter from "../components/Policy_Footer/PolicyFooter";
import RelatedProduct from "../components/RelatedProduct/RelatedProduct";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";

const Cart = () => {
  const {
    ordersAPI,
    orders,
    products,
    currency,
    navigate,
    getQuantity,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useContext(ShopContext);

  const [services, setServices] = useState([
    {
      title: "Lấy dụng cụ ăn uống",
      price: 3,
      state: true,
    },
    {
      title: "Lấy tương cà",
      price: 5,
      state: true,
    },
    {
      title: "Lấy tương ớt",
      price: 7,
      state: true,
    },
  ]);
  // State to store price
  const [subtotal, setSubtotal] = useState(0); // Subtotal for orders
  const [serviceCost, setServiceCost] = useState(0); // Cost of selected services
  const [totalPrice, setTotalPrice] = useState(0); // Total cost (subtotal + services)

  useEffect(() => {
    // Calculate subtotal for all products in orders
    const newSubtotal = orders.reduce((acc, currOrder) => {
      // Sum up the price of each product in the order
      const orderTotal = currOrder.products.reduce((sum, product) => {
        const productDetails = products.find((p) => p.id === product.productId); // Find product details by productId
        return (
          sum + (productDetails ? productDetails.price * product.quantity : 0)
        );
      }, 0);
      return acc + orderTotal;
    }, 0);

    // Set subtotal state
    setSubtotal(newSubtotal.toFixed(3));

    // Calculate service cost
    const newServiceCost = services
      .filter((service) => service.state)
      .reduce((acc, curr) => acc + curr.price, 0);
    setServiceCost(newServiceCost.toFixed(3));

    // Calculate total price (subtotal + services)
    const totalBill = parseFloat(newServiceCost) + parseFloat(newSubtotal);
    setTotalPrice(totalBill.toFixed(3));

    // Prepare updated order data to send to server
    const updatedOrderData = orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      products: order.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        totalMoney: product.price * product.quantity,
      })),
      totalPrice:
        order.products.reduce((sum, product) => {
          const productDetails = products.find(
            (p) => p.id === product.productId
          );
          return (
            sum + (productDetails ? productDetails.price * product.quantity : 0)
          );
        }, 0) + newServiceCost, // Include the service cost in total price
      time: order.time,
      status: order.status,
    }));

    // Send updated data to server via axios (PUT request)
    const updateOrdersOnServer = async () => {
      try {
        await Promise.all(
          updatedOrderData.map((order) =>
            axios.put(`${ordersAPI}/${order.id}`, order)
          )
        );
        console.log("Orders updated successfully");
      } catch (error) {
        console.error("Error updating orders:", error);
      }
    };

    updateOrdersOnServer();
  }, [orders, services, products]);

  const handleChange = (index) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, state: !service.state } : service
    );
    setServices(updatedServices);
  };

  return (
    <div style={{ marginTop: "500px", paddingTop: "640px" }}>
      <Container>
        {/*Render products*/}
        <Row className="d-flex justify-content-between flex-sm-row flex-column">
          <Col md={8} sm={12}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-4">
                <hr />
                <h1 className="fs-2 text-danger">
                  Giỏ hàng của bạn{" "}
                  <span className="fs-4 text-black d-none d-sm-inline-block">
                    ({getQuantity()} sản phẩm)
                  </span>
                </h1>
                <hr />
              </div>
              <div>
                <button
                  onClick={() => navigate("/bestSeller")}
                  className="px-3 py-2 border rounded-5 shadow d-none d-sm-block"
                >
                  <Icon.Plus /> Thêm sản phẩm
                </button>
              </div>
            </div>
            <div>
              {orders.length > 0 ? (
                <div>
                  {orders.map((order, orderIndex) => (
                    <div key={orderIndex} className="mt-4">
                      {order.products.length > 0 ? (
                        order.products.map((product, productIndex) => {
                          // Tìm sản phẩm dựa trên productId
                          const matchingProduct = products.find(
                            (p) => p.id === product.productId
                          );

                          return (
                            <div
                              key={productIndex}
                              className="mt-3 d-flex align-items-start align-items-sm-center justify-content-between px-3 flex-sm-row flex-column"
                            >
                              <div className="d-flex gap-3">
                                <div>
                                  {/* Hiển thị ảnh tiền nếu tìm thấy sản phẩm trùng id */}
                                  {matchingProduct ? (
                                    <img
                                      src={matchingProduct.image}
                                      width={"100px"}
                                      height={"100px"}
                                      alt="Money Icon"
                                    />
                                  ) : (
                                    <img
                                      src={product.image}
                                      width={"120px"}
                                      height={"100px"}
                                      alt={product.name}
                                    />
                                  )}
                                </div>
                                <div>
                                  <h4>{product.name}</h4>
                                  <p className="fs-5 fw-bold">
                                    {matchingProduct
                                      ? matchingProduct.price
                                      : product.price}
                                    .000{currency}
                                  </p>
                                  <p>
                                    Thời gian đặt:
                                    <span className="fw-bold">
                                      {order.time}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center gap-3">
                                <div className="d-flex align-items-center gap-1">
                                  <button
                                    className="p-2 bg-danger rounded-1 text-light"
                                    onClick={() =>
                                      decreaseQuantity(
                                        order.id,
                                        product.productId
                                      )
                                    }
                                  >
                                    <Icon.Dash />
                                  </button>
                                  <p className="px-3 fs-4 mb-0 bg-danger-subtle rounded-1 text-black">
                                    {product.quantity}
                                  </p>
                                  <button
                                    className="p-2 bg-danger rounded-1 text-light"
                                    onClick={() =>
                                      increaseQuantity(
                                        order.id,
                                        product.productId
                                      )
                                    }
                                  >
                                    <Icon.Plus />
                                  </button>
                                </div>
                                <div
                                  onClick={() => {
                                    removeFromCart(order.id, product.productId);
                                    toast.info("Deleted Order Successfully!");
                                  }}
                                >
                                  <Icon.Trash
                                    className="fs-3 text-danger"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>Không có sản phẩm trong đơn hàng này</p>
                      )}
                      <hr
                        style={{
                          width: "100%",
                          height: "1px",
                          backgroundColor: "#000",
                          margin: "10px 0",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center gap-4 mt-5 flex-column align-items-center">
                  <Icon.BagXFill
                    className="text-danger"
                    style={{ fontSize: "100px" }}
                  ></Icon.BagXFill>
                  <p className="fs-2 fw-bold">
                    Không có sản phẩm trong giỏ hàng
                  </p>
                  <p className="fs-3 fw-bold">Vui lòng chọn đồ ăn của bạn</p>
                </div>
              )}
            </div>
          </Col>
          {/* Render bill */}
          <Col md={4} sm={12} className="ps-3">
            <div className="d-flex align-items-center  gap-4">
              <hr />
              <h1 className="fs-2 text-danger">Tổng tiền</h1>
              <hr />
            </div>
            <div className="my-2 border p-2 rounded-2 shadow">
              <div>
                <p className="fs-4 fw-bold d-flex align-items-center gap-2 border-bottom py-2">
                  <Icon.StarFill></Icon.StarFill>Tùy chọn
                </p>
                <div>
                  {services.map((item, index) => (
                    <div
                      className="d-flex justify-content-between "
                      key={index}
                    >
                      <p className="fs-6 text-black fw-bold">
                        {item.title}
                        <span className="text-danger">
                          ({item.price}.000{currency})
                        </span>
                      </p>
                      <div>
                        <BootstrapSwitchButton
                          onChange={() => handleChange(index)}
                          checked={item.state}
                          size="sm"
                          onlabel="Get"
                          offlabel="No"
                          onstyle="danger"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border p-2 mt-4 rounded-3 shadow">
              <p className="fs-4 fw-bold d-flex align-items-center gap-2 border-bottom py-2">
                <Icon.StarFill></Icon.StarFill>Đơn giá
              </p>
              <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center border-bottom">
                  <p className="text-black fw-bold fs-5">Tạm tính</p>
                  <p className="fs-5 text-danger fw-bold">
                    {subtotal}
                    {currency}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom">
                  <p className="text-black fw-bold fs-5">Dịch vụ</p>
                  <p className="fs-5 text-danger fw-bold">
                    {serviceCost}
                    {currency}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom">
                  <p className="text-black fw-bold fs-5">Tổng tiền</p>
                  <p className="fs-5 text-danger fw-bold">
                    {totalPrice}
                    {currency}
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      if (orders.length > 0) {
                        toast.info("Chọn sản phẩm thành công");
                        navigate("/next_step");
                      } else {
                        toast.error("Vui lòng chọn đồ ăn của bạn");
                      }
                    }}
                    className="btn btn-danger px-4 py-2 rounded-5 shadow w-100"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <RelatedProduct category={"BestSeller"} />
      </Container>

      <Footer />
      <PolicyFooter />
    </div>
  );
};

export default Cart;
