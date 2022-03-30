import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductsDataService from '../services/products'
import { useGlobalContext } from '../context'
import {VscDebugBreakpointFunction} from 'react-icons/vsc'
import { laptop } from '../responsive'
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`
const Head = styled.div`
width: 100%;
`
const HeadTitle = styled.h2`
text-align: center;
font-size: 35px;
font-weight: 300;
text-transform: uppercase;
letter-spacing: 0.1rem;
`
const Wrapper = styled.div`
`
const Item = styled.div`
display: flex;
flex-direction: column;
margin: 10px auto;
border-radius: 5px;
box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
width: 80vw;
margin-bottom: 70px;
`
const Header = styled.div`
padding: 0 15px;
`
const Title = styled.h2`
text-transform: capitalize;
font-weight: 500;
`
const Body = styled.div``
const Bit = styled.div`
display: flex;
flex-direction: column;
align-items: center;
${laptop({
    flexDirection: 'row'
})}
`
const ImgContainer = styled.div`
width: 80vw;
overflow: hidden;
flex: 1;
`
const Img = styled.img`
height: 100%;
max-width: 400px;
width: 100%;
`
const Description = styled.div`
padding: 5px 10px;
display: flex;
flex-wrap: wrap;
flex: 1;
`
const Name = styled.h3``
const NameCont = styled.div`
text-align: center;
`
const Desc = styled.span`
margin: auto 5px;
`
const Footer = styled.div`
display: flex;
flex-direction: column;
`
const MoreDetails = styled.button`
padding: 5px 10px;
border: none;
background-color: transparent;
`
const Total = styled.span``
const Address = styled.span`
padding: 0 5px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
const Info = styled.div``
const Note = styled.p`
margin:0 auto ;
padding: 0 30px;
margin-bottom: 40px;
`
const OrderInfo = () => {
    const {listOrder, userLogged, listOrderUser} = useGlobalContext()
    const [moredetails, setMoredetails] = useState(false)
    
    if (userLogged){
        return (
          <Container>
            <Head>
              <HeadTitle>Orders</HeadTitle>
          </Head>
              <Wrapper>
                  {
                listOrderUser.map((item, index)=>{
                    return (
                        <Item key={index}>
                            <Header>
                                <Title>Status: {item.status}</Title>
                            </Header>
                            <Body>
                                {
                                    item.cart.map((bit,index)=>{
                                        return (
                                            <Bit key={index}>
                                                <ImgContainer>
                                                <Img src={bit.image}/>
                                                </ImgContainer>
                                                <Description>
                                                    <NameCont>
                                                    <Name>{bit.name}</Name>
                                                    </NameCont>
                                                    <Info>
                                                    <Desc><b>Size:</b> {bit.sizes}</Desc>
                                                    <Desc><b>Color:</b> {bit.colors}</Desc>
                                                    <Desc><b>Price:</b> ${bit.price}</Desc>
                                                    <Desc><b>Quantity:</b> {bit.quantity}</Desc>
                                                    </Info>
                                                </Description>
                                            </Bit>
                                        )
                                    })
                                }
                            </Body>
                            <Footer>
                                <MoreDetails  onClick={()=> setMoredetails(!moredetails)}>More Details <VscDebugBreakpointFunction style={moredetails? {transform: 'rotate(180deg)', transition: 'all 0.3s'}: {transition: 'all 0.1s ease'}} /></MoreDetails>
                                { moredetails && <Total>Total: ${(item.total).toFixed(2)}</Total>}
                                { moredetails && <Address>Shipping:</Address>}
                                { moredetails && <Address>{item.address.fullname},</Address>}
                                { moredetails && <Address>{item.address.phone},</Address>}
                                { moredetails && <Address>{item.address.email},</Address>}
                                { moredetails && <Address>{item.address.country},</Address>}
                                { moredetails && <Address>{item.address.state},</Address>}
                                { moredetails && <Address>{item.address.town},</Address>}
                                { moredetails && <Address>{item.address.area},</Address>}
                                { moredetails && <Address>{item.address.flat}.</Address>}
                            </Footer>
                        </Item>
                    )
                })  
            }
              </Wrapper>
          </Container>
        )
        
    } else {
        return (
            <Container>
          <Head>
              <HeadTitle>Orders</HeadTitle>
          </Head>
          <Wrapper>
              {
                listOrder.map((item, index)=>{
                    return (
                        <Item key={index}>
                            <Header>
                                <Title>Status: {item.status}</Title>
                            </Header>
                            <Body>
                                {
                                    item.cart.map((bit,index)=>{
                                        return (
                                            <Bit key={index}>
                                                <ImgContainer>
                                                <Img src={bit.image}/>
                                                </ImgContainer>
                                                <Description>
                                                    <NameCont>
                                                    <Name>{bit.name}</Name>
                                                    </NameCont>
                                                    <Info>
                                                    <Desc><b>Size:</b> {bit.sizes}</Desc>
                                                    <Desc><b>Color:</b> {bit.colors}</Desc>
                                                    <Desc><b>Price:</b> ${bit.price}</Desc>
                                                    <Desc><b>Quantity:</b> {bit.quantity}</Desc>
                                                    </Info>
                                                </Description>
                                            </Bit>
                                        )
                                    })
                                }
                            </Body>
                            <Footer>
                                <MoreDetails  onClick={()=> setMoredetails(!moredetails)}>More Details <VscDebugBreakpointFunction style={moredetails? {transform: 'rotate(180deg)', transition: 'all 0.3s'}: {transition: 'all 0.1s ease'}} /></MoreDetails>
                                { moredetails && <Total>Total: ${(item.total).toFixed(2)}</Total>}
                                { moredetails && <Address>Shipping:</Address>}
                                { moredetails && <Address>{item.address.fullname},</Address>}
                                { moredetails && <Address>{item.address.phone},</Address>}
                                { moredetails && <Address>{item.address.email},</Address>}
                                { moredetails && <Address>{item.address.country},</Address>}
                                { moredetails && <Address>{item.address.state},</Address>}
                                { moredetails && <Address>{item.address.town},</Address>}
                                { moredetails && <Address>{item.address.area},</Address>}
                                { moredetails && <Address>{item.address.flat}.</Address>}
                            </Footer>
                        </Item>
                    )
                })  
            }
            <Note>Note: due to you are not logged in, you wont recieve updates of your status by this section, you will recieve updates by email. If you want to keep watching this information, please don't delete your local storage.</Note>
          </Wrapper>
      </Container>
    )
}
}

export default OrderInfo