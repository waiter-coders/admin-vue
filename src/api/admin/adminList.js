import fetch from '@/utils/service'

export const getList = (controller, search, limit, offset) => {
  return fetch({
    url: '/index.php' + controller + '/getList',
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
    url:  '/index.php' + controller + '/getTotalNum',
    method: 'get',
    data: {
      searchs
    }
  })
}

export const deleteByIds = (controller, ids) => {
  return fetch({
    url: '/index.php' + controller + '/deleteByIds',
    method: 'get',
    data: {
      ids:ids,
    }
  })
}