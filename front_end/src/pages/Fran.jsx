import React from "react";
import "./Fran.css";

import Image1 from "../assets/kien.jpg";
import Image2 from "../assets/hung.jpg";
import Image3 from "../assets/ngoc.jpg";
import Image4 from "../assets/dang.jpg";
import { assets } from "../assets/assetss";

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
            <img src={assets.team} className="w-100 rounded-1 shadow mb-3" style={{ height: '500px' }} />
            <div className="Fra-text">
                <p className="bg-transparent">
                    Chúng tôi là một đội ngũ gồm bốn thành viên tràn đầy năng lượng, sáng tạo và luôn hướng tới sự hoàn thiện. Mỗi thành viên mang đến những kỹ năng và kinh nghiệm đa dạng từ các lĩnh vực khác nhau như quản lý, thiết kế, phân tích, và công nghệ. Điều này giúp chúng tôi có một cái nhìn đa chiều, giải quyết vấn đề một cách toàn diện và sáng tạo hơn.
                    <br/>
                    Chúng tôi luôn phấn đấu để phát triển không chỉ về mặt chuyên môn mà còn trong cách làm việc nhóm, hỗ trợ lẫn nhau để cùng đạt được những thành công vượt trội. Đam mê và tinh thần đồng đội là những yếu tố giúp chúng tôi vượt qua mọi thách thức, không ngừng cải thiện quy trình và cách thức triển khai dự án. Bên cạnh đó, chúng tôi cũng luôn tìm kiếm những phương pháp mới mẻ để nâng cao chất lượng công việc, đảm bảo rằng mỗi sản phẩm chúng tôi tạo ra đều mang dấu ấn riêng và giá trị bền vững.
                    <br/>
                    Với sự đồng lòng, chúng tôi tin rằng có thể chinh phục mọi mục tiêu và mở ra những cơ hội mới trong tương lai.
                </p>
            </div>
            <div className="Fra-pro">
                {products.map((product) => (
                    <div className="product shadow-lg" key={product.id}>
                        <h3 className="text-center">{product.name}</h3>
                        <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Franchise;