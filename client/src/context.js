import React, { useContext, useState, useEffect, useReducer } from 'react'
import reducer from './reducer'
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
    const getLocalStorageOrders = ()=>{
        let orders = localStorage.getItem('orders')
        if (orders){
            return JSON.parse(localStorage.getItem('orders'))
        } else return []
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [cartItems, setCartItems] = useState(getLocalStorage)
    const [userLogged, setUserLogged] = useState(false)
    const [userData, setUserData] = useState({})
    const [tempUser, setTempUser] = useState('')
    const [shippingModal, setShippingModal] = useState(false)
    const [userLoggedCart, setUserLoggedCart] = useState([])
    const [shippingData, setShippingData] = useState({})
    const [alert, setAlert] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const [listOrder, setListOrder] = useState(getLocalStorageOrders)
    const [listOrderUser, setListOrderUser] = useState([])
    useEffect(()=>{
        console.log(shippingData)
    },[shippingData])
    const login = async (username, password)=>{
        await ProductsDataService.logIn(username, password)
        .then(res => {
                setTempUser(res.data.item[0]._id)
                ProductsDataService.getCartByUser(tempUser)
                .then(resp => {
                    setUserData(resp.data)
                    setUserLoggedCart(userData.cart[0].list)
                ProductsDataService.getOrder(userData._id)
                .then(res => {
                setListOrderUser(res.data.order)
                })
                }) 
    })
        .catch(err =>{
            setAlert(true)
            setTimeout(()=>{
                setAlert(false)
            },3000)
        })
}
    const openShippingModal = ()=>{
        setShippingModal(true)
    }
    const closeShippingModal = ()=>{
        setShippingModal(false)
    }
    const reloadUser = ()=>{
        if (userData && userLogged){
            ProductsDataService.getCartByUser(userData._id)
            .then(resp => {
                setUserData(resp.data)
                setUserLoggedCart(userData.cart[0].list)
            })
            .catch(e => console.log(e))
        }
    }
    let initialState = {
        cart: cartItems,
        subtotal:0,
        delivery: 0,
        amount: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const amounts = state.cart.map((item)=>{
        const {quantity} = item
        return quantity
    })
    const amountUser = userLoggedCart.map((item)=>{
        const {quantity} = item
        return quantity
    })
    useEffect(()=>{
        if (state.subtotal > 50){
            setTotal((state.subtotal))
        } else {
            setTotal(state.subtotal + state.delivery)
        }
    },[initialState])
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
    const increase = ()=>{
        setQuantity( quantity + 1)
    }
    const decrease = ()=>{
        setQuantity(quantity + -1)
        if (quantity === 1){
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
    useEffect(()=>{
        localStorage.setItem('orders', JSON.stringify(listOrder))
    }, [listOrder])

    return (
        <AppContext.Provider
        value={{
            openSidebar,
            closeSidebar,
            isSidebarOpen,
            setIsSidebarOpen,
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
            increase,
            decrease,
            openShippingModal,
            closeShippingModal,
            shippingModal,
            shippingData,
            setShippingData,
            alert,
            total,
            totalUser,
            setTotalUser,
            listOrder,
            setListOrder,
            listOrderUser,
            setListOrderUser
        }}
        >{children}</AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}