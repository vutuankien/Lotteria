import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import Sidebar from './Sidebar/Sidebar.jsx';
import Add from './Add/Add.jsx'; // Component Add
import List from './List/List'; // Component List
import Orders from './Orders/Orders'
import Chat from './Chat/Chat'
import Customer from './Customers/Customer'
import Bills from './Bills/Bills.jsx'
import Dashboard from './dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <div className='web'>
        <Header />
        <div className='main d-flex' style={{ display: 'flex', width: '100%', position: 'relative' }}>
          <Sidebar className='sidebar flex-shrink-0'/>
          <div className="content flex-grow-1 ms-3">
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/customers" element={<Customer />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
