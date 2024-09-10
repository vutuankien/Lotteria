import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = '₫';
    const foodApi = 'http://localhost:3000/Foods';
    const ordersAPI = 'http://localhost:3000/orders'
    const [products, setProducts] = useState([]);
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


    const AddToCart = async (id) => {
        try {
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                const product = products[index];

                const order = {
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                    time: new Date().toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    }),
                    status: 'Shipped',
                    category: product.category
                };

                const response = await axios.post(ordersAPI, order);
                const newOrder = response.data; // Đơn hàng mới với ID từ server

                setCart({ ...cart, [product.id]: (cart[product.id] || 0) + 1 });
                setOrders([...orders, newOrder]); // Sử dụng dữ liệu từ phản hồi của server
                console.log(order)
                console.log(cart)

            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
    const getQuantity = () => {
        let total = 0;
        for (const order in orders) {
            total += orders[order].quantity;
        }
        return total;
    }

    const increaseQuantity = async (id) => {
        try {
            const order = orders.find(order => order.id === id);
            if (order) {
                const updatedOrder = { ...order, quantity: order.quantity + 1 };
                await axios.put(`${ordersAPI}/${id}`, updatedOrder); 
                setOrders(orders.map(order => (order.id === id ? updatedOrder : order)));
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };


    const decreaseQuantity = async (id) => {
        try {
            const order = orders.find(order => order.id === id);
            if (order && order.quantity > 1) {
                const updatedOrder = { ...order, quantity: order.quantity - 1 };
                await axios.put(`${ordersAPI}/${id}`, updatedOrder); 
                setOrders(orders.map(order => (order.id === id ? updatedOrder : order))); 
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`${ordersAPI}/${id}`); 
            const updatedCart = { ...cart };
            delete updatedCart[id];
            setCart(updatedCart);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };


    const value = {
        navigate, currency, responsive, products, orders, AddToCart, getQuantity, setOrders, increaseQuantity, decreaseQuantity, removeFromCart,search,setSearch,showSearch,setShowSearch
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
