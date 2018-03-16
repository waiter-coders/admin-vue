import Mock from 'mockjs'
import menusApi from './menus'

Mock.setup({
	timeout: '350-600'
})

Mock.mock(/\/menus\/list/, 'get', menusApi.getMenus);

export default Mock;
