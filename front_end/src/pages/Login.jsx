import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
const Login = () => {

  const {navigate} = useContext(ShopContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home'); 
    // onLogin()
  };

  return (
    <div style={{ height: '100vh' }} className='w-100 d-flex bg-dark  flex-column gap-5 align-items-center justify-content-center'>
      <div className='border border-light rounded-4 shadow bg-white d-flex flex-column p-3 justify-content-center align-items-center' style={{width:'400px'}}>
        <p className='fs-3 fw-bolder'>Login to continue</p>
        <button className='bg-primary rounded-2 text-white shadow-lg' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login