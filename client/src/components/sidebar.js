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
    const {isSidebarOpen, userLogged, setUserLogged, setIsSidebarOpen } = useGlobalContext()
  return (
    <Container className={`${isSidebarOpen?'sidebar':'sidebar closed'}`}>
      <Wrapper>
          <Link  to='/register' style={{ textDecoration: 'none'}}>
          <Direct onClick={()=> setIsSidebarOpen(false)}>REGISTER</Direct>
          </Link>
          <Link to={userLogged ? '/': '/login'} style={{ textDecoration: 'none'}}>
          <Direct onClick={()=>{
            if (userLogged){
              setUserLogged(false)
            }
            setIsSidebarOpen(false)
          }}>{userLogged? 'LOG OUT' : 'SIGN IN'}</Direct>
          </Link>
          <Link to='/orders' style={{ textDecoration: 'none'}}>
          <Direct onClick={()=> setIsSidebarOpen(false)}>ORDERS</Direct>
          </Link>
      </Wrapper>
    </Container>
  )
}

export default Sidebar
