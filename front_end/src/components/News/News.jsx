import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import * as Icon from 'react-bootstrap-icons';
import { assets } from '../../assets/assetss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './News.css'
import { Link } from 'react-router-dom';
const News = () => {


    const cards = [
        { id: 3, img: assets.birthday, title: "SINH NHẬT THÊM BÁNH, BÉ YÊU THÊM VUI – GIÁ CHỈ TỪ 78K/BÉ" },
        { id: 4, img: assets.hotCake, title: "BÁNH 'NÓNG' CHO MÙA ĐÔNG" },
        { id: 2, img: assets.downloadApp, title: "TẢI APP NHẬN QUÀ - ĂN NGON THẢ GA TẠI LOTTERIA" },

    ];
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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
                        <p className='text-uppercase text-black fs-4 fw-bold'>Tin Tức</p>
                    </div>

                    <button className='shadow-lg'>Xem tất cả <Icon.ArrowRight></Icon.ArrowRight></button>

                </div>

                <div className='mt-3'>
                    <Carousel fade className='z-0' responsive={responsive}>
                        {cards.map((item, index) => (
                            <Link to={`/discount/${item.id}`} className='text-black text-decoration-none'>
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
                                <h2 className='text-left'
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize:"20px"
                                    }}
                                >{item.title}</h2>
                                <div className='d-flex justify-content-around'>
                                    <p className='text-muted fs-4 text-decoration-line-through'>{item.oldPrice}</p>
                                    <p className='text-danger fs-2 fw-bold'>{item.price}</p>
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
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Container>
    )

}

export default News