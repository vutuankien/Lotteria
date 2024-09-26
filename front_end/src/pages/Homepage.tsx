import React from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from '../components/Navbar/Navbar'
import Searchbar from '../components/SearchBar/Searchbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import BestSeller from "./BestSeller"
import Cart from './Cart'
import Product from './Product'
import Discount from './Discount'
import Store from './Store'
import Drink from './Drink'
import FastFood from './FastFood'
import Rice from './Rice'
import Set from './Set'
import Promotion from './Promotion'
import ChickenSet from './ChickenSet'
import Value from './Value'
import Chicken from './Chicken'
import Burger from './Burger'
import NextStep from './NextStep'
const Homepage = () => {
  return (
    <div style={{width:'100%'}}>

        <ToastContainer autoClose={1000}/>
        <NavBar/>
        <Searchbar/>
        <Routes>
        <Route path="/homepage/home" element={<Home />} />
        <Route path="/homepage/bestSeller" element={<BestSeller/>} />
        <Route path="/homepage/cart" element={<Cart />} />
        <Route path="/homepage/product/:productId" element={<Product />} />
        <Route path="/homepage/discount" element={<Discount />} />
        <Route path="/homepage/store" element={<Store />} />
        <Route path="/homepage/drink" element={<Drink />} />
        <Route path="/homepage/fastFood" element={<FastFood />} />
        <Route path="/homepage/rice" element={<Rice />} />
        <Route path="/homepage/set" element={<Set />} />
        <Route path="/homepage/promotion" element={<Promotion />} />
        <Route path="/homepage/chickenSet" element={<ChickenSet/>}/>
        <Route path="/homepage/value" element={<Value />} />
        <Route path="/homepage/chicken" element={<Chicken />} />
        <Route path="/homepage/burger" element={<Burger />} />
        <Route path="/homepage/next_step" element={<NextStep />} />
        </Routes>
    </div>
  )
}

export default Homepage