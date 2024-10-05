import React, { useContext, useState } from "react";
import { assets } from "../../assets/assetss";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { ShopContext } from "../../Context/ShopContext";

const FieldSlider = () => {
  const { responsive } = useContext(ShopContext);

  const [selected, setSelected] = useState(null);
  const cards = [
    {
      id: 1,
      img: assets.menu_dat_hang_bestSeller,
      title: "Best Seller",
      src: "bestSeller",
    },
    {
      id: 2,
      img: assets.menu_dat_hang_khuyen_mai,
      title: "Khuyến mại",
      src: "promotion",
    },
    {
      id: 3,
      img: assets.menu_dat_hang_thuc_uong,
      title: "Thức uống",
      src: "drink",
    },
    {
      id: 4,
      img: assets.menu_dat_hang_thuc_an_nhe,
      title: "Thức ăn nhẹ",
      src: "fastFood",
    },
    { id: 5, img: assets.menu_dat_hang_com_my, title: "Cơm-Mỳ Ý", src: "rice" },
    {
      id: 6,
      img: assets.menu_dat_hang_phan_nhom,
      title: "Phần ăn nhóm",
      src: "set",
    },
    { id: 7, img: assets.menu_dat_hang_value, title: "Value", src: "value" },
    { id: 8, img: assets.menu_dat_hang_combo, title: "Combo", src: "combo" },
    {
      id: 9,
      img: assets.menu_dat_hang_ga_ran_phan,
      title: "Gà rán Phần",
      src: "chickenSet",
    },
    {
      id: 10,
      img: assets.menu_dat_hang_ga_ran,
      title: "Gà Rán",
      src: "chicken",
    },
    {
      id: 11,
      img: assets.menu_dat_hang_burger,
      title: "Burger",
      src: "burger",
    },
  ];

  const handleClick = (id) => {
    setSelected(id);
  };
  return (
    <div style={{marginTop:'100px'}}>
      <Carousel fade className="z-0" responsive={responsive}>
        {cards.map((item, index) => (
          <Link
            to={`/${item.src}`}
            key={index}
            className="text-decoration-none text-black"
          >
            <div
              key={index}
              className="px-2"
              onClick={() => handleClick(item.id)}
              style={{
                border: selected === item.id ? "3px solid red" : "none",
                borderRadius: "25px",
                padding: "4px",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "25px",
                }}
                src={item.img}
              />
              <h2 className="text-center fs-6 bg-transparent">{item.title}</h2>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default FieldSlider;
