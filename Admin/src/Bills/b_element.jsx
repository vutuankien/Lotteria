import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const BElement = ({ bill }) => {
    const { userName, phone, email, address, products, totalPrice, time, status } = bill;

    const formatTime = (time) => {
        const [timePart, datePart] = time.split(' ');
        const [day, month, year] = datePart.split('/');
        return `${year}-${month}-${day}T${timePart}`;
    };

    const formattedTime = new Date(formatTime(time)).toLocaleString();

    return (
        <Card className="bill-element my-3 shadow-sm">
            <Card.Body>
                <h5 className="mb-1" style={{ color: '#dc3545' }}>Thông tin khách hàng</h5>
                <Row className="mb-3">
                    <Col xs={12} md={6} className="d-flex flex-column">
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Tên: </span> {userName}
                        </p>
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Số điện thoại: </span> {phone}
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column">
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Email: </span> {email}
                        </p>
                        <p className="mb-0">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Địa chỉ: </span> {address}
                        </p>
                    </Col>
                </Row>
                <hr />
                <h5 className="mb-2" style={{ color: '#dc3545' }}>Chi tiết hóa đơn</h5>
                {products.map((product, index) => (
                    <Row className="mb-2 align-items-center" key={index}>
                        <Col xs={4} className="text-center">
                            <img
                                src={product.image} // Giả sử bạn có thuộc tính image trong product
                                alt={product.productId} // Thay đổi theo ID sản phẩm nếu cần
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} // Bo góc cho ảnh
                            />
                        </Col>
                        <Col xs={5} className="text-truncate">
                            <span style={{ color: '#007bff', fontWeight: 'bold' }}>Sản phẩm ID: {product.productId}</span>
                        </Col>
                        <Col xs={3} className="text-center">
                            <span style={{ color: '#28a745', fontWeight: 'bold' }}>Số lượng:</span> <span className="badge bg-info text-white">{product.quantity}</span>
                        </Col>
                    </Row>
                ))}
                <hr />
                <Row className="mt-3">
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Tổng giá: </span> <span className="text-danger">{totalPrice} VNĐ</span>
                    </Col>
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Thời gian: </span> {formattedTime}
                    </Col>
                    <Col xs={12} md={4}>
                        <span style={{ color: '#28a745', fontWeight: 'bold' }}>Trạng thái giao hàng: </span> 
                        <span className={`text-${status === 'Shipped' ? 'success' : 'secondary'}`}>{status}</span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default BElement;
