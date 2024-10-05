import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const BElement = ({ bill, onUpdateStatus }) => {
    // Kiểm tra xem bill có phải là đối tượng lồng ghép không
    const billData = bill?.[0] ? bill[0] : bill; 
    const billId = billData?.id || bill?.id; 

    if (!billData || !billId) {
        return <div>Không có dữ liệu đơn hàng.</div>;
    }

    const {
        totalPrice,
        status,
        products = [],
        time,
        userId,
    } = billData;

    if (status !== "Shipping") {
        return null;
    }

    const [productImages, setProductImages] = useState({});
    const [userInfo, setUserInfo] = useState(null);
    const [address, setAddress] = useState('');

    const fetchProductImages = async () => {
        const productImageMap = {};
        for (let product of products) {
            try {
                const res = await axios.get(`http://localhost:5000/Foods/${product.productId}`);
                productImageMap[product.productId] = res.data.image;
            } catch (error) {
                console.error(`Error fetching image for productId: ${product.productId}`, error);
            }
        }
        setProductImages(productImageMap);
    };

    const fetchUserInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/${userId}`);
            setUserInfo(res.data);
        } catch (error) {
            console.error("Error fetching user info", error);
        }
    };

    const fetchDefaultAddress = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/address`);
            const addresses = res.data;
            const defaultAddress = addresses.find(addr => addr.userId === userId && addr.isDefault);
            setAddress(defaultAddress ? defaultAddress.address : 'Chưa có địa chỉ mặc định');
        } catch (error) {
            console.error("Error fetching address", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchProductImages();
            fetchUserInfo();
            fetchDefaultAddress();
        } else {
            console.error("User ID không hợp lệ:", userId);
        }
    }, [products, userId]);

    const formattedTime = () => {
        const [timePart, datePart] = time.split(' ');
        const [day, month, year] = datePart.split('/');
        return `${timePart} ${day}/${month}/${year}`;
    };

    const handleShipOrder = async () => {
        const confirmShip = window.confirm("Bạn có chắc rằng đơn hàng đã được giao hay không?");
        if (confirmShip) {
            try {
                if (!billId) {
                    console.error('Bill ID is undefined or invalid');
                    alert('Lỗi: ID đơn hàng không hợp lệ.');
                    return;
                }

                const response = await axios.put(`http://localhost:5000/Bills/${billId}`, {
                    ...billData,
                    status: "Shipped"
                });

                onUpdateStatus(billId);
                alert("Trạng thái đơn hàng đã được cập nhật thành 'Shipped'.");
            } catch (error) {
                console.error("Error updating order status", error);
                alert("Có lỗi xảy ra trong việc cập nhật trạng thái đơn hàng.");
            }
        }
    };

    return (
        <Card className="my-3 shadow-sm">
            <Card.Body>
                <h5 className="mb-3 text-danger">Orders information</h5>

                {userInfo && (
                    <Row className="mb-3">
                        <Col xs={12} md={6} className="text-center">
                            <img
                                src={userInfo.photoURL}
                                alt="User Avatar"
                                className="rounded-circle mb-2"
                                style={{ width: '50px', height: '50px' }}
                            />
                            <p className="mb-0">{userInfo.fullName}</p>
                        </Col>
                        <Col xs={12} md={6} className="d-flex flex-column justify-content-between">
                            <div className="mb-2">
                                <p className="mb-0">
                                    <strong>Email : </strong> {userInfo.email || 'Chưa có email'}
                                </p>
                                <p className="mb-0">
                                    <strong>Phone : </strong> {userInfo.phone || 'Chưa có số điện thoại'}
                                </p>
                                <p className="mb-0">
                                    <strong>Address : </strong> {address}
                                </p>
                            </div>
                        </Col>
                    </Row>
                )}

                <h5 className="mb-3 text-danger">Bill details</h5>
                {products.map((product, index) => (
                    <Row className="mb-2 align-items-center" key={index}>
                        <Col xs={6} className="text-center">
                            <img
                                src={productImages[product.productId] || ''}
                                alt={product.productId}
                                style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                        </Col>
                        <Col xs={6} className="text-center">
                            <span className="text-primary font-weight-bold">Quantity : </span>
                            <span className="badge bg-info text-white">{product.quantity}</span>
                        </Col>
                    </Row>
                ))}

                <hr />
                <Row className="mt-3 align-items-center">
                    <Col xs={12} md={6}>
                        <strong>Price : </strong> <span className="text-danger">{totalPrice}.000 VNĐ</span>
                    </Col>
                    <Col xs={12} md={6}>
                        <strong>Order time : </strong> {formattedTime()}
                    </Col>
                </Row>
                <Row className="mt-3 align-items-center">
                    <Col xs={8} md={6}>
                        <strong>Status  : </strong>
                        <span className={`text-${status === 'Shipping' ? 'success' : 'secondary'}`}>{status}</span>
                    </Col>
                    <Col xs={4} md={6} className="text-end">
                        <Button
                            size="sm"
                            variant="success"
                            onClick={handleShipOrder}
                            style={{ borderRadius: '20px' }}
                        >
                            Mark as shipped
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default BElement;
