import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import { assets } from '../../assets/assetss';

const Searchbar = () => {
    const pathName = ['bestSeller', 'drink', 'fastFood', 'rice', 'set', 'promotion', 'chickenSet', 'combo', 'value', 'chicken', 'burger'];
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ API
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

    useEffect(() => {
        
        const currentCategory = pathName.find(path => location.pathname.includes(path));
        if (currentCategory && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, pathName, showSearch]);

    useEffect(() => {
        // Lọc sản phẩm dựa trên từ khóa tìm kiếm và category
        const filterProducts = () => {
            const currentCategory = pathName.find(path => location.pathname.includes(path));
            if (currentCategory) {
                const filtered = products.filter(product =>
                    product.category.toLowerCase() === currentCategory.toLowerCase() &&
                    product.name.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts([]);
            }
        };

        filterProducts();
    }, [search, location, products, pathName]);

    return showSearch && visible ? (
        <div className='h-100 p-3'
            style={{
                marginTop: '74px',
                position: 'fixed',
                zIndex: '100',
                width: '100%',
                left: '0',
                top: '0',
                backgroundColor: '#F9FAFB',
            }}>
            <div className='d-flex justify-content-center gap-2'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Tìm kiếm sản phẩm...'
                />
                <button onClick={() => setShowSearch(false)} className='btn btn-primary'>
                    <Icon.X className='fs-5' />
                </button>
            </div>
            <div>
                {search.trim() && filteredProducts.length > 0 ? (
                    <Container
                        className='mt-4'
                        style={{
                            maxHeight: '80vh', 
                            overflowY: 'auto'
                        }}>
                        <Row>
                            {filteredProducts.map((item, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <ProductItem
                                        name={item.name}
                                        id={item.id}
                                        price={item.price}
                                        oldPrice={item.oldPrice}
                                        image={item.image}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                ) : search.trim() && filteredProducts.length === 0 ? (
                    <div className='d-flex flex-column justify-content-center align-items-center'
                        style={{
                            width: '100vw',
                            height: '100vh',
                        }}>
                        <img src={assets.error} width={'400px'} />
                        <p className='fs-2 mt-2 fw-bold'>Không tìm thấy sản phẩm !!!</p>
                    </div>
                ) : null}
            </div>
        </div>
    ) : null;
};

export default Searchbar;
