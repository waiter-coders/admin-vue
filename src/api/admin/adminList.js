import service from '@/utils/service'

export const getList = (controller, search, limit, offset) => {
  return service.get('/index.php' + controller + '/getList',{
    params: {      
      search:search,
      limit:limit,
      offset:offset
    }
  })
}

export const getTotalNum = (controller, search) => {
  return service.get('/index.php' + controller + '/getTotalNum', {
    params: {
      search
    }
  })
}

export const deleteByIds = (controller, ids) => {
  return service.get('/index.php' + controller + '/deleteByIds', {
    params: {
      ids:ids,
    }
  })
}