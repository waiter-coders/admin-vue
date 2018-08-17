import service from '@/utils/service'
let qs = require('qs') 
export const formSubmit = (controller, data, params) => {
  return service.post(controller + '/formSubmit', qs.stringify(data), {
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params:params
  }) 
}

export const getFormData = (controller, params) => {
  return service.get(controller + '/getFormData', {
    params: params
  })
}