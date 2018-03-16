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
//console.log(List);
export default {
	getMenus: () =>{
		return {
			data: List,
			code: 0,
			msg: 'success'
		};
	} 
}
