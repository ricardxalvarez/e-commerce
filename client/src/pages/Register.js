import React, { useState } from 'react'
import styled from 'styled-components'
import {mobil } from '../responsive'
import { useNavigate } from 'react-router-dom'
import ProductsDataService from '../services/products'

const Container = styled.div`
margin: 0;
width: 100vw;
height: 100vh;
background: linear-gradient(rgb(15,93,156), rgb(20,219,142));
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
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassord] = useState('')
    const [confirmPassword, setConfirmPassord] = useState('')

    let response = {
        name,
        lastname,
        email,
        username: userName,
        password
    }
    let navigate = useNavigate()
    const submit = async (e)=>{
        if (name.length > 2){
            if (lastname.length > 2){
                if (email.length > 2){
                    if (userName.length > 2){
                        if (password.length > 2){
                            if (confirmPassword === password){
                                e.preventDefault()
                                await ProductsDataService.singUp(response)
                                navigate('/login')
                            }
                        }
                    }
                }
            }
        }
    }
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form onSubmit={submit}>
                <Input value={name} onChange={(e)=> setName(e.target.value)} required placeholder='name'/>
                <Input value={lastname} onChange={(e)=> setLastName(e.target.value)} required placeholder='last name'/>
                <Input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder='email'/>
                <Input value={userName} onChange={(e)=> setUserName(e.target.value)} required placeholder='username'/>
                <Input value={password} onChange={(e)=> setPassord(e.target.value)} required placeholder='password'/>
                <Input value={confirmPassword} onChange={(e)=> setConfirmPassord(e.target.value)} required placeholder='confirm password'/>
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