import { useState, useRef } from "react";

const useAddProduct = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [productName, setProductName] = useState("");
  const [productOldPrice, setOldPrice] = useState("");
  const [productNewPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(""); // subCategory có thể không chọn
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputFileRef = useRef(null);

  // Function to handle change in old price
  const handleOldPriceChange = (event) => {
    const price = event.target.value;
    setOldPrice(price);

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
    if (productOldPrice <= 0 || productNewPrice <= 0) {
      return false;
    }

    if (!imagePreview) {
      setErrorMessage("Vui lòng tải ảnh lên.");
      return false;
    }

    if (!category) {
      setErrorMessage("Vui lòng chọn danh mục.");
      return false;
    }

    // Không kiểm tra subCategory ở đây
    // Chúng ta có thể để trống subCategory mà không có lỗi

    try {
      const response = await fetch('http://localhost:5000/Foods');
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
    setErrorMessage("");

    const isValid = await validateInputs();
    if (!isValid) return;

    try {
      // Fetch all products to find the maximum ID
      const response = await fetch('http://localhost:5000/Foods');
      const products = await response.json();

      // Get the maximum ID and create a new ID
      const maxId = products.length ? Math.max(...products.map(product => parseInt(product.id))) : 0;
      const newProductId = (maxId + 1).toString(); // Chuyển ID mới thành chuỗi


      const newProduct = {
        id: newProductId, // Use new product ID
        name: productName,
        price: parseFloat(productNewPrice),
        oldPrice: parseFloat(productOldPrice),
        image: imagePreview,
        category: category,
        subCategory: subCategory || "", // Lưu subCategory, nếu không có thì để trống
      };

      const addResponse = await fetch('http://localhost:5000/Foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!addResponse.ok) {
        throw new Error('Network response was not ok');
      }

      // const result = await addResponse.json();
      // console.log('Product added:', result);

      setSuccessMessage('Sản phẩm đã được thêm thành công!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      setProductName("");
      setOldPrice("");
      setNewPrice("");
      setCategory("");
      setSubCategory(""); // Reset subCategory
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
    productOldPrice,
    handleOldPriceChange,
    productNewPrice,
    handleNewPriceChange,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    handleSubmit,
    inputFileRef,
    successMessage,
    errorMessage,
  };
};

export default useAddProduct;
