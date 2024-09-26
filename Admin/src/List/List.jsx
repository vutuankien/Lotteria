import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListElement from './list_element';

const List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Foods');
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

  return (
    <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
      <div className="col-md-9 col-lg-10 my-4 text-gray-600 " style={{ width : '100%',margin : 'auto' }}>
        <div className="product-row d-flex align-items-center py-1 px-2 border text-sm"
        style={{width : '100%', backgroundColor : '#e0e0e0'}}>
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
    </div>
  );
};

export default List;
