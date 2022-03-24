import React, {useState} from 'react'
import { useGlobalContext } from '../context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductsDataService from '../services/products'
import {BsCheckLg} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Main = styled.div`
width: 100vw;
min-height: 100vh;
background-color: wheat;
display: flex;
justify-content: center;
align-items: center;
`
const Input = styled.input`
margin-left: 5px;
background-color: transparent;
border: none;
outline: none;
border-bottom: 2px solid black;
padding: 3px 10px;
`
const InputContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
flex-wrap: wrap;
`
const Label = styled.label``
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Color = styled.div`
width: 100px;
border-radius: 5px;
height: 60px;
background-color: white;
display: flex;
align-items: center;
margin: 10px;
user-select: none;
justify-content: center;
${props => props.type === 'selected' &&{
    outline: '2px solid lightgreen'
}}
`
const ColorItems = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
margin: auto;
`
const Size = styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
width: 90px;
height: 50px;
margin: 10px;
background-color:white ;
border-radius: 5px;
user-select: none;
`
const Title = styled.h3`
margin: 15px;
`
const DetailsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
`
const Categories = styled.select`
padding: 6px 12px;
`
const BigCont = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const Category = styled.option``
const TextArea = styled.textarea`
min-height: 120px;
min-width: 200px;
background-color: transparent;
border: 2px solid black;
padding: 10px;
&::placeholder{
    font-size: 20px;
}
`
const Submit = styled.button`
margin: 20px;
border: none;
border-radius: 5px ;
font-size: 17px;
padding: 6px 12px;
cursor: pointer;
background-color: white;
${props => props.type === 'submitted' && {
    background: 'lightgreen'
}}
`
const Back = styled.button`
margin: 20px;
border: none;
border-radius: 5px ;
font-size: 17px;
padding: 6px 12px;
cursor: pointer;
background-color: white;
`
const Hotsale = styled.button`
width: 25px;
height: 25px;
border-radius: 5px;
font-size: 17px;
`
const HotTitle = styled.h4`
margin-left: 30px;
margin-right: 5px;
`
const ButtonShow = styled.button`
background-color:transparent ;
padding: 5px 10px;
`
const AddItems = () => {
    const {userLogged} = useGlobalContext()
    const [colorList, setColorList] = useState([])
    const [sizesList, setSizesList] = useState([])
    const [name, setName] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [price, setPrice] = useState('')
    const [shipping, setShipping] = useState('')
    const [category, setCategory] = useState()
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()
    const [showMore, setShowMore] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [hotSale, setHotSale] = useState(false)
    const ID = Math.floor(Math.random() * (100000000000000000 - 10000 + 1) + 10000).toString()
    const selectColor = (e)=>{
        const object = e.target
        object.classList.toggle('selected')
        const title = object.textContent
        if (colorList.includes(title)){
            const newList = colorList.filter((item) => item !== title)
            setColorList(newList)
        } else (
            setColorList([...colorList, e.target.textContent])
        )
    }
    const selectSize = (e)=>{
        const object = e.target
        object.classList.toggle('selected')
        const title = object.textContent
        if (sizesList.includes(title)){
            const newList = sizesList.filter((item) => item !== title)
            setSizesList(newList)
        } else (
            setSizesList([...sizesList, e.target.textContent])
        )
    }
    let response = {
        name: name,
        image: imageLink,
        colors: colorList,
        sizes: sizesList,
        category: category,
        price: price,
        shipping: shipping,
        description: desc,
        hotsale: hotSale,
        id: ID
    }
    const  saveProduct = async()=>{
        if (colorList.length > 0){
            if (sizesList.length > 0){
                if (name.length > 0){
                    if (imageLink.length > 0){
                        if(price > 0){
                            if (shipping > 0){
                                if (category){
                                    if(submitted === false){
                                        await ProductsDataService.addProduct(response)
                                        setSubmitted(true)
                                        navigate('/api/lama/controller/@superadmin')
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return (
      <Main>
      {
          userLogged ?
          <Container>
              <Link to='/api/lama/controller/@superadmin'>
              <Back>Back</Back>
              </Link>
              <InputContainer>
              <Label>Name:</Label>
              <Input value={name} onChange={(e)=>setName(e.target.value)}></Input>
              <Label style={{marginLeft: '15px'}}>Image Link:</Label>
              <Input value={imageLink} onChange={(e)=>setImageLink(e.target.value)}></Input>
              </InputContainer>
              <ColorItems>
              <Title>Select Colors: </Title>
              <Color onClick={selectColor}>White</Color>
              <Color onClick={selectColor}>Black</Color>
              <Color onClick={selectColor}>Blue</Color>
              <Color onClick={selectColor}>Pink</Color>
              <Color onClick={selectColor}>Green</Color>
              <Color onClick={selectColor}>Red</Color>
              <Color onClick={selectColor}>Grey</Color>
              <Color onClick={selectColor}>Yellow</Color>
              <Color onClick={selectColor}>Gold</Color>
              <Color onClick={selectColor}>Silver</Color>
                {!showMore && <ButtonShow onClick={()=> setShowMore(true)}>Show More</ButtonShow>}
              { showMore && <Color onClick={selectColor}>Purple</Color>}
              {showMore && <Color onClick={selectColor}>Orange</Color>}
              {showMore && <Color onClick={selectColor}>Brown</Color>}
                { showMore&&   <Color onClick={selectColor}>Lightgreen</Color>}
                {  showMore&&  <Color onClick={selectColor}>Lightred</Color>}
                 { showMore&&  <Color onClick={selectColor}>Lightblue</Color>}
                 { showMore&&  <Color onClick={selectColor}>Lightgrey</Color>}
                  { showMore&& <Color onClick={selectColor}>Lightyellow</Color>}
                  { showMore&& <Color onClick={selectColor}>Darkred</Color>}
                  { showMore&& <Color onClick={selectColor}>Darkblue</Color>}
                  { showMore&& <Color onClick={selectColor}>Darkgreen</Color>}
                  { showMore&& <Color onClick={selectColor}>Darkgrey</Color>}
                  { showMore&& <Color onClick={selectColor}>Darkyellow</Color>}              
              </ColorItems>
              <ColorItems>
              <Title>Select Size:</Title>
              <Size onClick={selectSize}>Unic</Size>
              <Size onClick={selectSize}>Adjustable</Size>
              <Size onClick={selectSize}>XS</Size>
              <Size onClick={selectSize}>S</Size>
              <Size onClick={selectSize}>M</Size>
              <Size onClick={selectSize}>L</Size>
              <Size onClick={selectSize}>XL</Size>
              <Size onClick={selectSize}>XXL</Size>
              <Size onClick={selectSize}>XXXL</Size>
              <Size onClick={selectSize}>Other type</Size>
              </ColorItems>
              <BigCont>
                  <Title>Details</Title>
              <DetailsContainer>
                  <Categories value={category} onChange={e => setCategory(e.target.value)} style={{margin: '10px'}}>
                      <Category selected disabled>-- Select Category --</Category>
                      <Category>T-Shirts</Category>
                      <Category>Shirts</Category>
                      <Category>Polo</Category>
                      <Category>Pants</Category>
                      <Category>Joggers</Category>
                      <Category>Shorts</Category>
                      <Category>Beach Shorts</Category>
                      <Category>Necklaces</Category>
                      <Category>Bracelets</Category>
                      <Category>Perfums</Category>
                      <Category>Hoddies</Category>
                      <Category>Sweaters</Category>
                      <Category>Watches</Category>
                      <Category>Hats</Category>
                      <Category>Chains</Category>
                      <Category>Jackets</Category>
                      <Category>Boots</Category>
                      <Category>Sneakers</Category>
                      <Category>Shoes</Category>
                      <Category>Underwear</Category>
                      <Category>Rings</Category>
                      <Category>Earings</Category>
                      <Category>Other</Category>
                  </Categories>
                  <Input value={price} onChange={(e)=> setPrice(e.target.value)} style={{width: '50px', margin: '10px'}} type='number' placeholder='Price'/>
                  <Input value={shipping} onChange={(e)=> setShipping(e.target.value)} style={{width: '60px', margin: '10px'}} type='number' placeholder='Shipping'/>
                  <TextArea avlue={desc} onChange={(e)=> setDesc(e.target.value)} placeholder='Add a description (optional)'></TextArea>
                  <HotTitle>Hot Sale</HotTitle><Hotsale onClick={()=> setHotSale(!hotSale)}>{hotSale? <BsCheckLg style={{transform: 'translate(-3px,1px)'}}/>: ''}</Hotsale>
              </DetailsContainer>
              </BigCont>
              <Submit onClick={saveProduct} type={submitted? 'submitted': ''}>{submitted? 'Submitted': 'Submit'}</Submit>
          </Container>
          : <div>please log in</div>
        }
        </Main>
  )
}

export default AddItems