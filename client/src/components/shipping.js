import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'

const Modal = styled.div`
height: 100vh;
width: 100vw;
background-color: rgba(0,0,0,0.3);
position: fixed;
top: 0;
z-index: 1000000;
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.div`
width: 70vw;
height: 80vh;
background-color: white;
display: flex;
justify-content: center;
flex-direction: column;
align-items:center ;
position: relative;
`
const Title = styled.h2`
text-transform: uppercase;
font-weight: 300;
letter-spacing: 0.1rem;
margin-top: 30px;
`
const InfoContainer = styled.form`
height: 90%;
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
`
const Input = styled.input`
margin: 7px 50px;
padding: 5px;
`
const Button = styled.button`
position: relative; 
left: 50%;
transform: translateX(-50%);
background: teal;
padding: 6px 12px;
width: 100px;
text-align: center;
margin: 10px 0;
border: none;
color: white;
font-size: 17px;
cursor: pointer;
`
const Shipping = () => {
    const {closeShippingModal, userLogged, setShippingData, shippingData} = useGlobalContext()
    const [fullname, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [flat, setFlat] = useState('')
    const [area, setArea] = useState('')
    const [town, setTown] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    let response = {
        fullname,
        email,
        phone,
        country,
        flat,
        area,
        town,
        state,
    }
    const submit = (e)=>{
        e.preventDefault()
        setShippingData(response)
        navigate('/payment/checkout')
    }
        return (
              <Modal>
                  <Container>
                    <Title>Shipping</Title>
                    <AiOutlineClose onClick={closeShippingModal} style={{cursor:'pointer',position: 'absolute', right: '20px', top:'20px', fontSize: '20px'}}/>
                  <InfoContainer>
                      <Input placeholder='Full Name' required value={fullname} onChange={(e)=> setFullName(e.target.value)}/>
                      <Input placeholder='Phone' required value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                      <Input type={email} placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                      <Input placeholder='Country' required value={country} onChange={(e)=> setCountry(e.target.value)}/>
                      <Input placeholder='Flat, House no. Building, Company' required value={flat} onChange={(e)=> setFlat(e.target.value)}/>
                      <Input placeholder='Area, Colony, Street' required value={area} onChange={(e)=> setArea(e.target.value)}/>
                      <Input placeholder='Town/City' required value={town} onChange={(e)=> setTown(e.target.value)}/>
                      <Input placeholder='State/Province' required value={state} onChange={(e)=> setState(e.target.value)}/>
                      <Button onClick={submit}>Continue</Button>
                  </InfoContainer>
                  </Container>
              </Modal>
            )
}

export default Shipping