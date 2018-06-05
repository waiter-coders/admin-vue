<template>
	<div class="app-wrapper" >
		<sidebar></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<!--<tags-view></tags-view>-->
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Sidebar, AppMain, Navbar/*, TagsView*/ } from '@/components/common'
export default {
	name: 'add',
	components:{
		Sidebar,
		AppMain,
		//TagsView,
		Navbar
	},
	data() {
		return {
			
		}
	}
	
}
</script>

<style lang="scss">
</style>