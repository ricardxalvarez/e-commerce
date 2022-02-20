import React from 'react'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Newsletter from '../components/newsletter'
import Products from '../components/products'

const Container = styled.div``
const Title = styled.h1`
margin: 20px;
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`
const Filter = styled.div`
margin: 20px;
`
const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin: 20px;
`
const Select = styled.select`
margin-right: 20px;
padding: 10px;
`
const Option = styled.option`
`
const ProductList = () => {
  return (
    <Container>
      <Navbar/>
      <Announcements/>
      <Title>Dresses</Title>
      <FilterContainer>
          <Filter><FilterText>Filter Products:</FilterText>
          <Select>
              <Option disabled selected>Color</Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
          </Select>
          <Select>
              <Option disabled selected>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
          </Select>
          </Filter>
          <Filter><FilterText>Sort Products:</FilterText>
          <Select>
              <Option>Newest</Option>
              <Option>Prices (asc)</Option>
              <Option>Prices (desc)</Option>
          </Select>
          </Filter>
      </FilterContainer>
      <Products/>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default ProductList
