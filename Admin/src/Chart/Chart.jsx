import React, { useContext, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { ShopContext } from "../../../front_end/src/Context/ShopContext";

const LineChart = () => {
  // const { billAPI } = useContext(ShopContext);
  const api = 'http://localhost:3000/Bills'
  const [bill, setBill] = useState([]);

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setBill(res.data))  // Truy cập vào 'Bills' trong dữ liệu trả về
      .catch((err) => console.log(err));
  }, []);

  // Lấy dữ liệu labels và totalPrice từ API
  const labels = bill.map((item) => item["0"].time.split(" ")[1]); // Sử dụng thời gian làm label
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Thu nhập các ngày",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: bill.map((item) => item["0"].totalPrice),  // Truy cập 'totalPrice' từ '0'
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
