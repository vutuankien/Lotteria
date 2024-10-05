import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BElement from './b_element'; // Đảm bảo bạn đã import BElement

const Bills = () => {
    const [bills, setBills] = useState([]);

    // Lấy dữ liệu từ API
    useEffect(() => {
        const fetchBills = async () => {
            try {
                const res = await axios.get('http://localhost:5000/Bills'); // Đảm bảo đường dẫn API chính xác
                setBills(res.data);
            } catch (err) {
                console.error("Error fetching bills data:", err);
            }
        };
        fetchBills();
    }, []);

    // Hàm cập nhật trạng thái đơn hàng
    const updateBillStatus = (id) => {
        setBills((prevBills) =>
            prevBills.filter(bill => bill.id !== id) // Xóa hóa đơn đã được giao
        );
    };

    // Hàm cuộn về đầu trang
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <div className="col-md-9 col-lg-10 my-4 text-gray-600" style={{ width: '100%', margin: 'auto' }}>
                {/* Hiển thị từng hóa đơn bằng BElement */}
                {bills.length > 0 ? (
                    bills.map((bill) => (
                        <BElement key={bill.id} bill={bill} onUpdateStatus={updateBillStatus} />
                    ))
                ) : (
                    <p className="text-center">Không có hóa đơn nào.</p> // Thông báo nếu không có hóa đơn
                )}
            </div>

            {/* Nút cuộn về đầu trang */}
            <button 
                onClick={scrollToTop} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#dc3545', // Màu nền đỏ
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
                title="Quay về đầu trang" // Tooltip on hover
            >
                {/* Mũi tên SVG */}
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ width: '24px', height: '24px', margin: 'auto' }} // Kích thước SVG
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default Bills;
