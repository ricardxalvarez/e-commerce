import React from 'react'
import  styled  from 'styled-components'
import {categories} from '../data'
import CategorieItem from './categorieitem'
import { mobil } from '../responsive'

const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
justify-content: space-between;
 ${mobil({
    flexDirection: 'column',
    padding: '0'
  })}
  overflow: hidden;
`

const Categories = () => {
  return (
    <Container>
      {
          categories.map((item,index)=>{
              return <CategorieItem item={item} key={index}/>
          })
      }  
    </Container>
  )
}

export default Categories
