<template>
	<el-menu class="navbar" mode="horizontal">
		
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!sidebar.opened"></hamburger>
		<bread class="bread-container"></bread>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				用户名
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<router-link class='inlineBlock' to="/">
					<el-dropdown-item>
						首页
					</el-dropdown-item>
				</router-link>
				<!--<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
					<el-dropdown-item>
						项目地址
					</el-dropdown-item>
				</a>-->
				<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './components/Hamburger'
import Bread from './components/Bread'
export default {
  	components: {
    	Hamburger,
		Bread
	},
	data() {
	    return {
	      //log: 
	    }
	},
	computed: {
	    ...mapGetters([
	      'sidebar',
	      
	    ])
	},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
//    this.$store.dispatch('LogOut').then(() => {
//      location.reload()// 为了重新实例化vue-router对象 避免bug
//    })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
		width:100%;
		height: 50px;
		line-height: 50px;
		border-radius: 0px !important;
		.hamburger-container {
				line-height: 58px;
				height: 50px;
				float: left;
				padding: 0 10px;
		}
		/*.errLog-container {
				display: inline-block;
				position: absolute;
				right: 150px;
		}
		.screenfull {
				position: absolute;
				right: 90px;
				top: 16px;
				color: red;
		}*/
		.avatar-container {
			height: 50px;
			display: inline-block;
			position: absolute;
			right: 35px;
			.avatar-wrapper {
					cursor: pointer;
					margin-top: 5px;
					position: relative;
					.user-avatar {
							width: 40px;
							height: 40px;
							border-radius: 10px;
					}
					.el-icon-caret-bottom {
							position: absolute;
							right: -20px;
							top: 25px;
							font-size: 12px;
					}
			}
		}
	}
	.bread-container{
		height: 50px;
		line-height: 50px;
		
	}
</style>



