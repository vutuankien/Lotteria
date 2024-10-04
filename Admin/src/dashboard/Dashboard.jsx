import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Col, Container, Row } from 'react-bootstrap'
import Chart from '../Chart/Chart';
import LineChart from '../Chart/Chart';
import BarChart from '../Chart/Barchart';
import QuantityChart from '../Chart/QuantityChart';
// import { ShopContext } from '../../../front_end/src/Context/ShopContext';

const Dashboard = () => {
    // const {currency} = useContext(ShopContext)
    const [users, setUsers] = useState([])
    const userApi = 'http://localhost:3000/UsersAccount'

    const [foods, setFoods] = useState([])
    const foodAPI = 'http://localhost:3000/Foods'

    const [bills, setBills] = useState([])
    const billAPI = 'http://localhost:3000/Bills'

    useEffect(() => {
        axios.get(billAPI)
            .then(res => setBills(res.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get(foodAPI)
            .then(res => setFoods(res.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get(userApi)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    const totalMoney = bills.reduce((sum, order) => {
        return sum + order[0].totalPrice;
    }, 0);
    return (
        <div className='mt-4'>
            <Container>
                <Row className='d-flex gap-2 justify-content-around'>
                    <Col md={3} className='border shadow me-2  d-flex align-items-center justify-content-around' style={{
                        height: '150px',
                        borderRadius: '20px'
                    }}>
                        <div>
                            <Icon.Person style={{
                                fontSize: '40px'
                            }}></Icon.Person>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-content-center'>
                            <p style={{
                                fontSize: '25px',
                                fontWeight: 600

                            }} className='text-black fw-bolder' >Tài khoản</p>
                            <p className='fs-2 fw-bold text-dark text-center' style={{
                                fontSize: '30px',
                                fontWeight: 600
                            }}>{users.length}</p>
                        </div>
                    </Col>
                    <Col md={3} className='border shadow me-2 d-flex align-items-center justify-content-around' style={{
                        height: '150px',
                        borderRadius: "20px"
                    }}>
                        <div>
                            <Icon.Twitter style={{
                                fontSize: '40px'
                            }}></Icon.Twitter>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-content-center'>
                            <p style={{
                                fontSize: '25px',
                                fontWeight: 600

                            }} className='text-black fw-bolder' >Số món ăn</p>
                            <p className='fs-2 fw-bold text-dark text-center' style={{
                                fontSize: '30px',
                                fontWeight: 600
                            }}>{foods.length}</p>
                        </div>
                    </Col>
                    <Col md={3} className='border shadow me-2 d-flex align-items-center justify-content-around' style={{
                        height: '150px',
                        borderRadius: '20px'
                    }}>
                        <div>
                            <Icon.Coin style={{
                                fontSize: '40px'
                            }}></Icon.Coin>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-content-center'>
                            <p style={{
                                fontSize: '25px',
                                fontWeight: 600

                            }} className='text-black fw-bolder' >Tổng thu nhập</p>
                            <p className='fs-2 fw-bold text-dark text-center' style={{
                                fontSize: '30px',
                                fontWeight: 600
                            }}>{totalMoney}.000₫</p>
                        </div>
                    </Col>

                </Row>

                <Row className='mt-4 h-100' >
                    <Col md={6}>
                        <LineChart/>
                    </Col>
                    <Col md={6}>
                        <BarChart/>
                    </Col>
                </Row>
                <Row className='mt-4 h-100' >
                    <Col md={12}>
                        <QuantityChart/>
                    </Col>
                </Row>

                {/* <Row className='mt-4'>
                    <Col md={6}>
                        <select className='w-100 border p-2 rounded-4'>
                            {bills.map(item => (
                                <option key={item[0].id} value={item[0].id}>{item["0"].time.split(" ")[1]}</option>
                            ))}
                        </select>
                        
                    </Col>

                    
                </Row> */}

                
            </Container>
        </div>
    )
}

export default Dashboard