import Mock from 'mockjs'
//  var data = Mock.mock({
//    'code': 0,
//    'msg': 'success',
//    'fields': [
//      {'name':'id', 'field':'id', 'type':'int', 'primaryKey':true, 'fastEdit':false},
//      {'name':'性别', 'field':'sex', 'type':'enum', 'enum':{'1':'男','2':'女'}},
//      {'name':'姓名', 'field':'username', 'primaryKey':false, 'fastEdit':true},
//    ],
//    'list': [
//      {
//        'id|+1': 1,
//        'username|5-16': 'a',
//        'sex': '2'
//      },
//      {
//        'id|+1': 2,
//        'username|5-16': 'a',
//        'sex': '1'
//      }
//    ],
//    'pageSize': 30,
//    'total': 200,
//    'curPage': 1

//  })

export default {
  getList: (request, response, next) => {
    return {
      code: 0,
      data: [
        {
          adminId: '2',
          account: 'anna',
          name: '\u5b89\u5a1c',
          sex: '1',
          birthday: '1900-11-22',
          platform: '1,2,3',
          face: '/static/face.jpg',
          addTime: '2018-07-09 15:24:20',
          isInvalid: '0'
        },
        {
          adminId: '1',
          account: 'tianzheng',
          name: '\u7530\u6b63',
          sex: '1',
          birthday: '1986-11-24',
          platform: '1,2,3',
          face: '/static/face.jpg',
          addTime: '2018-07-09 12:30:27',
          isInvalid: '0'
        }
      ]
    }
  },
  getTotalNum: (request, response, next) => {
    return { code: 0, data: '200' }
  },
  delete: () => {
    return { code: 0, data: true }
  }
}
