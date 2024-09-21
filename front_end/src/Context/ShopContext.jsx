import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = '₫';
    const foodApi = 'http://localhost:3000/Foods';
    const ordersAPI = 'http://localhost:3000/orders';
    const billAPI = 'http://localhost:3000/Bills'
    const userAPI = 'http://localhost:3000/UsersAccount'
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState({});

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 11
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 10
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 6
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };

    useEffect(() => {
        axios.get(userAPI)
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => console.log("Error fetching data",error))
    },[])

    useEffect(() => {
        axios.get(foodApi)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        axios.get(ordersAPI)
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    const AddToCart = async (userId, productId) => {
        try {
            // Tìm sản phẩm theo productId
            const productIndex = products.findIndex(product => product.id === productId);
            
            // Kiểm tra xem sản phẩm có tồn tại không
            if (productIndex === -1) {
                console.error("Product not found");
                return; // Không tìm thấy sản phẩm
            }
    
            const product = products[productIndex];
    
            // Kiểm tra xem đã có đơn hàng cho userId này chưa
            const existingOrderIndex = orders.findIndex(order => order.userId === userId && order.status === "Shipped");
            let newOrder;
    
            if (existingOrderIndex !== -1) {
                // Nếu đã có đơn hàng, lấy đơn hàng đó
                const existingOrder = orders[existingOrderIndex];
                
                // Tìm sản phẩm trong đơn hàng
                const productInOrderIndex = existingOrder.products.findIndex(item => item.productId === productId);
                
                if (productInOrderIndex !== -1) {
                    // Nếu sản phẩm đã có trong đơn hàng, tăng số lượng
                    existingOrder.products[productInOrderIndex].quantity += 1;
                } else {
                    // Nếu sản phẩm chưa có trong đơn hàng, thêm sản phẩm mới
                    existingOrder.products.push({ productId: product.id, quantity: 1, price: product.price });
                }
    
                // Tính lại tổng tiền cho tất cả các sản phẩm trong đơn hàng
                existingOrder.totalPrice = existingOrder.products.reduce((total, item) => {
                    const productData = products.find(p => p.id === item.productId);
                    return total + (productData ? productData.price * item.quantity : 0);
                }, 0);
    
                // Gửi yêu cầu cập nhật đơn hàng lên server
                const response = await axios.put(`${ordersAPI}/${existingOrder.id}`, existingOrder);
                newOrder = response.data; // Đơn hàng đã cập nhật
    
            } else {
                // Nếu chưa có đơn hàng, tạo đơn hàng mới
                const newOrderData = {
                    userId: userId,
                    products: [
                        {
                            productId: product.id,
                            quantity: 1,
                            price: product.price // Lưu giá sản phẩm vào đơn hàng
                        }
                    ],
                    totalPrice: product.price, // Tổng tiền của sản phẩm đầu tiên
                    time: new Date().toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }),
                    status: 'Shipped'
                };
    
                // Gửi yêu cầu POST để tạo đơn hàng mới
                const response = await axios.post(ordersAPI, newOrderData);
                newOrder = response.data; // Đơn hàng mới từ server
            }
    
            // Cập nhật giỏ hàng (Cart)
            setCart(prevCart => ({
                ...prevCart,
                [product.id]: (prevCart[product.id] || 0) + 1
            }));
    
            // Cập nhật danh sách đơn hàng với đơn hàng mới hoặc đã cập nhật
            setOrders(prevOrders => {
                if (existingOrderIndex !== -1) {
                    const updatedOrders = [...prevOrders];
                    updatedOrders[existingOrderIndex] = newOrder;
                    return updatedOrders;
                } else {
                    return [...prevOrders, newOrder];
                }
            });
    
            // Log kết quả để kiểm tra
            console.log(newOrder);
            console.log(cart);
        } catch (error) {
            // Xử lý lỗi nếu có vấn đề xảy ra
            console.error("Error adding to cart:", error);
        }
    };
    
    const getQuantity = () => {
        let total = 0;
        
        // Duyệt qua từng đơn hàng trong orders
        for (const order of orders) {
            // Duyệt qua từng sản phẩm trong mảng products của đơn hàng
            for (const product of order.products) {
                // Cộng số lượng sản phẩm vào tổng
                total += product.quantity;
            }
        }
        
        return total;
    };
    

    const increaseQuantity = async (orderId, productId) => {
        try {
            // Tìm đơn hàng dựa trên orderId
            const order = orders.find(order => order.id === orderId);
    
            if (order) {
                // Cập nhật số lượng sản phẩm trong đơn hàng
                const updatedProducts = order.products.map(product => 
                    product.productId === productId
                        ? { ...product, quantity: product.quantity + 1 } // Tăng số lượng sản phẩm
                        : product
                );
    
                // Tính lại tổng giá tiền dựa trên số lượng sản phẩm
                const updatedTotalPrice = updatedProducts.reduce((total, product) => {
                    const productData = products.find(p => p.id === product.productId);
                    return total + (productData ? productData.price * product.quantity : 0);
                }, 0);
    
                // Cập nhật đơn hàng với sản phẩm và tổng giá tiền mới
                const updatedOrder = { 
                    ...order, 
                    products: updatedProducts, 
                    totalPrice: updatedTotalPrice 
                };
    
                // Gửi yêu cầu cập nhật đơn hàng lên server
                const response = await axios.put(`${ordersAPI}/${orderId}`, updatedOrder);
                const newOrder = response.data; // Đơn hàng đã được cập nhật từ server
    
                // Cập nhật state với đơn hàng mới
                setOrders(orders.map(order => (order.id === orderId ? newOrder : order)));
            }
        } catch (error) {
            console.error("Error updating product quantity:", error);
        }
    };
    
    
    


    const decreaseQuantity = async (orderId, productId) => {
        try {
            // Tìm đơn hàng dựa trên orderId
            const order = orders.find(order => order.id === orderId);
    
            if (order) {
                // Cập nhật số lượng sản phẩm trong đơn hàng
                const updatedProducts = order.products.map(product =>
                    product.productId === productId && product.quantity > 1
                        ? { ...product, quantity: product.quantity - 1 } // Giảm số lượng sản phẩm
                        : product
                );
    
                // Tính lại tổng giá tiền dựa trên số lượng sản phẩm mới
                const updatedTotalPrice = updatedProducts.reduce((total, product) => {
                    const productData = products.find(p => p.id === product.productId);
                    return total + (productData ? productData.price * product.quantity : 0);
                }, 0);
    
                // Cập nhật đơn hàng với sản phẩm và tổng giá tiền mới
                const updatedOrder = { ...order, products: updatedProducts, totalPrice: updatedTotalPrice };
    
                // Gửi yêu cầu cập nhật đơn hàng lên server
                await axios.put(`${ordersAPI}/${orderId}`, updatedOrder);
    
                // Cập nhật state với đơn hàng mới
                setOrders(orders.map(order => (order.id === orderId ? updatedOrder : order)));
            }
        } catch (error) {
            console.error("Error updating product quantity:", error);
        }
    };
    

    const removeFromCart = async (orderId, productId) => {
        try {
            // Tìm đơn hàng dựa trên orderId
            const order = orders.find(order => order.id === orderId);
    
            if (order) {
                // Lọc bỏ sản phẩm có productId cần xóa khỏi giỏ hàng
                const updatedProducts = order.products.filter(product => product.productId !== productId);
    
                // Nếu sau khi xóa sản phẩm mà đơn hàng vẫn còn sản phẩm khác
                if (updatedProducts.length > 0) {
                    // Tính lại tổng giá tiền dựa trên các sản phẩm còn lại
                    const updatedTotalPrice = updatedProducts.reduce((total, product) => {
                        const productData = products.find(p => p.id === product.productId);
                        return total + (productData ? productData.price * product.quantity : 0);
                    }, 0);
    
                    // Cập nhật đơn hàng với sản phẩm và tổng giá tiền mới
                    const updatedOrder = { ...order, products: updatedProducts, totalPrice: updatedTotalPrice };
    
                    // Gửi yêu cầu cập nhật đơn hàng lên server
                    await axios.put(`${ordersAPI}/${orderId}`, updatedOrder);
    
                    // Cập nhật state với đơn hàng mới
                    setOrders(orders.map(order => (order.id === orderId ? updatedOrder : order)));
                } else {
                    // Nếu không còn sản phẩm nào trong đơn hàng, xóa đơn hàng
                    await axios.delete(`${ordersAPI}/${orderId}`);
    
                    // Cập nhật state để loại bỏ đơn hàng khỏi giỏ hàng và đơn hàng
                    setCart(prevCart => {
                        const updatedCart = { ...prevCart };
                        delete updatedCart[productId];
                        return updatedCart;
                    });
                    setOrders(orders.filter(order => order.id !== orderId));
                }
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    


    const value = {
        navigate, currency, responsive, products, orders, AddToCart, getQuantity, setOrders, increaseQuantity, decreaseQuantity, removeFromCart,search,setSearch,showSearch,setShowSearch,ordersAPI,billAPI,setOrders,
        users
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
