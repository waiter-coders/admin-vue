<template>
	<div>
		<el-menu mode="vertical" 
			background-color="#545c64"
      		text-color="#fff"
      		active-text-color="#ffd04b"
			:unique-opened="unique"
      		:collapse="isCollapse" >
			<menu-item :menus="menu"></menu-item>
		</el-menu>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from './MenuItem'
import { getMenus } from '@/api/dashboard'
export default {
  data () {
    return {
      menu: [],
      unique: true
    }
  },
  mounted () {
    this.getMenu()
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  components: {
    MenuItem
  },
  methods: {
    getMenu: function () {
      var _this = this
      getMenus().then(response => {
        _this.menu = response
      })
    }
  }
}
</script>
<style lang="scss">
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
.el-submenu {
  overflow: hidden;
}
/*.el-menu--collapse>.el-menu-item span, .el-menu--collapse>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}*/
</style>