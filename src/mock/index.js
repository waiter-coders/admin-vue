import Mock from 'mockjs'
import menusApi from './menus'
import factoryApi from './factory'

Mock.setup({
	timeout: '350-600'
})

Mock.mock(/\/menus\/list/, 'get', menusApi.getMenus);
Mock.mock(/[\w|\/]+\/getConfig/, 'post', factoryApi.getConfig);

export default Mock;
