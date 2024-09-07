import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import Footer from '../components/Footer/Footer';
import PolicyFooter from '../components/Policy_Footer/PolicyFooter';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';

const Cart = () => {
    const { orders, setOrders, currency, navigate, getQuantity, decreaseQuantity, increaseQuantity, removeFromCart } = useContext(ShopContext);


    return (
        <div style={{ marginTop: '100px' }}>
            <Container>
                {/*Render products*/}
                <Row className='d-flex justify-content-between flex-sm-row flex-column'>
                    <Col md={8} sm={12}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center gap-4'>
                                <hr />
                                <h1 className='fs-2 text-danger'>
                                    Giỏ hàng của bạn <span className='fs-4 text-black d-none d-sm-inline-block'>({getQuantity()} sản phẩm)</span>
                                </h1>
                                <hr />
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate('/bestSeller')}
                                    className='px-3 py-2 border rounded-5 shadow d-none d-sm-block'>
                                    <Icon.Plus /> Thêm sản phẩm
                                </button>
                            </div>
                        </div>
                        <div>
                            {orders.map((order, index) => (
                                <div key={index} className='mt-4'>
                                    <div className='mt-3 d-flex align-items-center justify-content-between px-3'>
                                        <div className='d-flex gap-2'>
                                            <div>
                                                <img src={order.image} width={'120px'} height={'100px'} alt={order.name} />
                                            </div>
                                            <div>
                                                <h4>{order.name}</h4>
                                                <p className='fs-5 fw-bold'>
                                                    {order.price}.000{currency}
                                                </p>
                                                <p>Thời gian đặt: {order.time}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center gap-2'>
                                            <button
                                                className='p-2 bg-danger rounded-1 text-light'
                                                onClick={() => decreaseQuantity(order.id)}>
                                                <Icon.Dash />
                                            </button>
                                            <p className='px-3 fs-4 mb-0 bg-danger-subtle rounded-1 text-black'>
                                                {order.quantity}
                                            </p>
                                            <button
                                                className='p-2 bg-danger rounded-1 text-light'
                                                onClick={() => increaseQuantity(order.id)}>
                                                <Icon.Plus />
                                            </button>
                                        </div>
                                        <div onClick={() => {
                                            removeFromCart(order.id)
                                            toast.info("Delete Order Successfully!")
                                        }}>
                                            <Icon.Trash className='fs-3 text-danger' style={{ cursor: "pointer" }} />
                                        </div>
                                    </div>
                                    <hr style={{
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: '#000',
                                        margin: '10px 0'
                                    }} />
                                </div>
                            ))}
                        </div>
                    </Col>
                    {/* Render bill */}
                    <Col xs={4}>
                        <h1>Bill</h1>
                    </Col>
                </Row>

                <RelatedProduct category={'BestSeller'}/>
            </Container>

            <Footer/>
            <PolicyFooter/>
        </div>
    );
};

export default Cart;
