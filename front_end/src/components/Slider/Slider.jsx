import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { assets } from '../../assets/assetss';
const Slider = () => {
    const image = [assets.banner_web,assets.Lotteria_banner_2,assets.Lotte_02]
    return (
        <Carousel fade className='z-0 ' style={{
            width: '100%',
            marginTop: '70px'
        }}>
        {
            image.map((item,index) => (
                    <Carousel.Item key={index}>
                        <img src={item} style={{
                            width: '100%',
                            height: '500px',
                            objectFit: 'cover'
                        }} />
            </Carousel.Item>))
        }
        </Carousel>
    )
}
export default Slider