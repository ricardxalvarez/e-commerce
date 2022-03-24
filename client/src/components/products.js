import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './product'
import ProductsDataService from '../services/products'

const Container = styled.div`
display: flex;
padding: 20px;
flex-wrap: wrap;
justify-content: space-between;
`

const Products = () => {
  const [popProducts, setPopularProducts] = useState([])
  const popularProducts = popProducts.filter((item)=> item.hotsale !== false) 
  const numPage = 0
  const retrieveProducts = ()=>{
    ProductsDataService.getALLProducts()
    .then(response => {
      setPopularProducts(response.data.response)
    })
  }
  useEffect(()=>{
    retrieveProducts()
  },[])
  return (
    <Container>
      {
          popularProducts.map((item)=>{
              return <Product item={item} key={item.id}/>
          })
      }
    </Container>
  )
}

export default Products
