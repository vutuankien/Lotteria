import React from 'react'
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import { assets } from '../../assets/assetss';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './Footer.css'
const Footer = () => {
  return (

    <div className='mt-5 p-3' style={{backgroundColor: '#FFEAE3',marginTop: '30px',padding: '30px 0px'}}>
      <Row>
        <Col sm={12} md={6}>
          <div className='d-flex justify-content-center'>
            <img src={assets.lotteria_logo} style={{ width: '50px', height: '50px' }} />
          </div>
          <div className='mt-4 d-flex flex-column align-items-center'>
            <p className='text-black text-center text-capitalize fw-bold' style={{ fontSize: '24px' }}>Đăng ký nhận thông tin khuyến mãi</p>
            <div style={{ width: '100%' }} className='d-flex  justify-content-center'>

              <input type='email' placeholder='Nhập Email của bạn' />
              <Button>Gửi ngay</Button>

            </div>
          </div>
        </Col>
        <Col sm={12} md={2} className='d-flex flex-column align-items-center'>
          <div>
            <h3 className='fs-3'>Thông tin</h3>
            <p className='text-black fs-5'>Tin tức</p>
            <p className='text-black fs-5'>Khuyến mãi</p>
            <p className='text-black fs-5'>Tuyển dụng</p>
            <p className='text-black fs-5'>Nhượng quyền</p>
          </div>

        </Col>
        <Col sm={12} md={2} className='d-flex flex-column align-items-center'>
          <div>
            <h3 className='fs-3'>Hỗ trợ</h3>
            <p className='text-black fs-5'>Điều khoản sử dụng</p>
            <p className='text-black fs-5'>Chính sách bảo mật</p>
            <p className='text-black fs-5'>Chính sách giao hàng</p>
            <p className='text-black fs-5'>Chăm sóc khách hàng</p>
          </div>
        </Col>
        <Col sm={12} md={2} className='d-flex flex-column align-items-center'>
          <div>
            <h3 className='fs-3'>Theo dõi</h3>
            <p className='text-black fs-5'><Icon.Facebook style={{ marginRight: '5px', fontSize: '20px' }}></Icon.Facebook>Facebook</p>
            <p className='text-black fs-5'><Icon.Instagram style={{ marginRight: '5px', fontSize: '20px' }}></Icon.Instagram>Instagram</p>
            <p className='text-black fs-5'><Icon.Twitter style={{ marginRight: '5px', fontSize: '20px' }}></Icon.Twitter>Twitter</p>
            <img src={assets.bct} />
          </div>
        </Col>
      </Row>


    </div>
  )
}

export default Footer