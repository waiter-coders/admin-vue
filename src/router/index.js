import Vue from 'vue'
import Router from 'vue-router'

// 公共视图组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import List from '@/views/common/List'
import Form from '@/views/common/Form'
import Statistics from '@/views/common/Statistics'

// 项目视图组件
import UserPassword from '@/views/user/Password'
import Helper from '@/views/Helper'

// 接口
import {isLogin} from '@/api/login'

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
        {
            path: '/helper',
            name: 'helper',
            component: Helper
        },

        // 公共路由
        {
            path: '/:domain/:controller/list',
            name: 'list',
            component: List,
            props:true
        },
        {
            path: '/:domain/:controller/form',
            name: 'form',
            component: Form,
            props:true
        },
        {
            path: '/:domain/:controller/statistics',
            name: 'statistics',
            component: Statistics,
            props:true
        },
        {
            path: '/user/login',
            name: 'login',
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
    if (to.path != '/user/login' && !isLogin()) {
        return next({'path':'/user/login', 'replace':true})
    }

    // 继续路由
    next()
})


export default router