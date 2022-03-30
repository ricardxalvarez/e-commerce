import http from '../http-common'

class ProductsDataService {
    static async getPassword(){
        return http.get(`/password`)
    }
    static async find(query, by='name', page){
        return http.get(`?${by}=${query}&page=${page}`)
    }
    static async getItemById(id){
        return http.get(`/item?id=${id}`)
    }
    static async getAllProducts(page = 0){
        return http.get(`?page=${page}`)
    }
    static async getALLProducts(){
        return http.get('/all')
    }
    static async addProduct(data){
        return http.post('/', data)
    }
    static async deleteProduct(id, name){
        return http.delete(`?id=${id}`, {data: {name}})
    }
    static async updateProduct(data){
        return http.put('/', data)
    }
    static async singUp(data){
        return http.post('/user', data)
    }
    static async logIn(user, pass){
        return http.get(`/user?username=${user}&password=${pass}`)
    }
    static async getCartByUser(id){
        return http.get(`/user/details/${id}`)
    }
    static async postToCart(data){
        return http.post(`/user/add`, data)
    }
    static async updateToCart(data){
        return http.put(`/user/add`, data)
    }
    static async deleteItemCart(userid){
        return http.delete(`/user/add?userid=${userid}`)
    }
    static async fetchClient(amount){
        return http.post('/payment', amount )
    }
    static async postOrder(data){
        return http.post('/order', data)
    }
    static async getOrder(query){
        return http.get(`/order?userid=${query}`)
    }
}

export default ProductsDataService