import { useState, useRef } from "react";

const useAddProduct = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [productName, setProductName] = useState("");
  const [productOldPrice, setOldPrice] = useState(""); // Đổi tên thành productOldPrice
  const [productNewPrice, setNewPrice] = useState(""); // Thêm productNewPrice
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const inputFileRef = useRef(null);

  // Function to handle change in old price
  const handleOldPriceChange = (event) => {
    const price = event.target.value;
    setOldPrice(price);

    // Check if old price is a positive number
    if (price <= 0) {
      setErrorMessage("Giá cũ phải lớn hơn 0.");
    } else {
      setErrorMessage("");
    }
  };

  // Function to handle change in new price
  const handleNewPriceChange = (event) => {
    const price = event.target.value;
    setNewPrice(price);

    // Check if new price is a positive number
    if (price <= 0) {
      setErrorMessage("Giá mới phải lớn hơn 0.");
    } else {
      setErrorMessage("");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resizeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (dataUrl) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 200;
      canvas.height = 200;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const resizedDataUrl = canvas.toDataURL("image/jpeg");
      setImagePreview(resizedDataUrl);
    };
  };

  const clearImage = () => {
    setImagePreview("");
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const validateInputs = async () => {
    // Check if the old price and new price have already been validated by handleChange
    if (productOldPrice <= 0 || productNewPrice <= 0) {
      return false;
    }

    // Check if an image has been uploaded
    if (!imagePreview) {
      setErrorMessage("Vui lòng tải ảnh lên.");
      return false;
    }

    // Check for duplicate product names in db.json
    try {
      const response = await fetch('http://localhost:3000/Foods');
      const products = await response.json();

      const productExists = products.some(product => product.name === productName);
      if (productExists) {
        setErrorMessage("Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.");
        return false;
      }
    } catch (error) {
      setErrorMessage("Lỗi khi kiểm tra tên sản phẩm.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous error message
    setErrorMessage("");

    // Validate inputs
    const isValid = await validateInputs();
    if (!isValid) return;

    const newProduct = {
      id: Date.now().toString(), // Tạo id duy nhất cho sản phẩm
      name: productName,
      price: parseFloat(productNewPrice), // Lưu giá mới vào price
      oldPrice: parseFloat(productOldPrice),
      image: imagePreview,
      category: isBestSeller ? "BestSeller" : "Regular", // Xác định loại sản phẩm
    };

    try {
      const response = await fetch('http://localhost:3000/Foods', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Product added:', result);

      setSuccessMessage('Sản phẩm đã được thêm thành công!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      setProductName("");
      setOldPrice(""); // Reset old price
      setNewPrice(""); // Reset new price
      setIsBestSeller(false);
      clearImage();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return {
    imagePreview,
    handleImageChange,
    clearImage,
    productName,
    setProductName,
    productOldPrice, // Thêm productOldPrice vào return
    handleOldPriceChange, // Thêm hàm xử lý cho oldPrice
    productNewPrice, // Thêm productNewPrice vào return
    handleNewPriceChange, // Thêm hàm xử lý cho newPrice
    isBestSeller,
    setIsBestSeller,
    handleSubmit,
    inputFileRef,
    successMessage,
    errorMessage,
  };
};

export default useAddProduct;
