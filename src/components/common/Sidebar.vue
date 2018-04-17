<template>
	<div class="menu-wrapper">
		<el-menu mode="vertical" 
			background-color="#545c64"
      		text-color="#fff"
      		active-text-color="#ffd04b"
      		:collapse="isCollapse">
			<sidebar-item :menus="menu"></sidebar-item>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { getMenus } from '@/api/common/menus'
export default {
    data (){
    	return {
    		menu:[]
    	}
    },
    mounted(){
    	this.getMenu();
    },
    computed:{
    	...mapGetters([
    		'sidebar'
    	]),
    	isCollapse(){
    		return !this.sidebar.opened;
    	}
    },
    components:{
    	SidebarItem
    },
    methods:{
        getMenu:function(){
        	var _this = this;
        	getMenus().then(res => {
        		//console.log( res );
        		console.log( res.data );
        		_this.menu = res.data;
        	});
        },
    }
}
</script>
<style lang="scss">
.menu-wrapper{
	/*width:180px;*/
	height:100%;
	transition:width 0.28s;
	position:fixed;
	top:0;
	left:0;
	bottom:0;
	z-index:111;
}
.el-menu{
	height:100%;
}
.el-menu-item:hover,.el-menu-item:focus{
	background:rgb(38,52,69);
}
.el-menu--collapse{
	.el-menu-item span,
	.el-submenu span{
		height: 0;
	    width: 0;
	    overflow: hidden;
	    visibility: hidden;
	    display: inline-block;
	}
}
/*.el-menu--collapse>.el-menu-item span, .el-menu--collapse>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}*/
</style>