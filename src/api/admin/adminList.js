import fetch from '@/utils/service'

export const getList = (controller, search, limit, offset) => {
  return fetch({
    url: controller + '/getList',
    method: 'get',
    data: {      
      search:search,
      limit:limit,
      offset:offset
    }
  })
}

export const getTotalNum = (controller, searchs) => {
  return fetch({
    url:  controller + '/getTotalNum',
    method: 'get',
    data: {
      searchs
    }
  })
}

export const deleteByIds = (controller, ids) => {
  return fetch({
    url: controller + '/deleteByIds',
    method: 'get',
    data: {
      ids:ids,
    }
  })
}