import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = '₫';
    const foodApi = 'http://localhost:3000/Foods'
    const [products, setProducts] = useState([])
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
    const value = {
        navigate, currency, products,responsive
    }
    useEffect(() => {
        axios.get(foodApi)
        .then(res => setProducts(res.data))
    }, [])
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;