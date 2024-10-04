import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderElement from './Order_element'; // Component hiển thị thông tin đơn hàng

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Lấy danh sách các đơn hàng
                const ordersRes = await axios.get('http://localhost:3000/orders');
                const usersRes = await axios.get('http://localhost:3000/UsersAccount');
                const foodsRes = await axios.get('http://localhost:3000/Foods');

                const enrichedOrders = ordersRes.data.map(order => {
                    const user = usersRes.data.find(u => u.id === order.userId.toString());
                    const products = order.products.map(product => {
                        const food = foodsRes.data.find(f => f.id === product.productId);
                        return {
                            ...product,
                            foodName: food ? food.name : 'Unknown',
                            image: food ? food.image : null // Thêm thông tin ảnh vào sản phẩm
                        };
                    });

                    return {
                        ...order,
                        userName: user ? user.name : 'Unknown User',
                        phone: user ? user.phone : 'Unknown Phone',
                        email: user ? user.email : 'Unknown Email',
                        address: user ? user.address : 'Unknown Address',
                        products: products, // Thêm thông tin sản phẩm vào order
                        orderTime: order.time // Lưu thông tin thời gian đặt vào order
                    };
                });

                setOrders(enrichedOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };


        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <div className="col-md-9 col-lg-10 my-4 text-gray-600 " style={{  width : '100%',margin : 'auto' }}>
                {orders.map(order => (
                    <OrderElement key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default Order;
