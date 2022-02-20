import React, { useContext, useState, useEffect, useReducer } from 'react'
import reducer from './reducer'

const AppContext = React.createContext()

const getLocalStorage = ()=>{
  let cartItems = localStorage.getItem('cartItems')
  if (cartItems){
    return JSON.parse(localStorage.getItem('cartItems'))
  } else return []
}


export const AppProvider = ({children})=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [cartItems, setCartItems] = useState(getLocalStorage)
    const initialState = {
        cart: cartItems,
        subtotal:0,
        delivery: 0,
        amount: 0
    }
    const [quantity, setQuantity] = useState(1)
    const amounts = cartItems.map((item)=>{
        const {quantity} = item
        return quantity
    })
    const sum = [...amounts].reduce((partialSum, a) => partialSum + a, 0);
    const [state, dispatch] = useReducer(reducer, initialState)
    const openSidebar = ()=>{
        setIsSidebarOpen(true)
    }

    const closeSidebar = ()=>{
        setIsSidebarOpen(false)
    }
        const increase = ()=>{
        setQuantity(quantity + 1)
    }
    const decrese = ()=>{
        setQuantity(quantity - 1)
        if(setQuantity <= 1){
            setQuantity(1)
        }
    }
    useEffect(()=>{
        dispatch({type:'getSubtotal'})
        dispatch({type:'getShipping'})
    },[state.cart])

    useEffect(()=>{
  localStorage.setItem('cartItems',JSON.stringify(cartItems))
},[cartItems])

    return (
        <AppContext.Provider
        value={{
            openSidebar,
            closeSidebar,
            isSidebarOpen,
            setCartItems,
            cartItems,
            quantity,
            increase,
            decrese,
            sum,
            ...state,
        }}
        >{children}</AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}