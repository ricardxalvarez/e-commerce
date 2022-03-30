import React from 'react'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import InfoCheckout from '../components/infoCheckout'
import Navbar from '../components/navbar'

const Checkout = () => {
  return (
    <>
    <Navbar/>
    <Announcements/>
    <InfoCheckout/>
    <Footer/>
    </>
  )
}

export default Checkout