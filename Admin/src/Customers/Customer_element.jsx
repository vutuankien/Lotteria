import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const CustomerElement = ({ user, id }) => {
  const { id: userId } = user;

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [address, setAddress] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, id * 100);

    return () => clearTimeout(timer);
  }, [id]);

  // Fetch user info and address
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Fetch user info
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        const userData = userResponse.data;

        // Set user info
        setUserInfo({
          fullname: userData.fullName,
          email: userData.email,
          phone: userData.phone || 'No phone provided',
          dob: userData.dob || 'No date of birth',
          photoURL: userData.photoURL,
        });

        // Fetch address with isDefault: true
        const addressResponse = await axios.get(`http://localhost:5000/address?userId=${userId}`);
        const defaultAddress = addressResponse.data.find(addr => addr.isDefault === true);

        setAddress(defaultAddress ? defaultAddress.address : 'No default address found');
      } catch (error) {
        console.error('Error fetching user or address info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Bills?userId=${userId}`);
        const shippedOrders = response.data.filter(order => order.status === 'Shipped');

        const ordersWithImages = await Promise.all(
          shippedOrders.map(async (order) => {
            const productsWithImages = await Promise.all(
              order.products.map(async (product) => {
                try {
                  const productResponse = await axios.get(`http://localhost:5000/Foods/${product.productId}`);
                  return {
                    ...product,
                    image: productResponse.data.image,
                  };
                } catch (error) {
                  console.error(`Error fetching product image for productId ${product.productId}:`, error);
                  return product;
                }
              })
            );
            return { ...order, products: productsWithImages };
          })
        );

        setOrders(ordersWithImages);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Card
      className={`customer-element my-3 shadow-sm rounded p-3 ${isVisible ? 'fade-in' : ''}`}
      style={{
        width: '100%',
        position: 'relative',
        backgroundColor: '#f8f9fa',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-in-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card mb-4 shadow-sm">
        <div className="card-body text-center">
          {/* Hiển thị ảnh người dùng với kích thước lớn hơn */}
          <div className="mb-4">
            <img
              src={userInfo.photoURL}
              alt="user-avatar"
              className="rounded-circle"
              style={{ width: '80px', height: '80px' }}
            />
          </div>

          {/* Hiển thị tên người dùng dưới ảnh */}
          <p className="mb-2">{userInfo.fullname}</p>

          {/* Thông tin người dùng còn lại */}
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-0"><strong>Email:</strong> {userInfo.email}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Phone:</strong> {userInfo.phone}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-0"><strong>Address:</strong> {address}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-0"><strong>Date of Birth:</strong> {userInfo.dob ? new Date(userInfo.dob).toLocaleDateString('en-GB') : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={() => setShowOrders(!showOrders)}
        className="mt-3"
      >
        {showOrders ? 'Hide Shipped Orders' : 'Show Shipped Orders'}
      </Button>

      {showOrders && (
        <div className="mt-3">
          <h5 className="mb-4">Shipped Orders:</h5>
          {orders.length > 0 ? (
            <div className="d-flex flex-wrap">
              {orders.map(order => (
                <div key={order.id} className="card mb-3 shadow-sm me-3" style={{ width: '300px' }}>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Order Time:</strong> {new Date(order.time).toLocaleString('en-GB')}
                    </p>
                    <div className="d-flex flex-wrap">
                      {order.products.map(product => (
                        <p key={product.productId} className="mb-0">
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                      ))}
                    </div>

                    {/* Hiển thị tổng giá */}
                    <p className="card-text mt-2">
                      <strong>Price:</strong> {order.totalPrice}.000 VNĐ
                    </p>

                    {/* Hiển thị hình ảnh sản phẩm ở cuối */}
                    <div className="d-flex flex-wrap mt-2">
                      {order.products.map(product => (
                        <div key={product.productId} className="me-2" style={{ width: '100px' }}>
                          <img src={product.image} alt={product.productId} className="img-fluid" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No shipped orders found.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default CustomerElement;
