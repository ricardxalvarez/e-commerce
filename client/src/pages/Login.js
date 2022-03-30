import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobil } from '../responsive'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'

const Container = styled.div`
margin: 0;
width: 100vw;
height: 100vh;
background: linear-gradient(rgb(109,204,215), rgb(77,100,131));
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
position: relative;
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
const Alert = styled.p`
padding: 2px 6px;
position: absolute;
top: 3.6rem;
font-size: 13px;
color: red;
cursor: pointer;
`
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {userData, setUserLogged, login, alert} = useGlobalContext()
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    login(username, password)
    if (userData.name){
      setUserLogged(true)
      navigate('/')
    }
  }
  return (
    <Container>
    <Link to={'/'} style={{position: 'absolute', top: '30px', left: '30px', background: 'white', color: 'teal', textDecoration: 'none', padding: '6px 12px', fontWeight: '400'}}>Back</Link>
      <Wrapper>
            <Title>SIGN IN</Title>
            {alert &&
            <Alert>You entered an incorrect username or password</Alert>
            }
            <Form>
                <Input placeholder='username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <Input placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <Button onClick={submit}>LOG IN</Button>
                <Link to={'/'} style={{textSecoration: 'underline',marginTop: '5px', fontSize: '12px',color: 'purple',cursor: 'pointer'}}>DON"T YOU REMEMBER YOUR PASSWORD?</Link>
                <Link to={'/register'} style={{textDecoration: 'underline',marginTop: '5px', fontSize: '12px',color: 'purple',cursor: 'pointer'}}>CREATE AN ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
