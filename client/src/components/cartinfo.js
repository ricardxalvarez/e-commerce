import React from 'react'
import styled from 'styled-components'
import { Add,  Remove } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {mobil} from '../responsive'
import { useGlobalContext } from '../context'

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
const CartInfo = ({increaseItemUser, decreaseItemUser}) => {
    const {increaseItem, decreaseItem, cartItems, userLogged, userLoggedCart} = useGlobalContext()
    if (!userLogged){
        return (
              cartItems
              .map((item, index)=>{
                  return (<div key={index}>
                      <Product>
                      <ProductDetails>
                              <Image src={item.image}></Image>
                              <Details>
                              <ProductName>
                              <b>Product: </b>
                              <Link to={`/product/${item.id}`} onClick={()=> window.scrollTo({top : 0})} style={{textDecoration: 'none'}}>
                              {item.name}
                              </Link>
                              </ProductName>
                              <ProductID><b>ID: </b>{item.id}</ProductID>                            
                              <ProductSize><b>Color: </b>{item.colors}</ProductSize>                            
                              <ProductSize><b>Size: </b>{item.sizes}</ProductSize>                            
                              </Details>
                              </ProductDetails>
                              <PriceDetail>
                              <ProductAmountContainer>
                              <Add onClick={()=> increaseItem(item.id)}/>
                              <Amount>{item.quantity}</Amount>
                              <Remove onClick={()=> decreaseItem(item.id)}/>
                              </ProductAmountContainer>
                              <ProductPrice>$ {(item.quantity * item.price).toFixed(2)}</ProductPrice>
                              </PriceDetail>
                              </Product>
                              <Hr/>
                              </div>
                              )
                          })               
      )
    } else {
        return (

            userLoggedCart.map((item, index)=>{
                return (<div key={index}>
                    <Product>
                      <ProductDetails>
                              <Image src={item.image}></Image>
                              <Details>
                              <ProductName>
                              <b>Product: </b>
                              <Link to={`/product/${item.id}`} style={{textDecoration: 'none'}}>
                              {item.name}
                              </Link>
                              </ProductName>
                              <ProductID><b>ID: </b>{item.id}</ProductID>                            
                              <ProductSize><b>Color: </b>{item.colors}</ProductSize>                            
                              <ProductSize><b>Size: </b>{item.sizes}</ProductSize>                            
                              </Details>
                              </ProductDetails>
                              <PriceDetail>
                              <ProductAmountContainer>
                              <Add onClick={()=> increaseItemUser(item.id)}/>
                              <Amount>{item.quantity}</Amount>
                              <Remove onClick={()=> decreaseItemUser(item.id)}/>
                              </ProductAmountContainer>
                              <ProductPrice>$ {(item.quantity * item.price).toFixed(2)}</ProductPrice>
                              </PriceDetail>
                              </Product>
                              <Hr/>
                              </div>
                              )
                            }) 
                            )
                        }
}

export default CartInfo