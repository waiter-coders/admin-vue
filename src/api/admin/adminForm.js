import service from '@/utils/service'
let qs = require('qs')
export const formSubmit = (controller, data, params) => {
  return service.post(controller + '/formSubmit', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: params
  })
}

export const upload = (controller, key, file) => {
  var formData = new FormData()
  formData.append(key, file)
  return service.post({
    url: controller + '/formUpload',
    method: 'POST',
    data: formData
  })
}

export const getFormData = (controller, params) => {
  return service.get(controller + '/getFormData', {
    params: params
  })
}
