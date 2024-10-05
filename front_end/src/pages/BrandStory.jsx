// src/components/BrandStory.jsx
import React from "react";
import "./BrandStory.css";

const BrandStory = () => {
  return (
    <div class="Bra-Sto">
      <div class="Bra">
        <h2 className="bg-transparent">GIỚI THIỆU VỀ LOTTERIA VIỆT NAM</h2>
        <p>
          Lotteria là chuỗi nhà hàng thức ăn nhanh trực thuộc tập đoàn Lotte –
          một trong năm tập đoàn lớn nhất Hàn Quốc. Suốt 7 năm liền đứng vị trí
          số 1 về “Brand Power”, được cấp bởi “ Korea Management Association”,
          và được chọn là vị trí số 1 về năng lực cạnh tranh thương hiệu với
          danh hiệu “Brand Stock” của cơ quan đánh giá giá trị thương hiệu.
          Trong suốt thời gian qua, Lotteria đã nỗ lực không ngừng để cung cấp
          cho khách hàng các dịch vụ chu đáo, ân cần và không ngừng nghiên cứu
          để phát triển nền văn hóa ẩm thực tốt cho sức khoẻ. Hơn nữa, để đảm
          bảo vệ sinh, an toàn thực phẩm và bảo vệ môi trường, Lotteria tự hào
          đạt được các chứng nhận quốc tế như: 

        </p>
        {/* <p>- An toàn thực phẩm (RVA HACCP).</p>
        <p>-Vệ sinh môi trường (ISO 14001)</p>
        <p>- Chất lượng sản phẩm (ISO 9001)</p> */}
        <p> Lotteria có mặt tại thị trường Việt Nam từ năm 1998. Hiện nay, mang
          tầm vóc của doanh nghiệp quốc tế, Lotteria đang dẫn đầu ngành công
          nghiệp ăn uống quốc nội với hơn 240 nhà hàng tại 52 tỉnh/thành trên cả
          nước. Đây là kết quả của những nỗ lực không ngừng mà Lotteria đạt
          được</p>
      </div>
      <div class="Bra-Box">
        <div class="Box-img">
          <img
            src="https://www.lotteria.vn/grs-static/images/about-1.png"
            alt="loteria"
          />
        </div>
        <div class="Box-text">
          <h3> VIETNAM LOTTERIA CO.LTD </h3>
          {/* <p>
           <p class="text"> Địa chỉ:</p> Tầng 15, Cobi Tower II số 2 - 4
            Đường số 8, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam
          </p>
          <p>
            <p class="text">Tel:</p>(84-8) 5416 1072 ~ 79</p>
          <p><p class="text">Fax:</p> (84-8) 5416 1080 ~ 81</p>
          <p> <p><p class="text">Email:</p></p> cskh@lotteria.vn </p> */}
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
