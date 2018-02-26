import axios from 'axios'

const service = axios.create({
    baseURL: 'https://some-domain.com/api/',
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
service.interceptors.response.use(
    response => response,
    error => {
    return Promise.reject(error)
})

export default service