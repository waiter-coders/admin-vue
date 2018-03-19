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
		'subMenu': Mock.mock({
			'id|+1': 1000,
			'icon|+1': [ 'all', 'account', 'form', 'category'],
			'path': '@url',
			'name': '@string("lower", 3, 9)',
			'title': '@ctitle(5, 9)'
		})
	}));
}
//返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {
	getMenus: () =>{
		return {
			data: [
                {"key":"user", "name":"用户管理", "domain":""},
                {"key":"account", "name":"用户账号", "domain":"user"},
                {"key":"record", "name":"数据记录", "domain":""},
                {"key":"paging", "name":"列表", "domain":"record"},
                {"key":"form", "name":"列表", "domain":"record"},
            ],
			code: 0,
			msg: 'success'
		};
	} 
}
