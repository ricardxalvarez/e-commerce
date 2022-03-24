import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {AiOutlineSend, AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {IoMdAdd} from 'react-icons/io'
import ProductsDataService from '../services/products'
import { keyframes } from 'styled-components'
import { useGlobalContext } from '../context'
import {BsCheckLg} from 'react-icons/bs'
import {AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai'


const Container = styled.div`
background-color: wheat;
min-height: 100vh;
`
const Form = styled.form`
height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const ListContainer = styled.div`
padding: 30px;
`
const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const Contr = styled.input`
margin: 3px;
padding: 5px 10px;
background-color: transparent;
border: none;
border-bottom: 2px solid black;
outline: none;
`
const Submit = styled.button`
background-color: transparent;
border: none;
font-size: 20px;
cursor: pointer;
position: relative;
`
const Eye = styled.div`
position: absolute;
right: 40px;
z-index: 10000;
`
const ListCont = styled.div`
`
const ListItem = styled.div`
background-color: white;
padding: 0px 15px;
border-radius: 10px;
position: relative;
width: 70%;
margin: auto;
`
const Title = styled.h1`
margin: 10px 5px;
width: 60%;
`
const ImgCont = styled.div`
flex: 1;
overflow: hidden;
height: 300px;
`
const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
object-position: center;
transition: all 0.3s ease;
transform: scale(1.2);
&:hover{
    transform: scale(1);
}
`
const Edit = styled.button`
margin: 10px;
background-color: transparent;
padding: 5px 10px;
`
const Delete = styled.button`
background-color: transparent;
padding: 5px 10px;
`
const Animation = keyframes`
0%{
    transform: translateY(5px)
}
50%{
    transform: translateY(0)
    
}
100%{
    transform: translateY(5px)
}
`
const AddItem = styled.button`
width: 50px;
height: 50px;
border-radius: 50%;
color: black;
background-color: transparent;
border: 5px solid black;
position: fixed;
right: 5vw;
top: 80vh;
font-size: 30px;
display: flex;
justify-content: center;
align-items: center;
animation-name: ${Animation};
animation-duration: 1s;
animation-iteration-count: infinite;
cursor: pointer;
`
const Details = styled.h4`
margin: 3px;
`
const DetailsContainer = styled.div`
display: flex;
margin: 0;
flex-wrap: wrap;
`
const Bottom = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: center;
align-items: center;
`
const Contain = styled.div`
flex: 1.5;
margin-left: 50px;
`
const Ajnxiau = styled.div`
display: flex;
position: absolute;
top: 0.9rem;
right: 2rem;
`
const Hotsale = styled.button`
width: 25px;
height: 25px;
border-radius: 5px;
font-size: 17px;
`
const PageCtrl = styled.div`
display: flex;
flex-direction: row-reverse;
align-items: center;
`
const PageShown =  styled.p``
const ChangePage = styled.button`
margin: 10px;
width: 30px;
height: 30px;
text-align: center;
`
const Password = () => {
    const {userLogged, setUserLogged} = useGlobalContext() 
    const [password, setPassword] = useState('a')
    const [productList, setProductList] = useState([])
    const [input, setInput] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [searchName,setSearchName] = useState('')
    const [numPage, setNumPage] = useState(0)
    const [pages, setPages] = useState(0)
    const display = (e)=>{
        setInput(e.target.value)
    }
    useEffect(()=>{
            retriveProducts()
    },[numPage])
    const submit = (e)=>{
        e.preventDefault()
        ProductsDataService.getPassword().then(res => setPassword(res.data))
        if (password === input){
                setUserLogged(true)
            }
    }
    const findByName = ()=>{
        ProductsDataService.find(searchName, 'name', numPage)
        .then(response => {
            response.data.page = numPage
            setProductList(response.data.products)
        })
    }
    const retriveProducts = ()=>{
        ProductsDataService.getAllProducts(numPage)
        .then(res=> {
            setProductList(res.data.products)
            setPages(Math.ceil(res.data.total_results/res.data.entries_per_page))
        })
    }
    const sumPage = ()=>{
        setNumPage(numPage + 1)
        if ((numPage + 1) === pages){
            setNumPage(0)
        }
    }
    const sustractPage = ()=>{
    if (numPage >= 1){
      setNumPage(numPage - 1)
    }
  }
        return (
            <Container>
                {
                    userLogged ?
                    <ListContainer>
                        <Header>
                            <Contr placeholder='Product name' value={searchName} onChange={(e)=> setSearchName(e.target.value)}/><AiOutlineSend onClick={findByName}/><Submit/>
                            <Link to={'/add'}>
                            <AddItem><IoMdAdd/></AddItem>
                            </Link>
                            <PageCtrl>
                                <ChangePage onClick={sumPage}><AiOutlineArrowRight/></ChangePage>
                                <PageShown>{numPage + 1}</PageShown>
                                <ChangePage onClick={sustractPage}><AiOutlineArrowLeft/></ChangePage>
                            </PageCtrl>
                        </Header>
                        <ListCont>
                            {
                                productList.map((item, index)=>{
                                        const deleteProduct = ()=>{
                                            ProductsDataService.deleteProduct(item._id, item.name)
                                        }
                                    return (
                                        <ListItem key={index}>
                                        <Title>{item.name}</Title>
                                        <Ajnxiau>
                                        <Details>Hot sale</Details>
                                        <Hotsale>{item.hotsale? <BsCheckLg style={{transform: 'translate(-3px,1px)'}}/> : ''}</Hotsale>
                                        </Ajnxiau>
                                        <Bottom>
                                        <ImgCont>
                                        <Img src={item.image} alt={item.name}/>
                                        </ImgCont>
                                        <Contain>

                                        <Details>Price: {item.price}$</Details>
                                        <Details>Shipping: {item.shipping}$</Details>
                                            
                                        <DetailsContainer><Details style={{marginRight: '5px'}}>Colors:</Details>
                                        {
                                            item.colors.map((it, index)=>{
                                                const exeption = item.colors[item.colors.length - 1]
                                                return <Details key={index}>{it}{exeption === it ? '.':','}</Details>
                                            })
                                        }
                                        </DetailsContainer>
                                        <DetailsContainer><Details style={{marginRight: '5px'}}>Sizes: </Details>
                                        {item.sizes.map((item, index)=>{
                                            return <Details key={index}>[{item}]</Details>
                                        })}
                                        </DetailsContainer>
                                        <Details>Description: {item.description}</Details>
                                        <Link to={`/api/lama/controller/@superadmin/${item._id}`}>
                                        <Edit>Edit</Edit>
                                        </Link>
                                        <Delete onClick={deleteProduct}>Delete</Delete>
                                        </Contain>
                                        </Bottom>
                                        </ListItem>
                                        )
                                    }
                                    )
                                }
                        </ListCont>
                    </ListContainer>
                    :
                <Form onSubmit={submit}>    
                    <Contr value={input} type={isVisible ? 'text' : 'password'} onChange={display} required/>
                    <Submit type='submit'><Eye onClick={()=> setIsVisible(!isVisible)}>{isVisible? <AiOutlineEye/>: <AiOutlineEyeInvisible/>}</Eye><AiOutlineSend/></Submit>
                </Form>
                }
            </Container>
        )
}

export default Password