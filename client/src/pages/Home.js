import  Announcement  from '../components/announcements'
import React from 'react'
import Navbar from '../components/navbar'
import Slider from '../components/slider'
import Categories from '../components/categories'
import Products from '../components/products'
import Newsletter from '../components/newsletter'
import Footer from '../components/footer'

function Home() {
  return (<>
      <Announcement/>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Products/>
      <Newsletter/>
      <Footer/>
      </>

  )
}

export default Home
