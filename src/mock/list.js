import Mock from 'mockjs'

var data = Mock.mock({
    'code': 0,
    'msg': 'success',
    'fields': [
        {"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},      
        {"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}},
        {"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
    ],
    'list': [
        {
            'id|+1': 1,
            'username|5-16': 'a',
            'sex': '2'
        },
        {
            'id|+1': 2,
            'username|5-16': 'a',
            'sex': '1'
        }
    ],
    'pageSize': 30,
    'total': 200,
    'curPage': 1

})

export default {
	data,
    code: data.code,
    msg: data.msg
}