import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const OrderElement = ({ order }) => {
    const { userName, phone, email, address, products, totalPrice, time, status } = order;

    const formatTime = (time) => {
        const [timePart, datePart] = time.split(' ');
        const [day, month, year] = datePart.split('/');
        return `${year}-${month}-${day}T${timePart}`;
    };

    const formattedTime = new Date(formatTime(time)).toLocaleString();

    return (
        <Card className="order-element my-3 shadow-sm">
            <Card.Body>
                <h5 className="mb-1" style={{ color: '#dc3545' }}>User Information</h5>
                <Row className="mb-3">
                    <Col xs={12} md={6} className="d-flex flex-column">
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Name : </span> {userName}
                        </p>
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Phone Number : </span> {phone}
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column">
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Email : </span> {email}
                        </p>
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Address : </span> {address}
                        </p>
                    </Col>
                </Row>
                <hr />
                <h5 className="mb-2" style={{ color: '#dc3545' }}>Product Details</h5>
                {products.map((product, index) => (
                    <Row className="mb-2 align-items-center" key={index}>
                        <Col xs={4} className="text-center">
                            <img
                                src={product.image} // Giả sử bạn có thuộc tính image trong product
                                alt={product.foodName}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} // Bo góc cho ảnh
                            />
                        </Col>
                        <Col xs={5} className="text-truncate">
                            <span style={{ color: '#007bff', fontWeight: 'bold' }}>{product.foodName}</span>
                        </Col>
                        <Col xs={3} className="text-center">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Quantity:</span> <span className="badge bg-info text-white">{product.quantity}</span>
                        </Col>
                    </Row>
                ))}
                <hr />
                <Row className="mt-3">
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Price : </span> <span className="text-danger">{totalPrice}</span>
                    </Col>
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Date : </span> {formattedTime}
                    </Col>
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Shipping Status : </span> <span className={`text-${status === 'Đang giao' ? 'success' : 'secondary'}`}>{status}</span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderElement;
