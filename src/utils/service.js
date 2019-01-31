import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
const service = axios.create({
  // baseURL: '/index.php',
  baseURL: '/meta/develop/public/index.php',
  timeout: 5000
  //  headers: {'X-Custom-Header': 'foobar'}
})

//  let LoadingEl
//  请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Message.error('请求出错！')
    Promise.reject(error)
  }
)

//  回复拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      Message.error('操作失败，原因：' + response.data.msg)
    }
    return response.data.data
  },
  error => {
    Message.error('请求出错！')
    return Promise.reject(error)
  }
)

export default service
