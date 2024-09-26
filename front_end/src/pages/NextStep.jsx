import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SweetAlert2 from 'react-sweetalert2';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assetss';
import axios from 'axios';
import Footer from '../components/Footer/Footer';
import PolicyFooter from '../components/Policy_Footer/PolicyFooter';

const NextStep = () => {
  const [method, setMethod] = useState("Cash");
  const { orders, currency, products, billAPI, setOrders, ordersAPI, navigate, users,sendEmail } = useContext(ShopContext);
  const [swalProps, setSwalProps] = useState({});
  const [bill, setBill] = useState([])

  const handleClick = async () => {
    // Hiển thị thông báo thanh toán
    setSwalProps({
      show: true,
      icon: method === 'Cash' ? "success" : "info"
    });

    // Copy Bill
    const updatedBills = [...bill];

    // Lặp qua từng order để xử lý
    for (const order of orders) {
      const existingBillIndex = updatedBills.findIndex(b => b.orderId === order.id);

      if (existingBillIndex !== -1) {
        const existingProducts = updatedBills[existingBillIndex].products;
        order.products.forEach(newProduct => {

          const existingProductIndex = existingProducts.findIndex(p => p.productId === newProduct.productId);

          if (existingProductIndex !== -1) {

            existingProducts[existingProductIndex].quantity += newProduct.quantity;

            existingProducts[existingProductIndex].totalMoney += newProduct.totalMoney;
          } else {

            existingProducts.push(newProduct);
          }
        });


        updatedBills[existingBillIndex].totalPrice += order.totalPrice;
      } else {
        // Nếu không trùng billId, tạo bill mới
        const newBill = {
          orderId: order.id,
          userId: order.userId,
          products: order.products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            totalMoney: product.totalMoney,
            price: product.price
          })),
          totalPrice: order.totalPrice,
          time: order.time,
          status: order.status,
        };


        updatedBills.push(newBill);
      }
    }


    setBill(updatedBills);
    setOrders([])
    try {

      const response = await axios.post(billAPI, updatedBills);
      console.log("Response:", response.data);



      const orderDeletePromises = orders.map(order =>
        axios.delete(`${ordersAPI}/${order.id}`)
      );

      const deleteResponses = await Promise.all(orderDeletePromises);
      deleteResponses.forEach(res => console.log("Deleted Order Response:", res.data));
      
    } catch (error) {
      console.error("Error:", error);
    }


      // Hiển thị email
      sendEmail()
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <Row>
          <Col md={8} className='d-flex flex-column gap-4'>
            <div className='d-flex align-items-center gap-2'>
              <Icon.StarFill className='mb-3 mt-0 fs-2 text-danger' />
              <p className='fs-2 fw-bold'>Phương thức thanh toán</p>
            </div>

            <div className='w-100 d-flex gap-4'>
              <div
                className={`border d-flex flex-column align-items-center rounded-4 justify-content-center ${method === 'Cash' ? 'border-danger border-3 shadow-lg' : ''}`}
                style={{ width: '20%', height: '100px', cursor: 'pointer' }}
                onClick={() => { setMethod("Cash") }}
              >
                <Icon.Cash className='fs-1 text-danger' />
                <p className='fs-5 fw-medium text-body-secondary'>Tiền mặt</p>
              </div>
              <div
                className={`border d-flex flex-column  align-items-center  rounded-4 justify-content-center ${method === 'Card' ? 'border-danger border-3 shadow-lg' : ''}`}
                style={{ width: '20%', height: '100px', cursor: 'pointer' }}
                onClick={() => { setMethod("Card") }}
              >
                <Icon.CardHeading className='fs-1 text-danger' />
                <p className='fs-5 fw-medium text-body-secondary'>Thanh toán thẻ</p>
              </div>
            </div>

            <div className='d-flex align-items-center gap-2 mb-0'>
              <Icon.StarFill className='mb-3 mt-0 fs-2 text-danger' />
              <p className='fs-2 fw-bold'>Hóa Đơn</p>
            </div>

            <div>
              {orders.map((order, orderIndex) => (
                <div key={orderIndex}>
                  {order.products.map((product, productIndex) => {
                    // Tìm sản phẩm dựa trên productId
                    const matchingProduct = products.find(p => p.id === product.productId);

                    return (
                      <div key={productIndex} className='border mb-2 p-2 rounded-4 shadow border-3'>
                        <div className='d-flex gap-3'>
                          <div>
                            <img src={matchingProduct.image} width={'100px'} height={'100px'} alt="Money Icon" />
                          </div>
                          <div>
                            <h4>{matchingProduct.name}</h4>
                            <p className='fs-5 mb-0 fw-medium text-dark-emphasis'>
                              {matchingProduct.price}.000{currency}
                            </p>
                            <p className='fs-5 mb-0 fw-medium text-dark-emphasis'>x{product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  }

                </div>
              ))}
            </div>
            <hr style={{
              width: '100%',
              height: '1px',
              backgroundColor: '#000',
              margin: '10px 0'
            }} />
            <div className='w-100 d-flex justify-content-between'>
              <h2 className='text-danger'>
                Tổng tiền: {orders.reduce((total, order) => total + order.totalPrice, 0)}.000{currency}
              </h2>

              <Button className="fs-5 fw-medium shadow" onClick={handleClick}>
                Thanh toán
              </Button>
              <SweetAlert2 {...swalProps} onConfirm={() => navigate('/home')}>
                {method === "Cash" ? (
                  <div>
                    <p className='fs-3 text-black fw-bold'>Cảm ơn bạn đã đặt hàng</p>
                    <p className='fs-5 text-black fw-bold'>Chúc bạn có một bữa ăn ngon miệng</p>

                  </div>
                ) : (
                  <div>
                    <div>
                      <p className='fs-3 text-black fw-bold'>Quét mã QR để thanh toán</p>
                      <p className='fs-5 text-black fw-bold'>Xin vui lòng cảm ơn! </p>
                      <img src={assets.qrbank} width={200} />
                    </div>
                  </div>
                )}
              </SweetAlert2>
            </div>
          </Col>

          <Col md={4}>
            <div>
              <div className='d-flex align-items-center gap-2'>
                <Icon.StarFill className='mb-3 mt-0 fs-2 text-danger' />
                <p className='fs-2 fw-bold'>Giao hàng đến</p>
              </div>
              <div className='border p-3 rounded-4 shadow'>
                {users.map((user, index) => {
                  if (user.id === '1') {
                    return (
                      <div key={index}>
                        <p className='fs-5 fw-medium'>Tên: <span className='fs-4 fw-medium text-dark'>{user.name}</span></p>
                        <p className='fs-5 fw-medium'>Điện thoại: <span className='fs-4 fw-medium text-dark'>{user.phone}</span></p>
                        <p className='fs-5 fw-medium'>Địa chỉ: <span className='fs-4 fw-medium text-dark'>{user.address}</span></p>
                      </div>
                    )
                  }
                })}
                <hr style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#000',
                  margin: '10px 0'
                }} />
                <p className='text-center text-dark-emphasis'>Thời gian tiếp nhận đơn hàng trực tuyến từ 08:00 đến 21:30 hằng ngày</p>
              </div>

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