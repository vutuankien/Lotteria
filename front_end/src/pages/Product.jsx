import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import RelatedProduct from "../components/RelatedProduct/RelatedProduct";
import { toast } from "react-toastify";
import Footer from "../components/Footer/Footer";
import PolicyFooter from "../components/Policy_Footer/PolicyFooter";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, navigate, AddToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        return null;
      }
    });
  };

  useEffect(() => {
    console.log(productData);
    if (products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Lấy thông tin người dùng từ localStorage
    const userID = userInfo ? userInfo.id : null; // Lấy id của người dùng

    console.log("User ID:", userID); // Hiển thị userID trong console để kiểm tra
    if (userID) {
      AddToCart(userID, productData.id); // Sử dụng userID đã lấy được
      toast.success("Add Product Successfully!");
    } else {
      toast.error("Please login to add products to the cart.");
    }
  };

  return productData ? (
    <div className="w-100">
      <div style={{ width: "100%", marginTop: "850px" }}>
        <Container>
          <div style={{ width: "100%" }} className="d-flex justify-content-end">
            <button
              onClick={() => navigate("/bestSeller")}
              className="px-4 d-flex align-items-center rounded-5 py-2 gap-1 shadow-lg"
            >
              <Icon.ArrowLeft /> Quay lại
            </button>
          </div>
          <div
            style={{ width: "100%" }}
            className="d-flex flex-sm-row flex-column  justify-content-around mt-5"
          >
            <div>
              <img
                src={productData.image}
                width={"100%"}
                height={"400px"}
                alt="Product"
              />
            </div>
            <div>
              <div className="w-100 d-flex">
                <h2 className="bg-transparent fs-1 z-0">{productData.name}</h2>
              </div>
              <p className="fs-3 fw-bold text-danger">
                {productData.price}.000{currency}
              </p>
              <p className="fs-5">
                <Icon.Tag className="me-2" />
                <span className="text-muted fw-medium text-decoration-line-through">
                  {productData.oldPrice}.000{currency}
                </span>
              </p>
              <p className="fs-5 text-black">
                Bạn đã tiết kiệm được{" "}
                <span className="text-danger fw-bold">
                  {productData.oldPrice - productData.price}.000{currency}
                </span>{" "}
                sau khi được giảm giá
              </p>
              <hr
                style={{ width: "100%", height: "1px", backgroundColor: "#000" }}
              />
              <button
                className="w-100 mt-3 px-4 py-2 rounded-5 text-white bg-danger"
                onClick={handleAddToCart}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </Container>

        <RelatedProduct category={productData.category} />
        
      </div>
      <Footer />
        <PolicyFooter />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
