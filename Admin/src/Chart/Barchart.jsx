import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from "react-bootstrap";

const BarChart = () => {
    const api = 'http://localhost:5000/Bills';  // API của bạn
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
            // Kiểm tra bill và các thuộc tính trước khi truy cập
            if (bill && bill.time && bill.status === 'Shipped') {
                const billDate = new Date(bill.time.split(" ")[1].split('/').reverse().join('-'));
                return billDate.toDateString() === selectedDate.toDateString(); // Kiểm tra trạng thái và ngày
            }
            return false; // Nếu không tồn tại, trả về false
        });
        setFilteredBills(filtered);
    }, [bills, selectedDate]);

    const totalPrices = filteredBills.map(bill => bill.totalPrice || 0); // Truy cập trực tiếp vào totalPrice, mặc định là 0 nếu không tồn tại

    const data = {
        labels: filteredBills.map(bill => {
            // Kiểm tra trước khi truy cập và định dạng ngày/tháng
            if (bill && bill.time) {
                const dateParts = bill.time.split(" ")[1].split('/');
                return `${dateParts[0]}/${dateParts[1]}`; // Định dạng ngày/tháng là dd/mm
            }
            return ''; // Nếu không tồn tại, trả về chuỗi rỗng
        }),
        datasets: [
            {
                label: `Tổng giá tiền trong ngày ${selectedDate.toLocaleDateString('vi-VN')}`, // Sử dụng 'vi-VN' để định dạng ngày
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
                    onChange={(date) => setSelectedDate(date)} 
                    dateFormat="dd/MM/yyyy" // Đảm bảo định dạng ngày là dd/MM/yyyy
                    className="w-100 mt-4"
                />
            </Col>
        </Row>
    );
};

export default BarChart;
