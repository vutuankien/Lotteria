import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assetss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import Image from 'react-bootstrap/Image';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-toastify';
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { navigate, getQuantity,showSearch, setShowSearch } = useContext(ShopContext)


  const handleSearchBarClick = () => {
        setShowSearch(true);
};

  const handleClick = (page) => {
    setActivePage(page);
    setVisible(false);
  };

  return (
    <div>
      <Navbar className='position-fixed top-0 start-0 end-0 bNavbar z-1 shadow d-flex justify-content-center align-content-center' bg='light' data-bs-theme='dark'>
        <Container>
          <div className='d-flex align-items-center'>
            <Link to='/'>
              <img src={assets.lotteria_logo} style={{ width: '60px' }} className='me-2' />
            </Link>
            <Nav className='me-auto d-none d-md-block d-md-flex'>
              <NavLink to='/bestSeller' onClick={() => handleClick('bestSeller')} className={`text-decoration-none fw-bold d-flex flex-column align-items-center ${activePage === 'bestSeller' ? 'text-danger underline' : 'text-black'}`}>
                <p className='text-uppercase fs-5 px-2'>Best Seller</p>
              </NavLink>
              <NavLink to='/set' onClick={() => handleClick('orders')} className={`text-decoration-none fw-bold d-flex flex-column align-items-center ${activePage === 'orders' ? 'text-danger underline' : 'text-black'}`}>
                <p className='text-uppercase fs-5 px-2'>Đặt hàng</p>
              </NavLink>
              <NavLink to='/discount' onClick={() => handleClick('discount')} className={`text-decoration-none fw-bold d-flex flex-column align-items-center ${activePage === 'discount' ? 'text-danger underline' : 'text-black'}`}>
                <p className='text-uppercase fs-5 px-2'>Khuyến mãi</p>
              </NavLink>
              <NavLink to='/store' onClick={() => handleClick('store')} className={`text-decoration-none fw-bold d-flex flex-column align-items-center ${activePage === 'store' ? 'text-danger underline' : 'text-black'}`}>
                <p className='text-uppercase fs-5 px-2'>Cửa hàng</p>
              </NavLink>
            </Nav>
          </div>

          <div className='d-flex gap-3 menu'>
            <div className='px-2 py-2 d-flex shadow-lg border rounded-circle' onClick={() => handleSearchBarClick()} style={{ cursor: 'pointer' }}>
              <Icon.Search></Icon.Search>
            </div>
            <div onClick={() => navigate('/cart')} className='menu-icon px-2 py-2 d-flex position-relative shadow-lg border rounded-circle' style={{ cursor: 'pointer' }}>
              <Icon.Cart></Icon.Cart>
              <div className='position-absolute  bg-danger text-light ' style={{
                top: '-14px',
                right: '-7px',
                fontSize: '18px',
                padding: '2px 9px',
                borderRadius: '100%'
              }}>{getQuantity()}</div>
            </div>
            <div
              onClick={() => setShowSubMenu(!showSubMenu)} // Toggle sub-menu on click
              className='position-relative menu-icon d-flex shadow-lg border rounded-circle'
              style={{ cursor: 'pointer' }}
            >
              <Image src={assets.Lotte_02} width={'33px'} height={'33px'} roundedCircle />
              <div
                className={`position-absolute mt-4 rounded-3 shadow-lg p-3 end-0 bg-white ${showSubMenu ? 'd-block' : 'd-none'}`}
                style={{ width: '250px' }}
              >
                <p className='text-black fs-5'><Icon.Person className='me-2'></Icon.Person>Thông tin tài khoản</p>
                <p className='text-black fs-5'><Icon.GeoAlt className='me-2'></Icon.GeoAlt>Địa chỉ giao hàng</p>
                <p className='text-black fs-5'><Icon.Book className='me-2'></Icon.Book>Lịch sử đơn hàng</p>
                <p className='text-black fs-5'><Icon.Chat className='me-2'></Icon.Chat>Hỗ trợ</p>
                <p className='text-black fs-5'><Icon.BoxArrowInLeft className='me-2'></Icon.BoxArrowInLeft>Đăng xuất</p>
              </div>
            </div>


            <div className='menu-icon px-2 py-2 d-flex shadow-lg border rounded-circle d-block d-sm-none' onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>
              <Icon.List></Icon.List>
            </div>
          </div>
        </Container>
      </Navbar>


      {/* For mobile screen */}
      <div className={`mobile-menu ${visible ? 'open' : ''} z-1 position-fixed top-0 end-0 start-0 bottom-0`} style={{ width: '100%', height: '100vh' }}>
        <NavLink to='/' className='text-decoration-none text-black fw-bold' onClick={() => setVisible(false)}>
          <p className='text-uppercase fs-5 px-2 d-flex align-items-center gap-2 shadow-sm '>
            <Icon.ArrowLeft></Icon.ArrowLeft> Back
          </p>
        </NavLink>
        <NavLink
          to='/bestSeller'
          className='text-decoration-none fw-bold'
          onClick={() => handleClick('bestSeller')}
        >
          <p className={`text-uppercase fs-5 px-2 py-2 ${activePage === 'bestSeller' ? 'text-white bg-danger' : ''}`}>Best Seller</p>
        </NavLink>
        <NavLink
          to='/set'
          className='text-decoration-none fw-bold'
          onClick={() => handleClick('orders')}
        >
          <p className={`text-uppercase fs-5 px-2 py-2 ${activePage === 'orders' ? 'text-white bg-danger' : ''}`}>Đặt hàng</p>
        </NavLink>
        <NavLink
          to='/discount'
          className='text-decoration-none fw-bold'
          onClick={() => handleClick('discount')}
        >
          <p className={`text-uppercase fs-5 px-2 py-2 ${activePage === 'discount' ? 'text-white bg-danger' : ''}`}>Khuyến mãi</p>
        </NavLink>
        <NavLink
          to='/store'
          className='text-decoration-none fw-bold'
          onClick={() => handleClick('store')}
        >
          <p className={`text-uppercase fs-5 px-2 py-2 ${activePage === 'store' ? 'text-white bg-danger' : ''}`}>Cửa hàng</p>
        </NavLink>
      </div>

    </div>
  );
};

export default NavBar;
