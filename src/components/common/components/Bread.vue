<template>
	<div>
		<el-breadcrumb>
			<el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item></el-breadcrumb-item>
			<el-breadcrumb-item>{{root()}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
  name: 'bread',
  data() {
  	return {
  		root(){
  			console.log(this.$route);
  			return this.$route.path.title;
  		}
  	}
  },
  props: {
    
  },
  methods: {
  	get(){
  		return
  	},
  }
}
</script>

<style scoped>
.el-breadcrumb{
	line-height: inherit;
}

</style>
