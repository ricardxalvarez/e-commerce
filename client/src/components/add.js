import React from 'react'
import { Add, Remove } from '@mui/icons-material'
import styled from 'styled-components'


const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Amount = styled.span`
width: 30px;
border-radius: 10px;
border: 1px solid black;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
margin: 0 5px;
`

const AddCo = ({quantity, increase, decrease}) => {
  return (
    <AmountContainer>
        <Remove onClick={decrease}/>
        <Amount>{quantity}</Amount>
        <Add onClick={increase}/>
    </AmountContainer>
  )
}

export default AddCo
