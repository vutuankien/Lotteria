import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { Button, Container } from 'react-bootstrap'
import Footer from "../components/Footer/Footer"
import * as Icon from 'react-bootstrap-icons';
import PolicyFooter from '../components/Policy_Footer/PolicyFooter'
const DiscountDetail = () => {
  const { blogId } = useParams()
  const { blogs,navigate } = useContext(ShopContext)
  const [blogData, setBlogData] = useState(false)

  useEffect(() => {
    const fetchBlogData = () => {
      const foundBlog = blogs.find((item) => item.id === blogId);
      if (foundBlog) {
        setBlogData(foundBlog);
      }
    };

    if (blogs.length > 0) {
      fetchBlogData();
    }
  }, [blogId, blogs]);
  return blogData ? (
    <div style={{ width: '100%', marginTop: '100px' }}>
      <Container className='w-100'>
        <div className='w-100 d-flex justify-content-center'>
          <img src={blogData.img} width={'90%'} height={'400px'} />
        </div>
        <div className='w-100 d-flex justify-content-center mt-5'>
          <p className='mt-2 fs-2 fw-bold'>{blogData.title}</p>
        </div>
        <div>
          <p className='fs-3 text-black fw-semibold'>{blogData.subtitle ? blogData.subtitle : ""}</p>
          <div className='fs-4 text-dark'>{blogData.content.split('\n').map((line, index) => (
            <p key={index} className='text-dark'>
              {line}
            </p>
          ))}</div>
        </div>
        <div className='w-100 d-flex justify-content-center mt-5'>
          <Button className='px-3 py-2 text-capitalize btn btn-danger d-flex align-items-center gap-2' onClick={() => navigate("/promotion")}><Icon.ArrowLeft className='fs-4'></Icon.ArrowLeft>Mua ngay</Button>
        </div>
      </Container>
      <Footer/>
      <PolicyFooter/>
    </div>
  ) : null
}

export default DiscountDetail