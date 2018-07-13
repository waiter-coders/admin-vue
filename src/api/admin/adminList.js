import service from '@/utils/service'

export const getList = (controller, search, limit, offset) => {
  return service.get(controller + '/getList',{
    params: {      
      search:search,
      limit:limit,
      offset:offset
    }
  })
}

export const getTotalNum = (controller, search) => {
  return service.get(controller + '/getTotalNum', {
    params: {
      search
    }
  })
}

export const deleteByIds = (controller, ids) => {
  return service.get( controller + '/deleteByIds', {
    params: {
      ids:ids,
    }
  })
}