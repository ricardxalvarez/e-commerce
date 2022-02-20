const reducer = (state, action)=>{
    if (action.type === 'getSubtotal'){
        let {subtotal, amount} = state.cart.reduce((cartsubtotal,cartItem)=>{
            const {price, quantity} = cartItem
            const itemsubtotal = price * quantity
            cartsubtotal.subtotal += itemsubtotal
            cartsubtotal.amount += quantity
            return cartsubtotal
        },{
            subtotal:0,
            amount:0
        })
        subtotal = parseFloat(subtotal.toFixed(2))
        return {...state, subtotal, amount}
    }
    if (action.type === "getShipping"){
       let {delivery, amount} = state.cart.reduce((cartdelivery,cartItem)=>{
            const {shipping, quantity} = cartItem
            const itemdelivery = shipping * quantity
            cartdelivery.delivery += itemdelivery
            cartdelivery.amount += quantity
            return cartdelivery
        },{
            delivery:0,
            amount:0
        }) 
        return {...state, delivery, amount}
    }
}

export default reducer