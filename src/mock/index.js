import Mock from 'mockjs'
import menusApi from './menus'
import factoryApi from './factory'
import pagingList from './list'

Mock.setup({
	timeout: '350-600'
})

Mock.mock(/\/menus\/list/, 'get', menusApi.getMenus);
Mock.mock(/[\w|\/]+\/getConfigs/, 'post', factoryApi.getConfigs);
Mock.mock(/\/record\/paging/, 'get', pagingList);

export default Mock;
