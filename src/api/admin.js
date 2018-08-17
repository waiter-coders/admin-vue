import fetch from '@/utils/service'

export const isLogin = () => {
  // service.post()
  return true
}

export const login = () => {
  return fetch.post('/admin/login/')
}

export const loginOut = () => {
  return fetch.post('/admin/loginout/')
}
