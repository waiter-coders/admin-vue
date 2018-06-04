import axios from 'axios'
import { Message, Loading } from 'element-ui'

const service = axios.create({
    // baseURL: process.env.SERVICE_URL,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
})

let LoadingEl
// 请求拦截器
service.interceptors.request.use(config => {
    LoadingEl = Loading.service( { fullscreen: true } );
    return config;
}, error => {
	Message.error('请求出错！');
	console.log(error);
	LoadingEl.close();
    Promise.reject(error);
})

// 回复拦截器
service.interceptors.response.use(res => {
	LoadingEl.close();
	if(res.data.code !== 0){
		Message.error('操作失败，原因：'+ res.data.msg);
	}
    return res.data;
}, error => {
	LoadingEl.close();
	Message.error('请求出错！');
	console.log( error );
    return Promise.reject(error);
})

export default service