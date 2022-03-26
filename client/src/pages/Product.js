import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Announcements from '../components/announcements'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Newsletter from '../components/newsletter'
import { useGlobalContext } from '../context'
// import {popularProducts} from '../data'
import AddCo from '../components/add'
import { mobil } from '../responsive'
import ProductsDataService from '../services/products'

const Container = styled.div``
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobil({
    flexDirection: 'column'
})}
`
const ImgContainer = styled.div`
flex: 1;
`
const Img = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
${mobil({
    height: '50vh'
})}
`
const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;
${mobil({
   padding: '0 5px',
})}
`
const Title = styled.h1`
font-weight: 200;
${mobil({
   fontSize: '30px' 
})}
`
const Desc = styled.p`
margin: 20px 0p;
`
const Price = styled.p`
font-weight: 100;
font-size: 40px
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
margin: 30px 0;
${mobil({
   flexDirection: 'column',
   margin: '30px auto'
})}
`
const Filter = styled.div`
display: flex;
align-items: center;
${mobil({
   margin: '5px auto'
})}
`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props => props.color};
margin-left: 10px;
cursor: pointer;
${mobil({
   marginLeft: '0px',
   transform: 'translateX(10px)' 
})}
`
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
display: flex;
align-items: center;
width: 50%;
justify-content: space-between;
${mobil({
    flexDirection: 'column',
    margin: 'auto'
})}
`

const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background: white;
cursor: pointer;
font-weight: 500; 
transition: all 0.3s ease;
${props => props.proto === 'added' &&
{background: 'teal', }
}
${mobil({
   marginTop: '10px' 
})}

&:hover{
    background: #f8f4f4;
    ${props => props.proto === 'added' &&
    {background: 'teal'}
    }
}
`
const Product = () => {
    useEffect(()=>{
        retrieveProduct()
    }, [])
    const {setCartItems, quantity, increase, decrese,cart, userLogged, userData, tempUser, setUserData, setUserLoggedCart, userLoggedCart, reloadUser} = useGlobalContext()
    const {id} = useParams()
    const [item, setItem] = useState({})
    const [isElementAdded, setIsElementAdded] = useState(false)
    const [sizeSelected, setSizeSelected] = useState('')
    const [colorSelected, setColorSelected] = useState('')
    let tempCartItem = {...item, sizes: sizeSelected, colors: colorSelected}
    const newItem = {...tempCartItem, quantity}

    useEffect(()=>{
        reloadUser()
    },[userData])
        
    const addTocart = async () =>{
        if (!userLogged){
            if (!isElementAdded){
                setCartItems([...cart, newItem])
                document.location.reload()
                setIsElementAdded(true)
            }
        } else {
            
            if (!isElementAdded){
                const response = {
                    list : [newItem],
                    userid : userData._id
                }
                if (userLoggedCart.length === 0){
                    await ProductsDataService.postToCart(response)
                    reloadUser()
                    setUserLoggedCart(userData.cart[0].list)
                    setIsElementAdded(true)
                } else {
                    const responsePut = {
                    list : [...userData.cart[0].list, newItem],
                    userid: userData._id
                    }
                    await ProductsDataService.updateToCart(responsePut)
                    setUserLoggedCart(userData.cart[0].list)
                    setIsElementAdded(true)
                }
            }
        }
    }
    const retrieveProduct = async ()=>{
        await ProductsDataService.getItemById(id)
        .then(response => {
            setItem(response.data.product[0])
            setColorSelected(response.data.product[0].colors[0])
            setSizeSelected(response.data.product[0].sizes[0])
            })
        }
    const findSize = (e)=>{
        setSizeSelected(e.target.value)
    }       
    const findColor = (e)=>{
        setColorSelected(e.target.value)
    }       
        return (

            item !== {} && 
            
              <Container>
                        <Navbar/>
                    <Announcements/>
                    <Wrapper>
                        <ImgContainer>
                        <Img src={item.image} alt={item.name}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.name}</Title>
                            <Desc>{item.description}</Desc>
                            <Desc>Shipping: $ {item.shipping}</Desc>
                            <Price>$ {item.price}</Price>
                            <FilterContainer>
                                <Filter>
                                    <FilterTitle>Color</FilterTitle>
                                    <FilterSize onChange={findColor}>
                                    {
                                        item.colors &&
                                         item.colors.map((it)=>{
                                             return <FilterSizeOption key={it} value={it}>{it}</FilterSizeOption>
                                         })
                                    }
                                    </FilterSize>
                                    </Filter>
                                    <Filter>
                                    <FilterTitle>Size</FilterTitle>
                                    <FilterSize onChange={findSize}>
                                        {
                                            item.sizes && 
                                                item.sizes.map((it)=>{
                                                return <FilterSizeOption key={it} value={it}>{it}</FilterSizeOption>
                                            }
                                        )}
                                    </FilterSize>
                                    </Filter>
                                    </FilterContainer>
                                    <AddContainer>
                                    <AddCo quantity={quantity} decrese={decrese} increase={increase}/>
                                    <Button onClick={addTocart} proto={isElementAdded? 'added': ''}>{isElementAdded? 'Added': 'ADD TO CART'}</Button>
                                    </AddContainer>
                                    </InfoContainer>
                                    </Wrapper>
                                    <Newsletter/>
                                    <Footer/>
                                    </Container>
                                    
            
                            
                            
        ) 
                            
            
}

export default Product