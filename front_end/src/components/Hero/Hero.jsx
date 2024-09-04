import React, { useContext } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { assets } from '../../assets/assetss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Hero.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Hero = () => {
    const {navigate} = useContext(ShopContext)
    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col  onClick={() => navigate('/bestSeller')} xs={6} md={3} className='row-item d-flex flex-column py-3 align-items-center rounded-3 justify-content-center'>
                        <img src={assets.icon_7} style={{
                            width: '90px'
                        }} />
                        <p className='text-lg-center fs-2 text-uppercase fw-medium'>Best Seller</p>
                    </Col>
                    <Col  onClick={() => navigate('/orders')} xs={6} md={3} className='row-item d-flex flex-column py-3 align-items-center rounded-3 justify-content-center'>
                        <img src={assets.icon_8} style={{
                            width: '90px'
                        }} />
                        <p className='text-lg-center fs-2 text-uppercase fw-medium'>Đặt Hàng</p>
                    </Col>
                    <Col  onClick={() => navigate('/discount')} xs={6} md={3} className='row-item d-flex py-3 flex-column align-items-center rounded-3 justify-content-center'>
                        <img src={assets.icon_9} style={{
                            width: '90px'
                        }} />
                        <p className='text-lg-center fs-2 text-uppercase fw-medium'>Khuyến mãi</p>
                    </Col>
                    <Col  onClick={() => navigate('/store')} xs={6} md={3} className='row-item d-flex  py-3 flex-column align-items-center rounded-3 justify-content-center'>
                        <img src={assets.icon_10} style={{
                            width: '90px'
                        }} />
                        <p className='text-lg-center fs-2 text-uppercase fw-medium'>Cửa hàng</p>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Hero