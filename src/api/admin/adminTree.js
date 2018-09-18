import service from '@/utils/service'

export const getTree = (controller, nodeId) => {
  return service.get(controller + '/getTree', {
    params: {
      nodeId
    }
  })
}

export const addNode = (controller, label, parentId, preNodeId, nexeNodeId) => {
  return service.get(controller + '/addNode', {
    params: {
      label, parentId, preNodeId, nexeNodeId
    }
  })
}

export const changeNodLabel = (controller, nodeId, label) => {
  return service.get(controller + '/changeNodLabel', {
    params: {
      nodeId,
      label
    }
  })
}

export const changeNodePosition = (controller, nodeId, moveToId, moveType) => {
  return service.get(controller + '/changeNodePosition', {
    params: {
      nodeId,
      moveToId,
      moveType
    }
  })
}

export const deleteNode = (controller, nodeId) => {
  return service.get(controller + '/deleteNode', {
    params: {
      nodeId
    }
  })
}
