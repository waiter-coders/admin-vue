import Mock from "mockjs";
// var data = Mock.mock({
//   'code': 0,
//   'msg': 'success',
//   'fields': [
//     {'name':'id', 'field':'id', 'type':'int', 'primaryKey':true, 'fastEdit':false},
//     {'name':'性别', 'field':'sex', 'type':'enum', 'enum':{'1':'男','2':'女'}},
//     {'name':'姓名', 'field':'username', 'primaryKey':false, 'fastEdit':true},
//   ],
//   'list': [
//     {
//       'id|+1': 1,
//       'username|5-16': 'a',
//       'sex': '2'
//     },
//     {
//       'id|+1': 2,
//       'username|5-16': 'a',
//       'sex': '1'
//     }
//   ],
//   'pageSize': 30,
//   'total': 200,
//   'curPage': 1

// })

export default {
  getList: (request, response, next) =>{
    return {code: 0,
    data: [
      {
        adminId: "2",
        account: "anna" + Math.random(),
        name: "\u5b89\u5a1c",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      },
      {
        adminId: "1",
        account: "tianzheng",
        name: "\u7530\u6b63",
        sex: "1",
        platform: "1,2,3",
        country: "1",
        province: "33",
        city: "1",
        face: "sdafsaf",
        mobile: "12222222222",
        email: "sadfasdf@afasdfa.com",
        addTime: null,
        isInvalid: "0"
      }
    ]}
  },
  getTotalNum: (request, response, next) =>{
    return {"code":0,"data":"200"}
  },
  delete:()=>{
    return {"code":0,"data":true}
  }
  
};
