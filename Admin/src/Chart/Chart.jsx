import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  const api = 'http://localhost:5000/Bills';
  const [bills, setBills] = useState([]); // Đổi tên state từ 'bill' thành 'bills'

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setBills(res.data))  // Lưu dữ liệu vào state
      .catch((err) => console.log(err));
  }, []);

  // Lọc hóa đơn có trạng thái 'Shipped'
  const shippedBills = bills.filter(bill => bill.status === 'Shipped');

  // Lấy dữ liệu labels và totalPrice từ API
  const labels = shippedBills.map((item) => {
    const dateParts = item.time.split(" ")[1].split('/'); // Lấy phần ngày
    return `${dateParts[0]}/${dateParts[1]}`; // Định dạng lại thành dd/MM
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Thu nhập các ngày",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: shippedBills.map((item) => item.totalPrice),  // Truy cập trực tiếp vào 'totalPrice'
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
