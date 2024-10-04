import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./Care.css"

const Care = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: " ",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (Object.values(formData).some((field) => field === "")) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Vui lòng điền đầy đủ thông tin trước khi gửi!",
            });
            return;
        }

        // If all fields are filled, show success message
        Swal.fire({
            icon: "success",
            title: "Bạn đã gửi thông tin liên hệ thành công!",
            text: "Chúng tôi sẽ liên lạc với quý khách thời gian sớm nhất.",
            confirmButtonText: "OK",
        });

        // Reset form after submission
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            message: "",
        });
    };

    return (
        <div class="box">
            <div class="left">
                <img src="https://www.lotteria.vn/grs-static/images/about-1.png" alt="Lotteria Image" />
                <p>Lotteria có mặt tại thị trường Việt Nam từ năm 1998 và cho đến nay đang là một trong những thương hiệu dẫn đầu ngành công nghiệp ăn uống quốc
                    nội với hơn 240 nhà hàng tại 52 tỉnh/thành trên cả nước.
                </p>
                <p> Thị trường Việt Nam được đánh giá là một trong những thị trường có tiềm năng lớn trong việc phát triển ngành F&B. Với mong muốn phát triển
                    ền vững và củng cố vị thế hàng đầu của mình ở thị trường sôi động này, từ tháng 10.2014, Lotteria bắt đầu nhượng quyền thương hiệu để hợp tác
                    cùng phát triển với các đối tác trên toàn quốc.
                </p>
                <p>ếu quý anh/chị có nhu cầu tham gia nhượng quyền thương hiệu Lotteria, quý anh/chị có thể để lại thông tin ngay bên cạnh hoặc liên
                    hệ qua hotline 1900 636 357 để chúng tôi có thể chủ động liên hệ lại với anh/chị.
                </p>
                <p> Xem thêm brochure giới thiệu về vốn đầu tư và quy trình nhượng quyền của Lotteria tại đây: https://goo.gl/NxQOnx</p>
            </div>
            <div className="franchise-form-container">
                <h2>THÔNG TIN LIÊN HỆ</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nhập tên của bạn"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại của bạn"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ của bạn"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <select name="city" value={formData.city} onChange={handleChange}>
                        <option value="hcm">Hồ Chí Minh</option>
                        <option value="hn">Hà Nội</option>
                        <option value="dn">Đà Nẵng</option>
                    </select>
                    <textarea
                        name="message"
                        placeholder="Nhập lời nhắn của bạn"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type="submit">Gửi Ngay</button>
                </form>
            </div>
        </div>
    );
};

export default Care;
