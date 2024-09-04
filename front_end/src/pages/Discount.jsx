import React from 'react'
import Footer from '../components/Footer/Footer'
import PolicyFooter from '../components/Policy_Footer/PolicyFooter'
import Container from 'react-bootstrap/esm/Container'
import FieldSlider from '../components/FieldSlider/FieldSlider'

const Discount = () => {
  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <FieldSlider />

        <div>
          {/* Here to render product that got the category === 'Discount' */}
        </div>
      </Container>

      <Footer />
      <PolicyFooter />
    </div>
  )
}

export default Discount