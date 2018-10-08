import service from '@/utils/service'

export const getConfigs = (controller, params) => {
  return service.get(controller + '/getConfigs', {
    params: params
  })
}
