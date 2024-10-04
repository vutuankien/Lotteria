import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Bill = () => {

    const [bill, setBill] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/Bills")
        .then(res => setBill(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div style={{ marginTop: '100px' }}>
            {bill.map(item => (
                <div key={item.id}>
                    <h3>Bill ID: {item.id}</h3>
                    <div>
                        <p>Order ID: {item["0"].orderId}</p>
                        <p>User ID: {item["0"].userId}</p>
                        <p>Total Price: {item["0"].totalPrice}</p>
                        <p>Status: {item["0"].status}</p>
                        <div>
                            <h4>Products:</h4>
                            {item["0"].products.map((product, index) => (
                                <div key={index}>
                                    <p>Product ID: {product.productId}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Bill
