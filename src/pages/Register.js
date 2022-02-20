import React from 'react'
import styled from 'styled-components'
import {mobil } from '../responsive'

const Container = styled.div`
margin: 0;
width: 100vw;
height: 100vh;
background: linear-gradient(rgb(205,131,200), rgb(253,207,201));
display: flex; 
align-items: center;
justify-content: center;

` 
const Wrapper = styled.div`
padding: 20px;
width: 40%;
overflow: hidden;
background-color: white;
${mobil({
    width: '70%'
})}
`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`
const Form = styled.form`
display: flex;
flex-wrap: wrap;
`
const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0 0;
padding: 10px
`
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0;
`
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background: teal;
color: white;
${mobil({
   width: '60%'
})}
`
const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder='name'/>
                <Input placeholder='last name'/>
                <Input placeholder='email'/>
                <Input placeholder='username'/>
                <Input placeholder='password'/>
                <Input placeholder='confirm password'/>
                <Agreement>
                    By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE ACCOUNT</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register