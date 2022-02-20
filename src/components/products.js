import React from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './product'

const Container = styled.div`
display: flex;
padding: 20px;
flex-wrap: wrap;
justify-content: space-between;
`

const Products = () => {
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
