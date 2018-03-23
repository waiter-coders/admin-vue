import Vue from 'vue'
import Router from 'vue-router'

// 公共视图组件
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Login from '@/views/user/Login'
import Builder from '@/views/Builder'


// 项目视图组件
import UserPassword from '@/views/user/Password' // 修改密码

// 接口
import { isLogin } from '@/api/login'

Vue.use(Router)

// 项目路由， 公共路由在后面，新的项目路由添加到公共视图路由前，以便覆盖公共路由
const router = new Router({
    routes: [
        // 项目路由
         {
             path: '/user/account/password',
             name: 'UserPassword',
             component: UserPassword
         },

        // 公共构建器
        {
            path: '/:belong/:domain/show',
            name: 'builder',
            title: '构建器',
            component: Builder,
            props:true
        },

        // 基本页面
        {
            path: '/user/login',
            name: 'login',
            title: '登录',
            component: Login
        },
         {
             path: '/',
             name: 'home',
             component: Home
         }
    ]
})

// 路由前置钩子，用于处理登录等
router.beforeEach((to, from, next) => {
    // 登录阻塞
    /*if (to.path != '/user/login' && !isLogin()) {
        return next({'path':'/user/login', 'replace':true})
    }*/

    // 继续路由
    next()
})


export default router