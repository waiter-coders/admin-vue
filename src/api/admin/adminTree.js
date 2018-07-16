import service from '@/utils/service'

export const getChildren = (controller, nodeId) => {
  return service.get(controller + '/getChildren',{
    params: {      
      nodeId
    }
  })
}