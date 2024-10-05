import React from "react";
import useAddProduct from "./Addlogic";
import './add.css';

const Add = () => {
  const {
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
  } = useAddProduct();

  return (
    <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
      {successMessage && (
        <div className="alert alert-success mt-3" style={{ position: 'absolute', top: '-50px', left: '200px', zIndex: '2000' }}>
          {successMessage}
        </div>
      )}

      <div className="col-md-9 col-lg-10 my-4 text-gray-600" style={{ margin: 'auto' }}>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {/* Upload Image */}
          <div>
            <p className="mb-2">Upload Image</p>
            <div className="d-flex gap-2" style={{ position: 'relative' }}>
              <label htmlFor="image1" className="d-flex align-items-center">
                <img
                  id="previewImage1"
                  className="object-cover"
                  style={{ width: '200px', height: '200px' }} // Thiết lập chiều dài và chiều rộng
                  src={imagePreview || "data:image/png;base64,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"}
                  alt="Product Preview"
                />

              </label>
              {imagePreview && (
                <button
                  type="button"
                  className="btn btn-danger position-absolute"
                  style={{ top: '0', left: '0', borderRadius: '50%' }}
                  onClick={clearImage}
                >
                  X
                </button>
              )}
              <input
                type="file"
                id="image1"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Product Old Price */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="productOldPrice">Product Old Price (VNĐ)</label>
              <input
                type="number"
                id="productOldPrice"
                className="form-control"
                value={productOldPrice}
                onChange={handleOldPriceChange}
                required
              />
            </div>
          </div>

          {/* Product New Price */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="productNewPrice">Product New Price (VNĐ)</label>
              <input
                type="number"
                id="productNewPrice"
                className="form-control"
                value={productNewPrice}
                onChange={handleNewPriceChange}
                required
              />
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" style={{ position: 'absolute', top: '-50px', left: '200px', zIndex: '2000' }}>
              {errorMessage}
            </div>
          )}

          {/* Category and Subcategory Selection */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="category" style={{ marginRight: '0.5rem' }}>Category :</label>
              <select
                id="category"
                className="form-select"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="BestSeller">Best Seller</option>
                <option value="drink">Drink</option>
                <option value="discount">Discount</option>
                <option value="fastFood">Fast Food</option>
                <option value="rice">Rice</option>
                <option value="calue">Value</option>
                <option value="combo">Combo</option>
                <option value="chickenSet">Chicken Set</option>
                <option value="chicken">Chicken</option>
                <option value="burger">Burger</option>
              </select>
            </div>


            <div className="col-md-6">
              <label htmlFor="subCategory" style={{ marginRight: '0.5rem' }}>Subcategory : </label>
              <select
                id="subCategory"
                className="form-select"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select Subcategory (optional)</option>
                <option value="Set">Set</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
