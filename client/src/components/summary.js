import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {useGlobalContext} from '../context'

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
cursor: pointer;
`
const Summary = ({subtotalUser, deliveryUser}) => {
    const {subtotal, delivery, userLogged, openShippingModal, total, totalUser} = useGlobalContext()
    const discount =  subtotal > 50 ? delivery: 0
    const discountUser =  subtotalUser > 50 ? deliveryUser: 0
    if (!userLogged){
        return (<>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                          <SummaryItemText>Subtotal:</SummaryItemText>
                          <SummaryItemPrice> $ {subtotal.toFixed(1)}</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Estimated Shipping:</SummaryItemText>
                          <SummaryItemPrice> $ {delivery.toFixed(1)}</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Shipping Discount:</SummaryItemText>
                          <SummaryItemPrice>$ {discount === 0 ? 0: `-${discount.toFixed(1)}` }</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem type='total'>
                          <SummaryItemText >Total:</SummaryItemText>
                          <SummaryItemPrice> $ {total.toFixed(2) }</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryButton onClick={openShippingModal}>CHECKOUT NOW</SummaryButton>
        </>
        )
    } else {
        return (<>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                          <SummaryItemText>Subtotal:</SummaryItemText>
                          <SummaryItemPrice> $ {subtotalUser.toFixed(1)}</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Estimated Shipping:</SummaryItemText>
                          <SummaryItemPrice> $ {deliveryUser.toFixed(1)}</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Shipping Discount:</SummaryItemText>
                          <SummaryItemPrice>$ {discountUser === 0 ? 0: `-${discountUser.toFixed(1)}` }</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem type='total'>
                          <SummaryItemText >Total:</SummaryItemText>
                          <SummaryItemPrice> $ {(totalUser).toFixed(2) }</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryButton onClick={openShippingModal}>CHECKOUT NOW</SummaryButton>
        </>
        )
    }
}

export default Summary