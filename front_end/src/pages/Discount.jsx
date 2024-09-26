import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import BlogItem from '../components/BlogItem/BlogItem'
import { ShopContext } from '../Context/ShopContext'

const Discount = () => {
  const {blogs} = useContext(ShopContext)
  
  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <Row className='w-100 d-flex  gap-5 justify-content-between'>
          <Col className='d-flex gap-2 flex-lg-row flex-column' md={12} sm={12}>
          {blogs.map((blog) => (
            <BlogItem key={blog.id} id={blog.id} title={blog.title} date={blog.date} image={blog.img} />
          ))}
          </Col>
        </Row>
      </Container>
      <Footer />
      
    </div>
  )
}

export default Discount