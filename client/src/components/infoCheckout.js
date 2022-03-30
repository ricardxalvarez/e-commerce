import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import ProductsDataService from '../services/products'
import StripeCheckout from 'react-stripe-checkout' 
import { useNavigate } from 'react-router-dom'
import { PayPalButton } from "react-paypal-button-v2"
import {IoBagCheckOutline} from 'react-icons/io5'
import { laptop } from '../responsive'
const InfoContainer = styled.div`
display:flex;
justify-content: center;
align-items: center;
margin: 50px 0;
flex-direction: column;
`
const ItemContainer = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
height: auto;
padding: 10px 15px;
border-radius: 5px;
box-shadow: -5px 5px 10px rgba(0,0,0,0.2);
`
const Title = styled.h2``
const TitleContainer = styled.div``
const DescContainer = styled.div`
display: flex;
flex-direction: column;
`
const Item = styled.div`
display: flex;
flex-direction: column;
${laptop({
  flexDirection: 'row'
})}
`
const ImgContainer = styled.div`
flex: 1;
overflow: hidden;
`
const Img = styled.img`
height: 100%;
width: 100%;
`
const Size = styled.span``
const ItemDescCont = styled.div`
flex: 1.2;
display: flex;
flex-direction: column;
${laptop({
  padding: '20px'
})}
`
const Quantity = styled.span``
const Desc = styled.span`
margin-top: 10px;
`
const Note = styled.span`
margin: auto;
padding: 10px 20px;
font-size: 15px;
`
const ButtonContainer = styled.div`
`
const Button = styled.button`
font-size: 17px;
padding: 6px 12px;
background-color: teal;
font-weight: 400;
margin: 0 10px;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
margin-bottom: 12px;
&:hover{
  background-color: rgb(0,110,128);
}
`
const TitlePay = styled.h1`
margin-top: 50px;
font-weight: 300;
text-transform: uppercase;
letter-spacing: 0.1rem;
`
const InfoCheckout = () => {
    const {shippingData, cartItems, userLoggedCart, userLogged, total, totalUser, userData, listOrder, setListOrder} = useGlobalContext()
    const [stripeToken, setStripeToken] = useState(null)
    const KEY = "pk_test_51Khxd2JZDTjaOgedKiwM2JnhX88eSm60NvhuF3CkliPa00uDIx7cdxxR3n4p2zoAThbWX8OJhqJBOeuGJtyNmws100wsuDZ9f5"
    const navigate = useNavigate()
    useEffect(()=>{
      console.log(listOrder)
    })
    const onToken = (token) => {
    setStripeToken(token)
  }
   useEffect(()=>{
    const makeRequest = async ()=>{
      let response = {
                tokendId: stripeToken,
                amount: total,
            }
      let responseUser = {
                tokendId: stripeToken,
                amount: totalUser,
            }
        let responseOrder = {
        userid: 400,
        cart: cartItems,
        status: "processing",
        total: total,
        email: shippingData.email,
        address: shippingData,
      }
      let responseOrderUser = {
        userid: userData._id,
        cart: userLoggedCart,
        status: "processing",
        total: totalUser,
        email: userData.email,
        address: shippingData,
      }      
        try {
          if (userLogged){
            const res = await ProductsDataService.fetchClient(responseUser) 
            await ProductsDataService.postOrder(responseOrderUser)
          } else {
            const res = await ProductsDataService.fetchClient(response)
            await ProductsDataService.postOrder(responseOrder)
            setListOrder([...listOrder, responseOrder])
          }
          navigate('/')
          document.location.reload()   
          window.scrollTo({top: 0})
               
        } catch (error) {
            console.log(error)
        }
    }
    stripeToken && makeRequest()
   }, [stripeToken]) 

  return (
    <InfoContainer>
      <ItemContainer>
          <TitleContainer><Title>Shipping</Title></TitleContainer>
          <DescContainer>
            <Desc><b>Full Name:</b> {shippingData.fullname}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Email:</b> {shippingData.email}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Phone:</b> {shippingData.phone}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Country:</b> {shippingData.country}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>State/Province:</b> {shippingData.state}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Town/City:</b> {shippingData.town}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Area, Colony, Street:</b> {shippingData.area}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
            <Desc><b>Flat, House no. Building, Company:</b> {shippingData.flat}</Desc>
            <div style={{height: '1px', width: '60%', background: 'rgba(0,0,0,0.3)'}}></div>
          </DescContainer>
      </ItemContainer>
      <ItemContainer>
          <TitleContainer><Title>Products</Title></TitleContainer>
          <DescContainer>
          {
              userLogged ?
              userLoggedCart.map((item, index)=>{
                  return <Item key={index}>
                  <ImgContainer>
                  <Img src={item.image}/>
                  </ImgContainer>
                  <ItemDescCont>
                    <Desc style={{fontSize: '20px'}}>{item.name}</Desc>
                    <Size>Color: {item.colors}</Size>
                    <Size>Size: {item.sizes}</Size>
                    <Size>Shipping: ${item.shipping}</Size>
                    <Size>Price: ${item.price}</Size>
                    <Quantity>Quantity: {item.quantity}</Quantity>
                  </ItemDescCont>
                  <hr/>
                  </Item>
              }) 
              : cartItems.map((item, index)=>{
                  return <Item key={index}>
                  <ImgContainer>
                  <Img src={item.image}/>
                  </ImgContainer>
                  <ItemDescCont>
                    <Desc style={{fontSize: '20px'}}>{item.name}</Desc>
                    <Size>Color: {item.colors}</Size>
                    <Size>Size: {item.sizes}</Size>
                    <Size>Shipping: ${item.shipping}</Size>
                    <Size>Price: ${item.price}</Size>
                    <Quantity>Quantity: {item.quantity}</Quantity>
                  </ItemDescCont>
                  <hr/>
                  </Item>
              })
          }
          {
              userLogged? 
              <span style={{padding: '25px'}}><b>Total:</b> ${totalUser}</span>
              : <span style={{padding: '25px'}}><b>Total:</b> ${total}</span>
          }
          </DescContainer>
      </ItemContainer>
      <TitlePay>Payment</TitlePay>
      <ButtonContainer>
          <StripeCheckout 
          name="Lama Shop" 
          currency="USD"
          amount={userLogged ? totalUser*100: total*100} 
          token={onToken} 
          stripeKey={KEY}>
          <Button><IoBagCheckOutline/> Pay using credit card</Button>
          </StripeCheckout>
          <PayPalButton
        amount={userLogged? totalUser: total}
        options={{
          clientId: "AXhKZvBEAfx1D1_CZBt0czWUGEJd5Hg-T67YyjiS0h5It_Pc15PxeMSDXnsaGws8HwHUPAjjhk-OC0f0",
          currency: "USD"
        }}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
        }}

        />
        </ButtonContainer>
        <Note><b>Note:</b> if you haven't logged in, it's IMPORTANT to provide a correct email, due to this is how we are going to update your order status</Note>
    </InfoContainer>
  )
}

export default InfoCheckout
