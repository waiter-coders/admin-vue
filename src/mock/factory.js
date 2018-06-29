import Mock from 'mockjs'

const List = []
const count = 10
var obj = {
  'id|+1': 1,
  'icon|+1': [ 'all', 'account', 'form', 'category'],
  'path': '@url',
  'name': '@string(https://shop.vivo.com.cn/product/10390?cid=gw_x_floor02, 3, 9)',
  'title': '@ctitle(5, 9)'
}
for(let i = 0; i < count; i++){

  List.push(Mock.mock({
    'id|+1': 1,
    'icon|+1': [ 'all', 'account', 'form', 'category'],
    'path': '@url',
    'name': '@string("lower", 3, 9)',
    'title': '@ctitle(5, 9)',
    'subMenus':{
      'id': 1,
      'icon': 'all',
      'path': 'url',
      'name': 'asdsd',
      'title': '你好吗',
    }
  }))
}
//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {
	getConfigs: (request, response, next) =>{
		if (request.url == '//admin/invite/getConfigs') {
			return {
				data: [{
					"type":"admin-form",
					"fields":[
						{"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
						{"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
						{"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}},
						{"name":"爱好", "field":"hobby", "type":"multi", "multi":{"1":"电影","2":"看书","3":"旅行","4":"烹饪"}},
						{"name":"年份", "field":"year", "type":"datetime", "datetime":"year"},//datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange	
						{"name":"月份", "field":"month", "type":"datetime", "datetime":"month"},	
						{"name":"日期", "field":"date", "type":"datetime", "datetime":"date"},	
						{"name":"日期时间范围", "field":"datetimerange", "type":"datetime", "datetime":"datetimerange"},	
						{"name":"日期时间", "field":"datetime", "type":"datetime", "datetime":"datetime"},
						{"name":"文章内容", "field":"article", "type":"editor"}
					],
					"url":"controller/add"					
					}],
							 //data: List,
				code: 0,
				msg: 'success'
			};
		}
		if (request.url.indexOf("edit") > 0) {
			return {
				data: [{
					"type":"admin-form",
					"fields":[
						{"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false, "value":"12"},
						{"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true, "value":"hanhan"},
						{"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}, "value":"2"},
						{"name":"爱好", "field":"hobby", "type":"multi", "multi":{"1":"电影","2":"看书","3":"旅行","4":"烹饪"}, "value":"[2,4]"},
						{"name":"年份", "field":"year", "type":"datetime", "datetime":"year", "value":"2018"},//datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange	
						{"name":"月份", "field":"month", "type":"datetime", "datetime":"month", "value":"201807"},	
						{"name":"日期", "field":"date", "type":"datetime", "datetime":"date", "value":"20180706"},	
						{"name":"日期时间范围", "field":"datetimerange", "type":"datetime", "datetime":"datetimerange", "value":['2018-07-01 00:00:00','2018-08-01 00:00:00']},
						{"name":"日期时间", "field":"datetime", "type":"datetime", "datetime":"datetime", "value":"2018-06-30 10:10:23"}	
					],
					"url":"controller/add"					
					}],
							 //data: List,
				code: 0,
				msg: 'success'
			};
		}

		if (request.url == '//admin/account/getConfigs') {
			return {
				data: [{
					"type":"admin-list",
					"fields":[
						{"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
						{"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
						{"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}}
					],
					"search" : [
						{"field":"username", "type":"text", "value": "", "inputTip":"请输入姓名"},
						{"field":"sex","type":"enum", "enum":{"0":"请选择", "1":"男","2":"女"}, "value":"0", "inputTip":"请选择性别"}
					],
					"publicActions":[
						{"name":"添加", "type":"page", "url":"/record/paging/add", "callback":"add",  "isDisabled":false},
						{"name":"批量删除", "type":"ajax", "url":"/paging/list", "isDisabled":false},
						{"name":"下载", "type":"callback",  "callback":"download",  "isDisabled":false}
					],
					"itemActions":[
						{"name":"编辑", "type":"page", "url":"/record/paging/edit", "callback":"edit", "isDisabled":false},
						{"name":"删除", "type":"ajax", "url":"/record/paging/delete", "isDisabled":false, "confirm":true},
						{"name":"详情", "type":"page", "url":"/record/paging/show", "isDisabled":true}
					],
					"batchActions":[
						{"name":"批量添加", "type":"ajax", "url":"", "isDisabled":false}
					],
					"paging":{}
					}],
								//data: List,
				code: 0,
				msg: 'success'
			};		
		}
		
		return {};
	} 
}
