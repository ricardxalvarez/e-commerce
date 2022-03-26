const reducer = (state, action)=>{
    if (action.type === "increase"){
        let tempCart = state.cartUser.map((item)=>{
                if (item.id === action.payload){
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            })
        return {...state, cartUser: tempCart}
    }
    if (action.type === 'decrease'){
        let tempCart = state.cartUser.map((item)=>{
                if (item.id === action.payload){
                    return {...item, quantity: item.quantity - 1}
                }
                return item
            }).filter((item)=> item.quantity !== 0)
        return {...state, cartUser: tempCart}
    }
    if (action.type === 'getSubtotal'){
        let {subtotalUser, amountUser} = state.cartUser.reduce((cartsubtotal,cartItem)=>{
            const {price, quantity} = cartItem
            const itemsubtotal = price * quantity
            cartsubtotal.subtotalUser += itemsubtotal
            cartsubtotal.amountUser += quantity
            return cartsubtotal
        },{
            subtotalUser:0,
            amountUser:0
        })
        subtotalUser = parseFloat(subtotalUser.toFixed(2))
        return {...state, subtotalUser, amountUser}
    }
    if (action.type === "getShipping"){
       let {deliveryUser, amountUser} = state.cartUser.reduce((cartdelivery,cartItem)=>{
            const {shipping, quantity} = cartItem
            const itemdelivery = shipping * quantity
            cartdelivery.deliveryUser += itemdelivery
            cartdelivery.amountUser += quantity
            return cartdelivery
        },{
            deliveryUser:0,
            amountUser:0
        }) 
        return {...state, deliveryUser, amountUser}
    }
}
export default reducer