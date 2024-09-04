import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Slider from '../components/Slider/Slider'
import Hero from '../components/Hero/Hero'
import SpecialProduct from '../components/SpecialProduct/SpecialProduct'
import News from '../components/News/News'
import PolicyFooter from '../components/Policy_Footer/PolicyFooter'
const Home = () => {
  return (
    <div style={{width: '100%',height: '100vh'}}>
      <Navbar />
      <Slider/>
      <Hero/>
      <SpecialProduct/>
      <News/>
      <Footer/>
      <PolicyFooter/>
    </div>
  )
}

export default Home