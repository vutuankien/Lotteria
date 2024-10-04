import React, { useState } from 'react';
import './Parent.css'; 
import Store from './Store'; // Điều chỉnh đường dẫn
import BrandStory from './BrandStory'; // Điều chỉnh đường dẫn
import Fran from './Fran'; // Điều chỉnh đường dẫn
import Care from './Care'; // Điều chỉnh đường dẫn

const Parent = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { title: "TÌM CỬA HÀNG", component: <Store /> },
        { title: "CÂU CHUYỆN THƯƠNG HIỆU", component: <BrandStory /> },
        { title: "THÔNG TIN THÀNH VIÊN", component: <Fran /> },
        { title: "TUYỂN DỤNG", component: <Care /> }
    ];

    return (
        <div className="parent-container">
            <div className="nav">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`nav-item ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => setActiveIndex(index)}
                    >
                        {item.title}
                    </div>
                ))}
                <div 
                    className="underline" 
                    style={{ left: `${activeIndex * 100}px` }} 
                ></div>
            </div>
            {/* Hiển thị component tương ứng của mục được chọn */}
            <div className="info">
                {items[activeIndex].component}
            </div>
        </div>
    );
};

export default Parent;