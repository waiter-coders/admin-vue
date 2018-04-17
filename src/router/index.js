import Vue from 'vue'
import Router from 'vue-router'

// 公共视图组件
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Login from '@/views/user/Login'
import Builder from '@/views/Builder'
import List from '@/components/builder/List'


// 项目视图组件
import UserPassword from '@/views/user/Password' // 修改密码

// 接口
import { isLogin } from '@/api/user'

Vue.use(Router)

// 项目路由， 公共路由在后面，新的项目路由添加到公共视图路由前，以便覆盖公共路由
const router = new Router({
    routes: [
        // 项目路由
         {
            path: '/user/account/password',
            name: 'UserPassword',
            meta: {
             	title: '修改密码'
            },
            component: UserPassword
         },

        // 公共构建器
        {
            path: '/:belong/:domain/show',
            name: 'builder',
            meta: {
            	title: '构建器'
            },
            component: Builder,
            props:true
        },
        {
            path: '/',
            name: 'layout',
            component: Layout,
            meta: {
            	title: '首页'
            },
	        children: [
		        {
		            path: '/:domain/:controller?/list',
		            name: 'list',
		            meta:{
		            	title: '列表'
		            },
		            component: List,
		            props:true
		        }/*,
		        {
		            path: '/:domain/:controller?/form',
		            name: 'form',
		            meta:{
		            	title: '表单'
		            },
		            component: Form,
		            props:true
		        }*/
		    ]
        },

        // 基本页面
        {
            path: '/user/login',
            name: 'login',
            meta: { 
            	title: '登录'
            },
            component: Login
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