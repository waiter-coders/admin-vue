import fetch from '@/utils/service'

export const isLogin = () => {
  // service.post()
  return true
}

export const login = param => {
  return fetch.post('/admin/login/', params)
}

export const loginOut = param => {
  return fetch.post('/admin/loginout/', params)
}
