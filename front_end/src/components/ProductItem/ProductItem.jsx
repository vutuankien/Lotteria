import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, oldPrice, price }) => {
    const { currency } = useContext(ShopContext);
  
    return (
        <Link to={`/product/${id}`} className="text-decoration-none text-black">
            <div className="border p-2 rounded-3 shadow">
                <img 
                    src={image} 
                    alt={`${name}`} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                />
                <div>
                    <h3 className="fs-4 mt-2">{name}</h3>
                    <p className="fs-4 fw-bold text-danger">
                        {price}.000{currency || 'VND'}
                    </p>
                    {oldPrice && (
                        <p className="fs-5">
                            <span className="text-secondary fw-medium text-decoration-line-through">
                                {oldPrice}.000{currency || 'VND'}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
