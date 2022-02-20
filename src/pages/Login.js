import React from 'react'
import styled from 'styled-components'
import { mobil } from '../responsive'

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
background-color: white;
${mobil({
    width: '80%'
})}
`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`
const Form = styled.form`
display: flex;
flex-wrap: wrap;
flex-direction: column;
`
const Input = styled.input`
flex: 1;
min-width: 25%;
margin: 20px 0 0 0;
padding: 10px
`
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background: teal;
color: white;
margin: 20px 0;`
const Link = styled.a`
text-decoration: underline;
margin-top: 5px; 
font-size: 12px;
color: purple;
cursor: pointer;
`
const Login = () => {
  return (
    <Container>
      <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder='username'/>
                <Input placeholder='password'/>
                <Button>LOG IN</Button>
                <Link>DON"T YOU REMEMBER YOUR PASSWORD?</Link>
                <Link>CREATE A ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
