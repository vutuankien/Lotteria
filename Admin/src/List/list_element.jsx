import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ListElement = ({ product, onDelete }) => {
  const { id, name, price, oldPrice, image, category } = product;

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      try {
        await axios.delete(`http://localhost:3000/Foods/${id}`);
        onDelete(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <Card className="list-element my-3 shadow-sm rounded p-0" style={{ width : '100%', position: 'relative' }}>
      <div className="product-row d-flex align-items-center py-1 px-2 border text-sm" style={{ width : '100%'}}>
        <p className="mb-0 d-flex align-items-center justify-content-start" style={{ flex: '1 1 20%' }}>
          <img
            src={image}
            alt={name}
            className="w-12"
            style={{ width: '50%', height: '50px', objectFit: 'cover' }}
          />
        </p>
        <p className="mb-0 d-flex align-items-center justify-content-start" style={{ flex: '1 1 20%' }}>
          {name}
        </p>
        <p className="mb-0 d-flex align-items-center justify-content-start" style={{ flex: '1 1 20%' }}>
          {price}
        </p>
        <p className="mb-0 d-flex align-items-center justify-content-start" style={{ flex: '1 1 20%' }}>
          {oldPrice ? `${oldPrice}` : 'N/A'}
        </p>
        <p className="mb-0 d-flex align-items-center justify-content-start" style={{ flex: '1 1 20%' }}>
          {category === "BestSeller" ? '✔️' : '⭕'}
        </p>
      </div>

      <Button
        variant="link"
        onClick={handleDelete}
        style={{
          lineHeight: '1',
          fontSize: '1.5rem',
          color: '#dc3545',
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          textDecoration : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#dc3545';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = 'red';
        }} 
      >
        &times;
      </Button>


    </Card>
  );
};

export default ListElement;
