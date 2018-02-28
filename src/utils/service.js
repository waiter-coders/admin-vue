import axios from 'axios'

const service = axios.create({
    baseURL: process.env.SERVICE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

// 请求拦截器
service.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

// 回复拦截器
service.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default service