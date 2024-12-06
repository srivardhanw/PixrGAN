import React from 'react'
import Navbar from './components/Nav'
import Main from './components/Main'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from './components/Footer';
export default function App() {
  return (
    <div className='main-container'>
      <Navbar></Navbar>
      <Main></Main>
      {/* <Footer></Footer> */}
    </div>



  )
}
