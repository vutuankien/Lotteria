import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerElement from './Customer_element'; // Đảm bảo đường dẫn này đúng

const Customer = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                // console.log("Fetched user data:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!users.length) {
        return <div className="text-center mt-5">No user data available</div>;
    }

    return (
        <div className="col-md-9 col-lg-10 my-4 text-gray-600" style={{ width: '100%', margin: 'auto' }}>
            <h2 className="text-center" style={{ color: '#dc3545' }}>User Information</h2>
            <div className="row">
                {users.map((user, index) => (
                    <div key={user.id} className="col-12 mb-4"> {/* Thay đổi từ col-md-4 thành col-12 */}
                        <CustomerElement user={user} id={index + 1} />
                    </div>
                ))}
            </div>

            {/* Nút cuộn lên đầu trang luôn hiển thị */}
            <button
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
                title="Quay về đầu trang"
            >
                {/* SVG mũi tên */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '24px', height: '24px', margin: 'auto' }}
                >
                    <path
                        d="M12 5V19M12 5L6 11M12 5L18 11"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Customer;
