import Mock from 'mockjs'
import dashboard from './dashboard'
import adminRender from './admin/adminRender'
import adminList from './admin/adminList'
import adminForm from './admin/adminForm'

Mock.setup({
  timeout: '150-300'
})

Mock.mock(/\/Dashboard\/getMenus/, 'get', dashboard.getMenus)
Mock.mock(/\/[\w|/]+\/getConfigs/, 'get', adminRender.getConfigs)
Mock.mock(/\/[\w|/]+\/getList/, 'get', adminList.getList)
Mock.mock(/\/[\w|/]+\/getTotalNum/, 'get', adminList.getTotalNum)
Mock.mock(/\/[\w|/]+\/delete/, 'get', adminList.delete)
Mock.mock(/\/[\w|/]+\/submit/, 'post', adminForm.submit)

export default Mock
