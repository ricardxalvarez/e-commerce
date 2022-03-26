import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Newsletter from '../components/newsletter'
import Product from '../components/product'
import ProductsDataService from '../services/products'
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'
import { mobil } from '../responsive'
const Container = styled.div``
const Title = styled.h1`
margin: 20px;
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
${mobil({
  flexDirection: 'column'
})}
`
const Filter = styled.div`
margin: 20px;
flex: 1;
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
const ProductContainer = styled.div`
display: flex;
padding: 20px;
flex-wrap: wrap;
justify-content: space-between;
`
const PageCtrl = styled.div`
display: flex;
flex-direction: row-reverse;
align-items: center;
flex: 1;
justify-content: center;
`
const PageShown =  styled.p``
const ChangePage = styled.button`
margin: 10px;
width: 30px;
height: 30px;
text-align: center;
`
const ProductList = () => {
  const [products, setProducts] = useState([])
  const [numPage, setNumPage] = useState(0)
  const [pages, setPages] = useState(0)
  const selected = useRef(null)
  const [sorted, setSorted] = useState("")
  const [categorySelected, setCategorySelected] = useState("")
useEffect(()=>{
  retrieveProducts()
  },[numPage, sorted])
useEffect(()=>{
  findCategory()
},[categorySelected])
const retrieveProducts = ()=>{
  ProductsDataService.getAllProducts(numPage)
  .then(response => {
    let tempList = response.data.products
      if (selected.current.value === 'all'){
        setProducts(tempList)
      } if (selected.current.value === 'pricedesc'){
        const newList = tempList.sort((a,b)=>{
          return a.price - b.price
        })
        setProducts(newList)
      }
       if (selected.current.value === 'priceasc'){
        const newList = tempList.sort((a,b)=>{
          return b.price - a.price
        })
        setProducts(newList)
      }
      setProducts(response.data.products)
      setPages(Math.ceil(response.data.total_results/response.data.entries_per_page))

    })
  }
      const sumPage = ()=>{
        setNumPage(numPage + 1)
        if ((numPage + 1) === pages){
            setNumPage(0)
        }
    }
    const sustractPage = ()=>{
    if (numPage >= 1){
      setNumPage(numPage - 1)
    }
  }
  const onSearchSort = (e)=>{
    setSorted(e.target.value)
    console.log(selected.current.value)
  }
  const findCategory = ()=>{
    ProductsDataService.find(categorySelected, 'category', numPage)
    .then(response =>{
      setProducts(response.data.products)
    })
  }
  const onCategory = (e)=>{
    setCategorySelected(e.target.value)
  }


  return (
    <Container>
      <Navbar/>
      <Announcements/>
      <Title>Cool Clothes</Title>
      <FilterContainer>
          <Filter><FilterText>Filter Products:</FilterText>
          <Select style={{marginTop: '10px'}} onChange={onCategory}>
              <Option disabled selected >Category</Option>
              <Option value='T-Shirts'>T-Shirts</Option>
              <Option value='Shirts'>Shirts</Option>
              <Option value='Polo'>Polo</Option>
              <Option value='Pants'>Pants</Option>
              <Option value='Joggers'>Joggers</Option>
              <Option value='Shorts'>Shorts</Option>
              <Option value='Beach Shorts'>Beach Shorts</Option>
              <Option value='Necklaces'>Necklaces</Option>
              <Option value='Bracelets'>Bracelets</Option>
              <Option value='Perfums'>Perfums</Option>
              <Option value='Hoddies'>Hoddies</Option>
              <Option value='Sweaters'>Sweaters</Option>
              <Option value='Watches'>Watches</Option>
              <Option value='Hats'>Hats</Option>
              <Option value='Chains'>Chains</Option>
              <Option value='Jackets'>Jackets</Option>
              <Option value='Boots'>Boots</Option>
              <Option value='Sneakers'>Sneakers</Option>
              <Option value='Shoes'>Shoes</Option>
              <Option value='Underwear'>Underwear</Option>
              <Option value='Rings'>Rings</Option>
              <Option value='Earings'>Earings</Option>
              <Option value='Other'>Other</Option>
          </Select>
          </Filter>
          <PageCtrl>
              <ChangePage onClick={sumPage}><AiOutlineArrowRight/></ChangePage>
              <PageShown>{numPage + 1}</PageShown>
              <ChangePage onClick={sustractPage}><AiOutlineArrowLeft/></ChangePage>
          </PageCtrl>
          <Filter type='button'  ><FilterText>Sort Products:</FilterText>
          <Select onChange={onSearchSort} ref={selected} style={{marginTop: '10px'}}>
            <Option value={'all'}>Default</Option>
            <Option value={'priceasc'}>Price (asc)</Option>
            <Option value={'pricedesc'}>Price (desc)</Option>
          </Select>
          </Filter>
      </FilterContainer>
      <ProductContainer>
      {
       products.map((item)=>{
          return <Product item={item} key={item.id}/>
       })
      }
    </ProductContainer>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default ProductList
