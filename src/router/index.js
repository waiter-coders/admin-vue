import Vue from 'vue'
import VueRouter from 'vue-router'

//  接口
import fetch from '@/utils/service'

//  公共视图组件
const Dashboard = resolve => require(['@/views/Dashboard'], resolve) //  仪表盘
const Widgets = resolve => require(['@/views/Widgets'], resolve) //  模板渲染组件

//  常用页面
const Home = resolve => require(['@/views/Home'], resolve) // 仪表盘首页
const Login = resolve => require(['@/views/user/Login'], resolve) // 用户登录页

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //  非仪表盘页面路由
    {
      path: '/user/login',
      name: 'user.login',
      meta: {
        title: '登录'
      },
      component: Login
    },

    // 仪表盘页面路由
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        // 自定义页面（可以在这里设置自己开发的页面）

        //  模板渲染组件
        {
          path: '/:domain/:controller?/:subController?',
          component: Widgets,
          props: true
        },
        {
          path: '/',
          name: 'home',
          meta: {
            title: '首页'
          },
          component: Home
        }
      ]
    }
  ]
})

//  路由前置钩子，用于处理登录等
router.beforeEach((to, from, next) => {
  // 登录检测
  let inNoLogin = to.path in {'/user/login': 1}
  fetch.get('/user/isLogin').then(function (status) {
    // 登录正常路由
    if (status === true && inNoLogin) {
      return next('/home')
    }
    if (status === true && !inNoLogin) {
      return next()
    }
    if (status === false && inNoLogin) {
      return next()
    }
    if (status === false && !inNoLogin) {
      return next({path: '/user/login', replace: true})
    }
  })
})

export default router
