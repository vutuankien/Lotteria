import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { assets } from '../assets/assetss';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ProductItem from '../components/ProductItem/ProductItem'
import { ShopContext } from '../Context/ShopContext';
import FieldSlider from '../components/FieldSlider/FieldSlider';
import Footer from '../components/Footer/Footer'
import PolicyFooter from '../components/Policy_Footer/PolicyFooter'
// import './SpecialProduct.css'
const bestSeller = () => {

  const { products } = useContext(ShopContext)

  return (
    <>
      <Container>
        <div style={{ marginTop: '100px' }}>
          <FieldSlider />
          <div className='mt-5'>
            <Container style={{ marginTop: '100px' }}>
              <Row>
                {products.map((item, index) => {
                  if (item.category === 'BestSeller') {
                    return (
                      <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <ProductItem
                          name={item.name}
                          id={item.id}
                          price={item.price}
                          oldPrice={item.oldPrice}
                          image={item.image}
                        />
                      </Col>
                    )
                  }
                })}
              </Row>
            </Container>
          </div>
        </div>
      </Container>

      <Footer/>
      <PolicyFooter/>
    </>
  )

}

export default bestSeller