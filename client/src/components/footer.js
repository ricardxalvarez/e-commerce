import { Facebook, GitHub, Instagram, MailOutlined, Phone, Room, Twitter } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobil } from '../responsive'

const Container = styled.div`
display: flex;
background-color: rgba(0,0,0,0.050);
 ${mobil({
    flexDirection: 'column'
  })}
`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`
const Right = styled.div`
flex: 1;
 ${mobil({
    padding: '20px'
  })}
`
const Center = styled.div`
flex: 1;
padding: 20;
 ${mobil({
    display: 'none'
  })}
`
const Title = styled.h3`
margin-bottom: 30px;
`
const List = styled.ul`
list-style: none;
margin: 0;
padding:0;
display: flex;
flex-wrap: wrap;
`
const ListItem = styled.li`
width:50%;
margin-bottom: 10px;
`
const Logo = styled.h1`
`
const Desc=  styled.p`
margin:20px 0;
`
const SocialContainer = styled.div`
display: flex;
`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #${props => props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`
const ContactItem = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px
`
const Payment = styled.img`
width: 200px;
`
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Desc>There are many variations of passages of Lorem Ipsum available, but the majority have siffereed alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Desc>
        <SocialContainer>
            <SocialIcon color='3b5999'>
                <Facebook/>
            </SocialIcon>
            <SocialIcon color='E4405f'>
                <Instagram/>
            </SocialIcon>
            <SocialIcon color='55acee'>
                <Twitter/>
            </SocialIcon>
            <SocialIcon color='e60023'>
                <GitHub/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man fashion</ListItem>
            <ListItem>Woman fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
            <Room style={{marginRight: '10px'}}/>622 Dixie Path, South Tobinchester 98336
        </ContactItem>
        <ContactItem>
            <Phone style={{marginRight: '10px'}}/>+1 234 56 78
        </ContactItem>
        <ContactItem>
            <MailOutlined style={{marginRight: '10px'}}/>info@lama.com
        </ContactItem>
      <Payment src="https://woodenwatch.gr/images/Payments.png"/>
      </Right>
    </Container>
  )
}

export default Footer
