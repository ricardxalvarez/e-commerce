import axios from 'axios'

const http = axios.create({
    baseURL: 'https://lama-server.herokuapp.com/api/v1/lama',
    headers: {
        "Content-type" : "application/json"
    },
})

export default http