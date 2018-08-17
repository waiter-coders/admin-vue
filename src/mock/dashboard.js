import Mock from 'mockjs'

const List = []
const count = 10
var obj = {
  'id|+1': 1,
  'icon|+1': ['all', 'account', 'form', 'category'],
  path: '@url',
  name: '@string("lower", 3, 9)',
  title: '@ctitle(5, 9)'
}
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      'id|+1': 1,
      'icon|+1': ['all', 'account', 'form', 'category'],
      path: '@url',
      name: '@string("lower", 3, 9)',
      title: '@ctitle(5, 9)',
      subMenus: {
        id: 1,
        icon: 'all',
        path: 'url',
        name: 'asdsd',
        title: '你好吗'
      }
    })
  )
}
// 返回比较规范的列表，可以在这里提供多种方法，提供对menu参数的访问，该模块的数据，不仅仅用于刷新Menu,而且用户其他地方获取该板块的相关信息？
export default {
  getMenus: () => {
    return {
      code: 0,
      data: [
        {
          domain: 'admin',
          title: '系统管理',
          children: [
            {
              domain: 'account',
              title: '管理员信息',
              children: [
                {
                  domain: 'edit',
                  title: '管理员信息编辑'
                }
              ]
            },
            {
              domain: 'invite',
              title: '邀请新管理员'
            }
          ]
        },
        {
          domain: 'statistics',
          title: '网站统计',
          children: [
            {
              domain: 'pvUv',
              title: '每日pv(uv)'
            },
            {
              domain: 'userRatio',
              title: '用户分布'
            }
          ]
        },
        {
          domain: 'doc',
          title: '后台开发文档'
        }
      ]
    }
  }
}
