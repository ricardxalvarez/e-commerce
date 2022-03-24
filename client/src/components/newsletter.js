import { SendOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { mobil } from '../responsive'

const Container = styled.div`
height: 60vh;
background: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title = styled.h1`
font-size: 70px;
margin: 20px;
 ${mobil({
    fontSize: '50px'
  })}
`
const Desc = styled.p`
font-size: 24px;
font-weight: 300;
margin-bottom: 20px;
 ${mobil({
    textAlign: 'center',
    fontSize: '18px'
  })}
`
const InputContainer =styled.form`
width: 50%;
height: 40px;
background-color: white;
display: flex;
align-items: center;
justify-content: space-between;
border: 1px solid lightgray;
 ${mobil({
    width: '80%'
  })}
`
const Button = styled.button`
flex: 1;
border: none;
background-color: teal;
color: white;
height: 100% 
`
const Input = styled.input`
outline: none;
border: none;
flex: 8;
padding: 10px;
`

const Newsletter = () => {
  return (
      <Container>
          <Title>Newsletter</Title>
          <Desc>Get timely updates from your favorite products.</Desc>
          <InputContainer>
          <Input placeholder='ex. youremail@xyz.com'/>
          <Button>
            <SendOutlined/>
          </Button>
          </InputContainer>
      </Container>
  )
}

export default Newsletter