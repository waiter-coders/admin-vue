import service from '@/utils/service'
let qs = require('qs'); 
export const formSubmit = (controller, data) => {
    return service.post(controller + '/formSubmit', qs.stringify(data), {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        } 
    }); 
}

export const getFormData = (controller, id) => {
    return service.get(controller + '/getFormData', {
      params: {
        id
      }
    })
  }