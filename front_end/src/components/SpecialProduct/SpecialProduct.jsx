import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import * as Icon from 'react-bootstrap-icons';
import { assets } from '../../assets/assetss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './SpecialProduct.css'
import { ShopContext } from '../../Context/ShopContext';
const SpecialProduct = () => {

    const {currency} = useContext(ShopContext)
    const cards = [
        { id: 1, img: assets.I_coffee_matcha_latte_16, title: "Coffee Matcha Latte 16", price: "20", oldPrice: '$50' },
        { id: 2, img: assets.I_coffee_tr_i_d_u_t_y, title: "Coffee Triduty", price: "25", oldPrice: '50' },
        { id: 3, img: assets.I_coffee_tr_v_i_1, title: "Coffee Trvi", price: "40", oldPrice: '50' },
        { id: 4, img: assets.I_coffee_tra_kiwwi_chanh_da_y_1, title: "Coffee trà kiwi chanh dây", price: "10", oldPrice: '50' },
        { id: 5, img: assets.burger_I_chicken, title: "Burger I Chicken", price: "35", oldPrice: '50' },
        { id: 6, img: assets.burger_beef_teriyaki, title: "Burger Teriyaki", price: "12", oldPrice: '50' },
        { id: 7, img: assets.burger_bugogi_4, title: "Burger Bugogi", price: "42", oldPrice: '50' },
    ];
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
                        <p className='text-uppercase text-black fs-4 fw-bold'>Ưu đãi đặc biệt</p>
                    </div>

                    <button className='shadow-lg'>Xem tất cả <Icon.ArrowRight></Icon.ArrowRight></button>

                </div>

                <div className='mt-3'>
                    <Carousel fade className='z-0' responsive={responsive}>
                        {cards.map((item, index) => (
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
                                }} src={item.img} />
                                <h2 className='text-center'>{item.title}</h2>
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
                                    zIndex:-1
                                }}>Show More</button>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Container>
    )

}

export default SpecialProduct