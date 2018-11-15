import fetch from '@/utils/service'

export const isLogin = () => {
  return fetch.get('/user/isLogin')
}

export const login = () => {
  return fetch.post('/admin/login/')
}

export const loginOut = () => {
  return fetch.post('/admin/loginout/')
}
