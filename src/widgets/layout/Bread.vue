<template>
	<div>
		<el-breadcrumb>
			<el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in currentView" :key="item.domain">{{item.title}}</el-breadcrumb-item>
			<!--<el-breadcrumb-item>{{root()}}</el-breadcrumb-item>-->
		</el-breadcrumb>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'bread',
  data () {
    return {
      root () {
        return this.$route.meta.title
      }
    }
  },
  computed: {
    ...mapGetters(['currentView'])
  }
}
</script>

<style scoped>
.el-breadcrumb {
  line-height: inherit;
}
</style>
