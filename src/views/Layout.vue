<template>
	<div class="app-wrapper" :class="{'hideSidebar': !sidebar.opened}">
		<sidebar></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Sidebar, AppMain, Navbar, TagsView } from '@/components/common'
export default {
	name: 'layout',
	components:{
		Sidebar,
		AppMain,
		TagsView,
		Navbar
	},
	computed:{
		sidebar(){
			return this.$store.state.app.sidebar
		}
	},
	data() {
		return {
			
		}
	}
	
}
</script>

<style lang="scss">
.app-wrapper{
	width:100%;
	height:100%;
	.main-container{
		min-height:100%;
		margin-left:180px;
		transition:margin-left 0.28s;
	}
	.menu-wrapper{
		width:180px;
	}
	&.hideSidebar{
		.main-container{
			margin-left:64px;
		}
		.menu-wrapper{
			width:64px;
		}
	}	
}	

</style>