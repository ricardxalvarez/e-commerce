import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import {useGlobalContext} from '../context'
import {mobil} from '../responsive'
import CartInfo from '../components/cartinfo'
import SummaryInfo from '../components/summary'
import reducerUser from '../reducer.user'
import ProductsDataService from '../services/products'
import Shipping from '../components/shipping'

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
    const {cart, setCartItems, sum, reloadUser, userLoggedCart, userLogged, setUserLoggedCart, sumUser, clearCartUser, userData, shippingModal, totalUser, setTotalUser} = useGlobalContext()
    let initialStateUser = {
        cartUser: userLoggedCart,
        subtotalUser: 0,
        deliveryUser: 0,
        amountUser: 0
    }
    const [stateUser, dispatchUser] = useReducer(reducerUser,initialStateUser)
    useEffect(()=>{
        setCartItems(cart)
    },[cart])
    const clear = ()=>{
        if (userLogged){
            setUserLoggedCart([])
            clearCartUser()
            reloadUser()
        } else {
            setCartItems([])
            document.location.reload()
        }
    }
    const increaseItemUser = (id)=>{
        dispatchUser({type: 'increase', payload: id})
    }
    const decreaseItemUser = (id)=>{
        dispatchUser({type: 'decrease', payload: id})
    }
    useEffect(()=>{
        dispatchUser({type : 'getSubtotal'})
        dispatchUser({type: 'getShipping'})
    }, [stateUser.cartUser])
    useEffect(()=>{
        if (userData.name){
            let response = {
                list: stateUser.cartUser,
                userid: userData._id
            }
            setUserLoggedCart(stateUser.cartUser)
            ProductsDataService.updateToCart(response)
        }
    },[stateUser.cartUser])
    useEffect(()=>{
        if (stateUser.subtotalUser > 50){
            setTotalUser((stateUser.subtotalUser))
        } else {
            setTotalUser(stateUser.subtotalUser + stateUser.deliveryUser)
        }
    },[initialStateUser])
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
                <TopButton type='filled' onClick={() => {
                    clear()
                    document.location.reload()
                    }}>CLEAR CART</TopButton>
            </Top>
            <Bottom>
                {
                    shippingModal &&
                   <Shipping/>
                }
                
                <Info>
                {
                    <CartInfo {...stateUser} decreaseItemUser={decreaseItemUser} increaseItemUser={increaseItemUser}/>
                }
                </Info>
                <Summary>
                <SummaryInfo {...stateUser} totalUser={totalUser}/>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart