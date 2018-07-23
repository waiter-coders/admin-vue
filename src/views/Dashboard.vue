<template>
	<div class="app-wrapper" >
		<div class="menu-wrapper">
      <menus></menus>
	  </div>
		<div class="main-container">
      <el-menu class="navbar" mode="horizontal">		
        <hamburger class="hamburger-container"></hamburger>
        <bread class="bread-container"></bread>
        <user-actions></user-actions>
      </el-menu>
			<!--<tags-view></tags-view>-->
			<section class="app-main" style="min-height: 100%">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </section>
		</div>
		<dialog-container :config="dialog"></dialog-container>
	</div>
</template>

<script>
import { Menus, Hamburger, Bread, UserActions /*, TagsView*/ } from "@/widgets/layout";
import DialogContainer from '@/widgets/layout/DialogContainer'
export default {
  name: "appmain",
  components: {
		Menus,Hamburger, Bread, UserActions,
		DialogContainer
    //TagsView,
  },
  /*computed:{
		sidebar(){
			return this.$store.state.app.sidebar
		}
	},*/
  data() {
    return {dialog:{
            type: "admin-form",
            fields: [
              {
                name: "id",
                field: "id",
                type: "number",
                primaryKey: true,
                fastEdit: false,
                value: "12"
              },
              {
                name: "姓名",
                field: "username",
                primaryKey: false,
                type: "string",
                fastEdit: true,
                value: "hanhan"
              },
              {
                name: "性别",
                field: "sex",
                type: "select",
                map: { "1": "男", "2": "女" },
                value: "2"
              },
              {
                name: "爱好",
                field: "hobby",
                type: "multiSelect",
                map: { "1": "电影", "2": "看书", "3": "旅行", "4": "烹饪" },
                value: "[2,4]"
              },
              {
                name: "年份",
                field: "year",
                type: "datetime",
                datetime: "year",
                value: "2018"
              }, //datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange
              {
                name: "月份",
                field: "month",
                type: "datetime",
                datetime: "month",
                value: "201807"
              },
              {
                name: "日期",
                field: "date",
                type: "datetime",
                datetime: "date",
                value: "20180706"
              },
              {
                name: "日期时间范围",
                field: "datetimerange",
                type: "datetime",
                datetime: "datetimerange",
                value: ["2018-07-01 00:00:00", "2018-08-01 00:00:00"]
              },
              {
                name: "日期时间",
                field: "datetime",
                type: "datetime",
                datetime: "datetime",
                value: "2018-06-30 10:10:23"
              }
            ],
            url: "controller/add"
          }};
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
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

  /*&.hideSidebar{
		.main-container{
			margin-left:64px;
		}
		.menu-wrapper{
			width:64px;
		}
	}*/
  .menu-wrapper {
    width: 180px;
    height: 100%;
    transition: width 0.28s;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 111;
		background:rgb(84, 92, 100);
  }
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
	.bread-container{
		height: 50px;
		line-height: 50px;
		
	}
}
</style>