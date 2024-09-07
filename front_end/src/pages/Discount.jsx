import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Container } from 'react-bootstrap'

const Discount = () => {
  const {orders} = useContext(ShopContext)
  return (
    <div style={{marginTop:'100px'}}>
      <Container>
        {orders.map((item,index) => (
          
            <div key={index} className="border rounded p-3 mb-4">
            <p>ID: {item.id}</p>
              <h4>{item.name}</h4>
              <p>
                <strong>Time:</strong>{item.time}
                <br />
                <strong>Price:</strong> ${item.price}
                <br />
                <strong>Quantity:</strong>{item.quantity}
                <br />
                <strong>Status:</strong> ${item.status}
                <br />
                <strong>Total:</strong> ${item.price * item.quantity}
              </p>
            </div>
          
        ))}
      </Container>
    </div>
  )
}

export default Discount