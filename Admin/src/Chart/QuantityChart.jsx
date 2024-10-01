import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const QuantityChart = () => {
    const api = 'http://localhost:3000/Bills';  // API của bạn
    const [bills, setBills] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});

    // Lấy dữ liệu từ API
    useEffect(() => {
        axios
            .get(api)
            .then((res) => setBills(res.data))  // Lưu dữ liệu từ API vào state
            .catch((err) => console.log(err));
    }, []);

    // Tính số lượng sản phẩm bán ra theo mã sản phẩm
    useEffect(() => {
        const quantities = {};

        bills.forEach(bill => {
            bill["0"].products.forEach(product => {
                if (quantities[product.productId]) {
                    quantities[product.productId] += product.quantity;
                } else {
                    quantities[product.productId] = product.quantity;
                }
            });
        });

        setProductQuantities(quantities);
    }, [bills]);

    // Dữ liệu cho biểu đồ
    const data = {
        labels: Object.keys(productQuantities),  
        datasets: [
            {
                label: "Số lượng bán ra",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                data: Object.values(productQuantities),
            },
        ],
    };

    return (
        <div>
            {/* Biểu đồ */}
            <Bar data={data} />
        </div>
    );
};

export default QuantityChart;
