import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import * as Icon from 'react-bootstrap-icons';
import { assets } from '../../assets/assetss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ShopContext } from '../../Context/ShopContext';
const RelatedProduct = ({ category }) => {

    const { products, currency,navigate } = useContext(ShopContext)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Container>
            <div className='mt-5'>
                <div className='mt-3 d-flex justify-content-between align-items-center'>
                    <div>
                        <hr />
                        <p className='text-uppercase text-black fs-4 fw-bold'>Sản phẩm liên quan</p>
                    </div>

                    <button className='shadow-lg' onClick={() => navigate(`/${category}`)}>Xem tất cả <Icon.ArrowRight></Icon.ArrowRight></button>

                </div>

                <div className='mt-3'>
                    <Carousel fade className='z-0' responsive={responsive}>
                        {products.filter((item) => item.category === category).slice(0, 6).map((item, index) => {

                            return (
                                <div key={index} style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '10px',
                                    margin: '0 10px',
                                    padding: '10px'
                                }}>
                                    <img style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        padding: '10px'
                                    }} src={item.image} />
                                    <h2 className='text-center'>{item.name}</h2>
                                    <div className='d-flex justify-content-around'>
                                        <p className='text-danger fs-3 fw-bold'>{item.price}.000{currency}</p>
                                        <p className='text-muted fs-5 text-decoration-line-through'>{item.oldPrice}.000{currency}</p>
                                    </div>
                                    <button style={{
                                        width: '100%',
                                        backgroundColor: '#ec2c17',
                                        color: '#fff',
                                        borderRadius: '5px',
                                        padding: '10px',
                                        fontSize: '16px',
                                        zIndex: -1
                                    }}
                                    onClick={() => navigate(`/product/${item.id}`)}>Show More</button>
                                </div>
                            )

                        })}
                    </Carousel>
                </div>
            </div>
        </Container>
    )

}

export default RelatedProduct