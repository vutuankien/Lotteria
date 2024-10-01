import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from "react-bootstrap";

const BarChart = () => {
    const api = 'http://localhost:3000/Bills';  // API của bạn
    const [bills, setBills] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredBills, setFilteredBills] = useState([]);

    // Lấy dữ liệu từ API
    useEffect(() => {
        axios
            .get(api)
            .then((res) => setBills(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const filtered = bills.filter(bill => {
            const billDate = new Date(bill["0"].time.split(" ")[1].split('/').reverse().join('-'));
            return billDate.toDateString() === selectedDate.toDateString();
        });
        setFilteredBills(filtered);
    }, [bills, selectedDate]);

    const totalPrices = filteredBills.map(bill => bill["0"].totalPrice);

    const data = {
        labels: filteredBills.map(bill => bill["0"].time.split(" ")[1]),
        datasets: [
            {
                label: `Tổng giá tiền trong ngày ${selectedDate.toLocaleDateString()}`,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                data: totalPrices,
            },
        ],
    };

    return (
        <Row>
            <Col md={12}>
                <Bar data={data} />
            </Col>
            <Col md={12} className="d-flex justify-content-center">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}  // Cập nhật ngày khi chọn
                    dateFormat="dd/MM/yyyy"
                    className="w-100 mt-4"
                />
            </Col>
        </Row>
    );
};

export default BarChart;
