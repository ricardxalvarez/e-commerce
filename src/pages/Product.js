import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Newsletter from '../components/newsletter'
import { useGlobalContext } from '../context'
import {popularProducts} from '../data'
import AddCo from '../components/add'
import { mobil } from '../responsive'

const Container = styled.div``
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobil({
    flexDirection: 'column'
})}
`
const ImgContainer = styled.div`
flex: 1;
`
const Img = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
${mobil({
    height: '50vh'
})}
`
const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;
${mobil({
   padding: '0 5px',
})}
`
const Title = styled.h1`
font-weight: 200;
${mobil({
   fontSize: '30px' 
})}
`
const Desc = styled.p`
margin: 20px 0p;
`
const Price = styled.p`
font-weight: 100;
font-size: 40px
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
margin: 30px 0;
${mobil({
   flexDirection: 'column',
   margin: '30px auto'
})}
`
const Filter = styled.div`
display: flex;
align-items: center;
${mobil({
   margin: '5px auto'
})}
`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
margin-left: 10px;
cursor: pointer;
${mobil({
   marginLeft: '0px',
   transform: 'translateX(10px)' 
})}
`
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
display: flex;
align-items: center;
width: 50%;
justify-content: space-between;
${mobil({
    flexDirection: 'column',
    margin: 'auto'
})}
`

const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background: white;
cursor: pointer;
font-weight: 500; 
transition: all 0.3s ease;
${props => props.proto === 'added' &&
{background: 'teal', }
}
${mobil({
   marginTop: '10px' 
})}

&:hover{
    background: #f8f4f4;
    ${props => props.proto === 'added' &&
    {background: 'teal'}
    }
}
`
const Product = () => {
    const {setCartItems, cartItems, quantity, increase, decrese} = useGlobalContext()
    const {id} = useParams()
    const item = popularProducts[id - 1]
    const {img, title, desc, price, shipping} =  item
    const [isElementAdded, setIsElementAdded] = useState(false)

    const newItem = {...item, quantity}

    const addTocart = () =>{
        if (!isElementAdded){
         setCartItems([...cartItems, newItem])
         setIsElementAdded(true)
     }
    }
    
  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <ImgContainer>
                <Img src={img} alt='please reload the page'/>
            </ImgContainer>
            <InfoContainer>
                <Title>{title}</Title>
                <Desc>{desc}</Desc>
                <Desc>Shipping: $ {shipping}</Desc>
                <Price>$ {price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color='black'/>
                        <FilterColor color='darkblue'/>
                        <FilterColor color='grey'/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>XS</FilterSizeOption>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XL</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AddCo quantity={quantity} decrese={decrese} increase={increase}/>
                    <Button onClick={addTocart} proto={isElementAdded? 'added': ''}>{isElementAdded? 'Added': 'ADD TO CART'}</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product