import React from "react";
import "./Fran.css";

import Image1 from "../assets/kien.jpg";
import Image2 from "../assets/hung.jpg";
import Image3 from "../assets/ngoc.jpg";
import Image4 from "../assets/dang.jpg";

const Franchise = () => {
const products = [
{
id: 1,
name: "Vũ Tuấn Kiên",
image: Image1,
},
{
id: 2,
name: "Vũ Hồng Đăng",
image: Image4,
},
{
id: 3,
name: "Đặng Hồng Ngọc",
image: Image3,
},
{
id: 4,
name: "Nguyễn Thế Hưng",
image: Image2,
},
];

return (
<div className="product-list">
<div className="Fra-text">
<p>
Chúng tôi là một đội ngũ gồm bốn thành viên đầy năng động và sáng tạo.
Mỗi người đều mang đến những kỹ năng và kinh nghiệm riêng biệt, từ
quản lý, thiết kế đến phân tích. Chúng tôi cùng nhau làm việc hướng
tới một mục tiêu chung, hỗ trợ và phát triển lẫn nhau để đạt được sự
xuất sắc trong mọi dự án. Đam mê, nhiệt huyết và tinh thần đồng đội là
những giá trị cốt lõi mà chúng tôi luôn gìn giữ.
</p>
</div>
<div className="Fra-pro">
{products.map((product) => (
<div className="product" key={product.id}>
<h3>{product.name}</h3>
<img src={product.image} alt={product.name} className="product-image" />
</div>
))}
</div>
</div>
);
};

export default Franchise;