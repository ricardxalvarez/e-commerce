import React from 'react'
import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { laptop, mobil } from '../responsive';
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './sidebar';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '../context';

const Container = styled.div``
const Wrapper = styled.div`
height: 4rem;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
${mobil({
  height: '3rem'
})}
`
const Left = styled.div`
flex: 1;
align-items:center;
display: flex;
`
const Language = styled.span`
font-size: 14px;
cursor: pointer;

`

const Logo = styled.h1`
font-weight: bold;
color: black;
cursor: pointer;
 ${mobil({
    fontSize: '24px'
  })}
`
const Center = styled.div`
text-align: center;
  flex: 1;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  `
  const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${props => props.type === 'no-responsive' &&
  mobil({
    display: 'none'
  })
}
  ${props => props.type === 'menu' && 
  laptop({
    display: 'none'
  })
}

`
const Navbar = () => {
  const {openSidebar, isSidebarOpen, closeSidebar, sum, userLogged, setUserLogged, userData, sumUser, listOrder, listOrderUser} = useGlobalContext()
  return (<>
    <Container>
        <Wrapper>
            <Left>
              <Language>EN</Language>
            </Left>
            <Center>
            <Link to='/' style={{textDecoration: 'none'}}>
            <Logo>LAMA.</Logo>
            </Link>
            </Center>
            <Right>
              <MenuItems type='no-responsive'><Link style={{textDecoration: 'none', color: 'black'}} to={'/orders'}>{userLogged ? `Hello ${userData.name } (${listOrderUser.length})`: `Orders (${listOrder.length})`}</Link></MenuItems>
              <MenuItems type='no-responsive'><Link style={{textDecoration: 'none', color: 'black'}} to={!userLogged && '/login'} onClick={()=> userLogged && setUserLogged(false)}>{userLogged? 'Log out':'Sign in'}</Link></MenuItems>
              <MenuItems>
              <Link to='/cart' style={{textDecoration: 'none'}}>
              <Badge badgeContent={userLogged ? sumUser : sum} color="primary" style={{color: 'black'}}>
                <ShoppingCartOutlinedIcon/>
              </Badge>
              </Link>
              </MenuItems> 
              <MenuItems type='menu' className={`${isSidebarOpen? 'closed': ''}`} onClick={openSidebar}>
              <MenuIcon />
              </MenuItems>
              <MenuItems type= 'menu' className={`${isSidebarOpen? 'x': 'x closed'}`} onClick={closeSidebar}>
              <CloseIcon/>
              </MenuItems>
            </Right>
        </Wrapper>
    </Container>
      <Sidebar/>
  </>
  )
}

export default Navbar
 