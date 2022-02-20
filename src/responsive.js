import { css } from "styled-components"

export const mobil = (props) =>{
    return css`
    @media only screen and (max-width: 800px){
     ${props}   
    }
    `
}

export const laptop = (props) => {
    return css`
    @media only screen and (min-width: 800px){
    ${props}
    }
    `
}

export const tablet = (props) => {
    return css`
    @media only screen and (max-width: 420px){
        ${props}
    }`
}