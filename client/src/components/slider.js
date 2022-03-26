import styled from 'styled-components'
import React, { useState} from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {sliderItems} from '../data'
import { mobil } from '../responsive';
import { tablet } from '../responsive';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
overflow: hidden;
 ${mobil({
    height: '50vh'
  })}
  ${tablet({
      display: 'none'
  })}
`;
const Arrow = styled.div`
width: 40px;
height: 40px;
background-color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top:0;
bottom:0;
left: ${props => props.direction === 'left' && '10px'};
right: ${props => props.direction === 'right' && '10px'};
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 100;
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    transition: all .3s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const SlideContainer = styled.div`
    display: flex;
    align-items: center;
    width:100vw;
    flex: 1;
    background-color: #${props => props.bg};
`;
const ImageContainer = styled.div`
    height: 100%;
    flex: 1;
    ${mobil({
    height: '70%',
    transform: 'translateX(-20px)'
})}

`;
const InfoContainer = styled.div`
flex: 1;
padding: 50px;
${mobil({
    transform: 'translateX(-90px)'
})}
`
const Image = styled.img`
height: 80%;
`
const Title = styled.h1`
font-size: 70px;
${mobil({
   fontSize: '30px',
   margin: '0' 
})}
`
const Desc = styled.p`
margin: 10px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobil({
   fontSize: '10px',
   width: '100%'
})}
`
const Button = styled.button`
 padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${mobil({
   fontSize: '15px' 
})}
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const navigate = useNavigate()
    const handleClick = (direction)=>{
     if (direction === 'left'){
         setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2)
     } else {
         setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0)
     }
    }
  return ( <Container>
        <Arrow direction = 'left' onClick={()=> handleClick('left')}>
            <ArrowLeftIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item, index)=>{
               return( <SlideContainer key={index} bg={item.bg}>
                <ImageContainer>
                <Image src={item.img}/>
            </ImageContainer>
            <InfoContainer>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
            <Button onClick={()=> navigate('/products')}>SHOP NOW</Button>
                </InfoContainer>
            </SlideContainer>
            )})}
            
        </Wrapper>
        <Arrow direction= 'right' onClick={()=> handleClick('right')}>
            <ArrowRightIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider
