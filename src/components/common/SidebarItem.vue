<template>
	<div class="menu-item">
		<template v-for="item in menus">
			<router-link v-if="item.subMenus && item.subMenus.length == 1" :to="item.subMenus[0].url" :key="item.subMenus[0].name">
				<el-menu-item :index="item.subMenus[0].url+'-'+item.subMenus[0].id">
					<icon class="icon" :name="item.icon"></icon>
					<span slot="title">{{item.subMenus[0].name}}</span>
				</el-menu-item>
			</router-link>
			
			<el-submenu v-else :index="item.domain+'-'+item.id">
				<template slot="title">
					<icon class="icon" :name="item.icon"></icon>
					<span slot="title">{{item.name}}</span>					
				</template>
				<router-link v-for="subItem in item.subMenus" :to="subItem.url" :key="subItem.url">					
					<el-menu-item index="subItem.url+'-'+subItem.id">{{subItem.name}}</el-menu-item>
				</router-link>
			</el-submenu>
		</template>
	</div>
</template>

<script>
//import { mapGetters } from 'vuex'
export default {
	name: 'SidebarItem',
	props:{
		menus:{
			type: Array
		}
	},
    data (){
    	return {
    		
    	}
    },
//  computed:{
//  	...mapGetters([
//  		'sidebar'
//  	]),
//  	isCollapse(){
//  		return !this.sidebar.opened;
//  	}
//  },
    methods:{
        
    }
}
</script>
<style lang="scss">
.icon{
	width:1.3em;
	height:1.3em;
	margin-right:16px;
	/*text-align:left;
	transform: scale(2,2);*/
}
.el-submenu .el-menu-item{
	min-width:0px;
	width:auto;
}

</style>