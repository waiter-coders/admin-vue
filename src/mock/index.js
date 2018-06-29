import Mock from 'mockjs'
import menusApi from './menus'
import factoryApi from './factory'
import pagingList from './list'

Mock.setup({
	timeout: '350-600'
})

Mock.mock(/\/dashboard\/getMenus/, 'get', menusApi.getMenus);
Mock.mock(/\/[\w|\/]+\/getConfigs/, 'get', factoryApi.getConfigs);
Mock.mock(/\/[\w|\/]+\/getList/, 'get', pagingList);

export default Mock;
