import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import {useGlobalContext} from '../context'
import {mobil} from '../responsive'
import CartInfo from '../components/cartinfo'
import ProductsDataService from '../services/products'
import SummaryInfo from '../components/summary'

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
margin-top: 30px;
`
const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 60vh;
margin: 20px 0;
`
const Cart = () => {
    const {cart, setCartItems, sum, reloadUser, userData, userLogged, setUserLoggedCart, sumUser, clearCartUser, cartUser} = useGlobalContext()
    useEffect(()=>{
        setCartItems(cart)
    },[cart])
 
    const clear = ()=>{
        if (userLogged){
            clearCartUser()
            reloadUser()
        } else {
            setCartItems([])
            document.location.reload()
        }
    }
  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag ({userLogged? sumUser : sum})</TopText>
                </TopTexts>
                <TopButton type='filled' onClick={clear}>CLEAR CART</TopButton>
            </Top>
            <Bottom>
                <Info>
                {
                    <CartInfo/>
                }
                </Info>
                <Summary>
                <SummaryInfo/>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart