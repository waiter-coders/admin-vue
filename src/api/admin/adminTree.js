import service from '@/utils/service'

export const getNodes = (controller, nodeId) => {
  return service.get(controller + '/getNodes',{
    params: {      
      nodeId
    }
  })
}

export const addNode = (controller, label, parentId, preNodeId, nexeNodeId) => {
  return service.get(controller + '/addNode',{
    params: {      
      label, parentId, preNodeId, nexeNodeId
    }
  })
}

export const changeNodLabel = (controller, nodeId, label) => {
  return service.get(controller + '/changeNodLabel',{
    params: {      
      nodeId,
      label
    }
  })
}

export const changeNodePosition = (controller, nodeId, parentId, preNodeId, nexeNodeId) => {
  return service.get(controller + '/changeNodePosition',{
    params: {      
      nodeId, parentId, preNodeId, nexeNodeId
    }
  })
}

export const deleteNode = (controller, nodeId) => {
  return service.get(controller + '/deleteNode',{
    params: {      
      nodeId
    }
  })
}

