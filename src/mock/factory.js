import Mock from 'mockjs'

const List = [];
const count = 10;
	var obj = {
		'id|+1': 1,
		'icon|+1': [ 'all', 'account', 'form', 'category'],
		'path': '@url',
		'name': '@string("lower", 3, 9)',
		'title': '@ctitle(5, 9)'
	};
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
	}));
}
//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {
	getConfigs: () =>{
		return {
			data: [{
				"type":"list",
				"fields":[
					{"name":"id", "field":"id", "type":"int", "primaryKey":true, "fastEdit":false},
					{"name":"姓名", "field":"username", "primaryKey":false, "fastEdit":true},
					{"name":"性别", "field":"sex", "type":"enum", "enum":{"1":"男","2":"女"}}
				],
				"search" : [
					{"field":"username", "search":"like"},
					{"field":"sex"}
				],
				"publicActions":[
					{"name":"添加", "type":"page", "url":"/record/paging/add", "callback":"add",  "isDisabled":false},
					{"name":"批量删除", "type":"ajax", "url":"/paging/list", "isDisabled":false},
					{"name":"下载", "type":"callback",  "callback":"download",  "isDisabled":false}
				],
				"itemActions":[
					{"name":"编辑", "type":"page", "url":"/record/paging/edit", "callback":"edit", "isDisabled":false},
					{"name":"删除", "type":"ajax", "url":"/record/paging/delete", "isDisabled":false, "confirm":true},
					{"name":"详情", "type":"page", "url":"/record/paging/show", "isDisabled":false}
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
}
