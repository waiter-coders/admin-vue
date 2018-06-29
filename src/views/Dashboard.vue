<template>
	<div class="app-wrapper" >
		<div class="menu-wrapper">
			<el-menu mode="vertical" 
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				:collapse="isCollapse">
				<sidebar-item :menus="menu"></sidebar-item>
			</el-menu>
		</div>		
		<div class="main-container">
			<el-menu class="navbar" mode="horizontal">		
				<hamburger class="hamburger-container"></hamburger>
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
						<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu>
			<!--<tags-view></tags-view>-->
			<!-- app-main -->
			<section class="app-main" style="min-height: 100%">
				<transition name="fade" mode="out-in">
					<router-view :key="key"></router-view>
				</transition>
			</section>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/common/components/Hamburger";
import Bread from "@/components/common/components/Bread";
import SidebarItem from "@/components/common/SidebarItem";
import { getMenus } from "@/api/common/menus";
export default {
  name: "appmain",
  components: {
    Hamburger,
    Bread,
    SidebarItem
  },
  data() {
    return {
      menu: []
    };
  },
  mounted() {
    this.getMenu();
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    getMenu: function() {
      var _this = this;
      getMenus().then(res => {
        //console.log( res );
        _this.menu = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  .main-container {
    min-height: 100%;
    margin-left: 180px;
    transition: margin-left 0.28s;
  }
  .menu-wrapper {
    width: 180px;
  }
  /*&.hideSidebar{
		.main-container{
			margin-left:64px;
		}
		.menu-wrapper{
			width:64px;
		}
	}*/
  .navbar {
    width: 100%;
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
      top: 0;
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
  .bread-container {
    height: 50px;
    line-height: 50px;
  }
}
.menu-wrapper {
  /*width:180px;*/
  height: 100%;
  transition: width 0.28s;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 111;
}
.el-menu {
  height: 100%;
}
.el-menu-item:hover,
.el-menu-item:focus {
  background: rgb(38, 52, 69);
}
.el-menu--collapse {
  .el-menu-item span,
  .el-submenu span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
}
</style>