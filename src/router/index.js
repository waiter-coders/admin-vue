import Vue from 'vue'
import Router from 'vue-router'

// 公共视图组件
import Main from '@/views/Main' // 主窗口框架（含菜单）
import Factory from '@/views/Factory' // 页面工厂


// 页面视图组件
import Home from '@/views/Home' //首页
import Login from '@/views/admin/Login' // 登录页
import AdminAccount from '@/views/admin/Account' // 修改密码页

// 接口
import { isLogin } from '@/api/admin'

Vue.use(Router)

// 页面路由， 公共路由在后面，自定义的页面路由添加到公共视图路由前，以便覆盖公共路由
const router = new Router({
    routes: [
        // 无菜单页面路由        
        {
            path: '/admin/login',
            name: 'login',
            meta: { 
                title: '登录'
            },
            component: Login
        },


        // 公共菜单路由
        {
            path: '/',
            name: 'main',
            component: Main,
            meta: {
            	title: '首页'
            },
	        children: [                
                // 自定义页面路由
                {
                    path: '/',
                    name: 'home',
                    meta: {
                            title: '首页'
                    },
                    component: Home
                },
                {
                    path: '/admin/account',
                    name: 'UserPassword',
                    meta: {
                            title: '管理员帐号'
                    },
                    component: AdminAccount
                },

                // 基于配置文件的工厂页面路由
		        {
		            path: '/:domain/:controller/:subController?',
		            name: 'factory',
		            meta:{
		            	title: '列表'
		            },
		            component: Factory,
		            props:true
		        }
		    ]
        },        
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