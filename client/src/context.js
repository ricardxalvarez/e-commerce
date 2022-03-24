import React, { useContext, useState, useEffect, useReducer } from 'react'
import reducer from './reducer'
import reducerUser from './reducer.user'
import ProductsDataService from './services/products'

const AppContext = React.createContext()



export const AppProvider = ({children})=>{
    const [quantity, setQuantity] = useState(1)
    const getLocalStorage = ()=>{
      let cartItems = localStorage.getItem('cartItems')
      if (cartItems){
        return JSON.parse(localStorage.getItem('cartItems'))
      } else return []
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [cartItems, setCartItems] = useState(getLocalStorage)
    const [userLogged, setUserLogged] = useState(false)
    const [userData, setUserData] = useState({})
    const [tempUser, setTempUser] = useState('')
    const [userLoggedCart, setUserLoggedCart] = useState([])
    useEffect(()=>{
        console.log(userLoggedCart)
    },[userData])
    const login = async (username, password)=>{
        await ProductsDataService.logIn(username, password)
        .then(res => {
            setTempUser(res.data.item[0]._id)
            ProductsDataService.getCartByUser(tempUser)
            .then(resp => {
              setUserData(resp.data)
              setUserLoggedCart(userData.cart[0].list)
            }) 
    })
}
    const reloadUser = ()=>{
        if (userData && userLogged){
            ProductsDataService.getCartByUser(userData._id)
            .then(resp => {
                setUserData(resp.data)
                setUserLoggedCart(userData.cart[0].list.map((e)=> {return e}))
            })
            .catch(e => console.log(e))
        }
    }
    let initialState = {
        cart: cartItems,
        subtotal:0,
        delivery: 0,
        amount: 0
    }
    let initialStateUser = {
        cartUser: userLoggedCart,
        subtotalUser: 0,
        deliveryUser: 0,
        amountUser: 0
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [stateUser, dispatchUser] = useReducer(reducerUser,initialStateUser)
    const amounts = state.cart.map((item)=>{
        const {quantity} = item
        return quantity
    })
    console.log(stateUser)
    const amountUser = userLoggedCart.map((item)=>{
        const {quantity} = item
        return quantity
    })
    const sum = [...amounts].reduce((partialSum, a) => partialSum + a, 0);
    const sumUser = [...amountUser].reduce((partialSum,a) => partialSum + a, 0)
    const openSidebar = ()=>{
        setIsSidebarOpen(true)
    }
    const closeSidebar = ()=>{
        setIsSidebarOpen(false)
    }
    const clearCart = ()=>{
        dispatch({type:'clearCart'})
    }
    const clearCartUser = async ()=>{
        await ProductsDataService.deleteItemCart(userData._id)
        setUserLoggedCart([])
    }
    const increaseItem = (id)=>{
        dispatch({type:'increase',payload: id})
    }
    const decreaseItem = (id)=>{
        dispatch({type:'decrease', payload: id})
    }
    const increaseItemUser = (id)=>{
        // dispatchUser({type:'increace', payload: id})
    }
    const decreaseItemUser = (id)=>{
        // dispatchUser({type: 'decrease', payload: id})
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
            sum,
            ...state,
            increaseItem,
            decreaseItem,
            clearCart,
            userLogged,
            setUserLogged,
            userData,
            setUserData,
            tempUser,
            setTempUser,
            userLoggedCart,
            setUserLoggedCart,
            login,
            reloadUser,
            sumUser,
            clearCartUser,
            ...stateUser,
            increaseItemUser,
            decreaseItemUser
        }}
        >{children}</AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}