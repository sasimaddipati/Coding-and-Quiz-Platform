import React from 'react';
import './Display.css'
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Home from '../home/Home';
import Footer from '../footer/Footer'
const Display = () => {
  return (
    <div>
             <Header />
             
              <Outlet className='rowdy'/>
             <Footer />
    </div>
  );
};

export default Display;
