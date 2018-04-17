<template>
	<div class="menu-item">
		<template v-for="item in menus">
			<router-link v-if="!item.children" :to="'/'+item.domain+'/list'" :key="item.domain">
				<el-menu-item :index="item.domain">
					<span slot="title">{{item.title}}</span>
				</el-menu-item>				
			</router-link>
			<el-submenu v-else :index="item.domain">
				<template slot="title">
					<span slot="title">{{item.title}}</span>
				</template>
				<router-link v-for="subitem in item.children" :to="'/'+item.domain+'/'+subitem.domain+'/list'" :key="item.domain+'/'+subitem.domain">
					<el-menu-item :index="item.domain+'/'+subitem.domain">
						<span slot="title">{{subitem.title}}</span>
					</el-menu-item>
				</router-link>
			</el-submenu>
		</template>
	</div>
</template>

<script>
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
    watch: {
    	$route() {
    		this.initCurrentView();
    	}
    },
    methods:{
    	initCurrentView(){
    		console.log( this.$route.params );
    		var domain = this.$route.params.domain || this.$route.params.controller;
    		//var controller = this.$route.params.controller || this.$route.params.domain;
    		console.log('domain:'+domain);
    		var menus = this.menus;
    		var view = menus.forEach(( item, index, arr ) => {
    			if(domain == item.domain){
    				console.log(item);
    				return item;
    			}
    			//return 1;
    		});
    		console.log( view );
    	},
        changeView(item){
        	console.log('---------------item--------------');
        	console.log(item);
        }
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