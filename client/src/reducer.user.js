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
}
export default reducer