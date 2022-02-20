import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Container = styled.div`
position: absolute;
left: 0;
top: 0;
z-index: 1000;
background-color: lightgray;
`
const Wrapper = styled.div`
height: 30vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Direct = styled.p`
color: black;
`

const Sidebar = () => {
    const {isSidebarOpen } = useGlobalContext()
  return (
    <Container className={`${isSidebarOpen?'sidebar':'sidebar closed'}`}>
      <Wrapper>
          <Link to='/register' style={{ textDecoration: 'none'}}>
          <Direct>Register</Direct>
          </Link>
          <Link to='/login' style={{ textDecoration: 'none'}}>
          <Direct>Sign in</Direct>
          </Link>
          <Link to='/cart' style={{ textDecoration: 'none'}}>
          <Direct>Cart</Direct>
          </Link>
      </Wrapper>
    </Container>
  )
}

export default Sidebar
