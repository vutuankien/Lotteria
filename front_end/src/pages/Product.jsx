import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';
import { toast } from 'react-toastify';

const Product = () => {
    const { productId } = useParams();
    const { products, navigate, currency } = useContext(ShopContext); 
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchProductData = () => {
            const item = products.find((item) => item.id === parseInt(productId)); // Match product by ID
            if (item) {
                setProductData(item);
            }
        };
        fetchProductData();
    }, [productId, products]);


    const handleClick = () => {
        toast.success("Add Product Successfully");
        return;
    }

    return productData ? (
        <div style={{ width: '100%', height: '100vh', marginTop: '100px' }}>
            <Container>
                <div style={{ width: '100%' }} className="d-flex justify-content-end">
                    <button 
                        onClick={() => navigate('/bestSeller')} 
                        className="px-4 d-flex align-items-center rounded-5 py-2 gap-1 bg-light shadow-lg"
                    >
                        <Icon.ArrowLeft /> Quay lại
                    </button>
                </div>
                <div style={{ width: '100%' }} className="d-flex flex-sm-row justify-content-around mt-5">
                    <div>
                        <img src={productData.image} width={'100%'} height={'400px'} alt="Product" />
                    </div>
                    <div>
                        <h2>{productData.name}</h2>
                        <p className="fs-3 fw-bold text-danger">{productData.price}.000{currency}</p>
                        <p className="fs-5">
                            <Icon.Tag className="me-2" />
                            <span className="text-muted fw-medium text-decoration-line-through">
                                {productData.oldPrice}.000{currency}
                            </span>
                        </p>
                        <p className="fs-5 text-black">
                            Bạn đã tiết kiệm được{' '}
                            <span className="text-danger fw-bold">
                                {productData.oldPrice - productData.price}.000{currency}
                            </span>{' '}
                            sau khi được giảm giá
                        </p>
                        <hr style={{ width: '100%', height: '1px', backgroundColor: '#000' }} />
                        <button
                            className="w-100 mt-3 px-4 py-2 rounded-5 text-white bg-danger"
                            onClick={handleClick}
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </Container>
            <RelatedProduct category={productData.category} />
            
        </div>
    ) : (
        <div className="opacity-0">Loading...</div>
    );
};

export default Product;
