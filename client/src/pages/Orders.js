import React from 'react'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import OrderInfo from '../components/orderInfo'

const Orders = () => {
  return (<>
    <Navbar/>
    <Announcements/>
    <OrderInfo/>
    <Footer/>
  </>
  )
}

export default Orders