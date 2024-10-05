import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListElement from './list_element';

const List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Foods');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
      <div className="col-md-9 col-lg-10 my-4 text-gray-600" style={{ width: '100%', margin: 'auto' }}>
        <div className="product-row d-flex align-items-center py-1 px-2 border text-sm"
          style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
          <p className="flex-fill mb-0 d-flex align-items-center justify-content-start"
            style={{ flex: '1 1 20%' }}>Image</p>
          <p className="flex-fill mb-0 d-flex align-items-center justify-content-start"
            style={{ flex: '1 1 20%' }}>Name</p>
          <p className="flex-fill mb-0 d-flex align-items-center justify-content-start"
            style={{ flex: '1 1 20%' }}>New price</p>
          <p className="flex-fill mb-0 d-flex align-items-center justify-content-start"
            style={{ flex: '1 1 20%' }}>Old price</p>
          <p className="flex-fill mb-0 d-flex align-items-center justify-content-start"
            style={{ flex: '1 1 20%' }}>Bestseller</p>
        </div>

        {products.map(product => (
          <ListElement key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#dc3545', // Change color to #dc3545
          color: 'white',
          width: '50px', // Decreased size
          height: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: products.length > 0 ? 'block' : 'none', // Hide if no products
        }}
        title="Quay về đầu trang" // Tooltip on hover
      >
        {/* Thay đổi mũi tên thành SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ width: '24px', height: '24px', margin: 'auto' }} // Kích thước SVG
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default List;
