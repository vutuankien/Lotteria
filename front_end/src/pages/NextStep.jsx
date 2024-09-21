import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SweetAlert2 from 'react-sweetalert2';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assetss';

const NextStep = () => {
  const [method, setMethod] = useState("");
  const { orders, currency, products } = useContext(ShopContext);
  const [swalProps, setSwalProps] = useState({});
  function handleClick() {
    setSwalProps({
      show: true,
      icon:method === 'Cash' ? "success": "info"
    });
  }
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
                className={`border d-flex flex-column align-items-center rounded-4 justify-content-center ${method === 'Cash' ? 'border-danger border-3' : ''}`}
                style={{ width: '20%', height: '100px', cursor: 'pointer' }}
                onClick={() => { setMethod("Cash") }}
              >
                <Icon.Cash className='fs-1 text-danger' />
                <p className='fs-4 fw-medium text-body-secondary'>Tiền mặt</p>
              </div>
              <div
                className={`border d-flex flex-column align-items-center rounded-4 justify-content-center ${method === 'Card' ? 'border-danger border-3' : ''}`}
                style={{ width: '20%', height: '100px', cursor: 'pointer' }}
                onClick={() => { setMethod("Card") }}
              >
                <Icon.CardHeading className='fs-1 text-danger' />
                <p className='fs-4 fw-medium text-body-secondary'>Thẻ tín dụng</p>
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
              <h2 className='text-danger'>Tổng tiền: {orders.map((order) => {
                return order.totalPrice
              })}.000{currency}</h2>
              <Button className="fs-5 fw-medium" onClick={handleClick}>
                Thanh toán
              </Button>
              <SweetAlert2 {...swalProps}>
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
              <p>Your Address</p>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NextStep;
