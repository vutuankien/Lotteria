import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import Footer from '../components/Footer/Footer';
import PolicyFooter from '../components/Policy_Footer/PolicyFooter';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axios from 'axios';

const Cart = () => {
    const { orders, currency, navigate, getQuantity, decreaseQuantity, increaseQuantity, removeFromCart } = useContext(ShopContext);
    const [services, setServices] = useState([
        {
            title: 'Lấy dụng cụ ăn uống',
            price: 3,
            state: true
        },
        {
            title: 'Lấy tương cà',
            price: 5,
            state: true
        },
        {
            title: 'Lấy tương ớt',
            price: 7,
            state: true
        }
    ]);

    
    const handleChange = (index) => {
        const updatedServices = services.map((service, i) =>
            i === index ? { ...service, state: !service.state } : service
        );
        setServices(updatedServices);
        console.log(services[index].state);
    };

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
                                    <div className='mt-3 d-flex align-items-start align-items-sm-center justify-content-between px-3 flex-sm-row flex-column'>
                                        <div className='d-flex gap-3'>
                                            <div>
                                                <img src={order.image} width={'120px'} height={'100px'} alt={order.name} />
                                            </div>
                                            <div>
                                                <h4>{order.name}</h4>
                                                <p className='fs-5 fw-bold'>
                                                    {order.price}.000{currency}
                                                </p>
                                                <p>Thời gian đặt:<span className='fw-bold'>{order.time}</span></p>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center gap-3'>
                                            <div className='d-flex align-items-center gap-1'>
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
                    <Col md={4} sm={12} className='ps-3'>
                        <div className='d-flex align-items-center  gap-4'>
                            <hr />
                            <h1 className='fs-2 text-danger'>
                                Tổng tiền
                            </h1>
                            <hr />
                        </div>
                        <div className='my-2 border p-2 rounded-2 shadow'>
                            <div >
                                <p className='fs-4 fw-bold d-flex align-items-center gap-2 border-bottom py-2' ><Icon.StarFill></Icon.StarFill>Tùy chọn</p>
                                <div>
                                    {services.map((item, index) => (
                                        <div className='d-flex justify-content-between ' key={index}>
                                            <p className='fs-6 text-black fw-bold'>{item.title}<span className='text-danger'>({item.price}.000{currency})</span></p>
                                            <div>
                                                <div>
                                                    <BootstrapSwitchButton
                                                        onChange={() => handleChange(index)}
                                                        checked={item.state}
                                                        size='sm'
                                                        onlabel='Get'
                                                        offlabel='No'
                                                        onstyle='danger'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='border p-2 mt-4 rounded-3 shadow'>
                            <p className='fs-4 fw-bold d-flex align-items-center gap-2 border-bottom py-2' ><Icon.StarFill></Icon.StarFill>Đơn giá</p>
                            <div className='d-flex flex-column justify-content-center' >
                                <div className='d-flex justify-content-between align-items-center border-bottom'>
                                    <p className='text-black fw-bold fs-5'>Tạm tính</p>
                                    <p className='fs-5 text-danger fw-bold'>
                                        {orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(3)}{currency}
                                    </p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center border-bottom'>
                                    <p className='text-black fw-bold fs-5'>Dịch vụ</p>
                                    <p className='fs-5 text-danger fw-bold'>
                                        {services.filter(service => service.state).reduce((acc, curr) => acc + curr.price, 0).toFixed(3)}{currency}

                                    </p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center border-bottom'>
                                    <p className='text-black fw-bold fs-5'>Tổng tiền</p>
                                    <p className='fs-5 text-danger fw-bold'>
                                        {(orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) + services.filter(service => service.state).reduce((acc, curr) => acc + curr.price, 0)).toFixed(3)}{currency}
                                    </p>
                                </div>
                                <div className='mt-3'>

                                    <button className='btn btn-danger px-4 py-2 rounded-5 shadow w-100'>
                                        Đặt hàng
                                    </button>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <RelatedProduct category={'BestSeller'} />
            </Container>

            <Footer />
            <PolicyFooter />
        </div>
    );
};

export default Cart;
