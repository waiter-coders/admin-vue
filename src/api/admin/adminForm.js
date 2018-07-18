import service from '@/utils/service'
let qs = require('qs'); 
export const formSubmit = (controller, data, id) => {
    return service.post(controller + '/formSubmit', qs.stringify(data), {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:{
            id
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