import { Add, Delete, Remove } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import {useGlobalContext} from '../context'
import {mobil} from '../responsive'
import { Link } from 'react-router-dom'


const Container = styled.div``
const Wrapper = styled.div``
const Title = styled.h1`
font-weight: 300;
text-align: center;
`
const Top = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
padding: 0 20px;
`
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props => props.type === 'filled' && 'none'};
background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
color: ${props => props.type === 'filled' && 'white'};
${mobil({
   margin: '10px',
   fontSize: '12px'
})}
`
const TopTexts = styled.div``
const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0 10px;
${mobil({
   display: 'none' 
})}
`
const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobil({
    flexDirection: 'column'
})}
`
const Info = styled.div`
flex: 3;
`
const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 60vh;
margin: 20px 0;
`
const Product = styled.div`
display: flex;
justify-content: space-between;
`
const ProductDetails = styled.div`
flex: 2;
display: flex;
${mobil({
   flexDirection: 'column' 
})}
`
const Image = styled.img`
width: 200px`
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`
const ProductName = styled.span`
margin-bottom: 10px;
`
const ProductID = styled.span`
margin-bottom: 10px;
`
const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
${props => props.color === 'white' &&
    {outline: '1px solid black'}
}
`
const ProductSize = styled.span`
margin-bottom: 10px;
`
const PriceDetail = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Amount = styled.span`
font-size: 24px;
margin: 5px;
`
const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
`
const ProductPrice = styled.span`
font-size: 30px;
font-weight: 200;
`
const Hr = styled.hr`
background-color: lightgrey;
border: none;
height: 1px;
`
const SummaryItem = styled.div`
margin: 30px 0;
display: flex;
justify-content: space-between;
font-weight: ${props => props.type === 'total' && '500'};
font-size: ${props => props.type === 'total' && '24px'};
`
const SummaryTitle = styled.h1`
font-weight: 200;
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const SummaryButton = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 300;
`
const Cart = () => {
    const {cartItems, setCartItems, delivery, subtotal, sum} = useGlobalContext()
    const filter = (id)=>{
        const newList = cartItems.filter((cart)=> cart.id !== id)
        setCartItems(newList)
    }
    const discount =  subtotal > 50 ? delivery: 0
  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag ({sum})</TopText>
                    <TopText>Your Wish List (0)</TopText>
                </TopTexts>
                <TopButton type='filled'>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                {
                    cartItems.map((item, index)=>{
                            const {id, img, title, quantity, price, color, size, productID} = item
                        return (<>
                            <Product key={index}>
                            <ProductDetails>
                            <Image src={img}></Image>
                            <Details>
                            <ProductName>
                            <b>Product: </b>
                            <Link to={`/product/${id}`} style={{textDecoration: 'none'}}>
                            {title}
                            </Link>
                            </ProductName>
                            <ProductID><b>ID: </b>{productID}</ProductID>                            
                            <ProductColor color={color}/>                            
                            <ProductSize><b>Size: </b>{size}</ProductSize>                            
                            </Details>
                            </ProductDetails>
                            <PriceDetail>
                            <ProductAmountContainer>
                            <Amount>{quantity}</Amount>
                            <Remove onClick={()=> filter(id)}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {quantity * price}</ProductPrice>
                            </PriceDetail>
                            </Product>
                            <Hr/>
                            </>
                            )

                    })
                }
                    
                </Info>
                <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Subtotal:</SummaryItemText>
                    <SummaryItemPrice> $ {subtotal}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping:</SummaryItemText>
                    <SummaryItemPrice> $ {delivery}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Shipping Discount:</SummaryItemText>
                    <SummaryItemPrice>$ {discount === 0 ? 0: `-${discount}` }</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type='total'>
                    <SummaryItemText >Total:</SummaryItemText>
                    <SummaryItemPrice> $ {subtotal + delivery - discount }</SummaryItemPrice>
                </SummaryItem>
                <SummaryButton>CHECKOUT NOW</SummaryButton>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart