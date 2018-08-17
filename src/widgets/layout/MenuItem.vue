<template>
	<div class="menu-item">
		<template v-for="item in menus">
			<router-link v-if="!item.children" v-bind:to="'/'+item.domain" v-bind:key="item.domain">
				<el-menu-item v-bind:index="item.domain">
					<span slot="title">{{item.title}}</span>
				</el-menu-item>				
			</router-link>
			<el-submenu v-else v-bind:index="item.domain" v-bind:key="item.index">
				<template slot="title">
					<span slot="title">{{item.title}}</span>
				</template>
				<router-link v-for="subitem in item.children" v-bind:to="'/'+item.domain+'/'+subitem.domain" v-bind:key="item.domain+'/'+subitem.domain">
					<el-menu-item v-bind:index="item.domain+'/'+subitem.domain">
						<span slot="title">{{subitem.title}}</span>
					</el-menu-item>
				</router-link>
				
			</el-submenu>
		</template>
	</div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menus: {
      type: Array
    }
  },
  data() {
    return {};
  },
  watch: {
    $route() {
      this.initCurrentView();
    }
  },
  updated() {
    this.initCurrentView();
  },
  methods: {
    initCurrentView() {
      const domain = this.$route.params.domain || this.$route.params.controller;
      const controller = this.$route.params.controller || "";
      let menus = this.menus;
      let view = [];
      let father = menus.find((value, index, arr) => {
        if (domain == value.domain) {
          return value;
        }
      });
      view.push(father);
      if (father && father.hasOwnProperty("children")) {
        let child = father.children.find((value, index, arr) => {
          if (controller == value.domain) {
            return value;
          }
        });
        view.push(child);
      }
      //  console.log(view);
      this.$store.dispatch("initCurrentView", view);
    },
    changeView(item) {
      // console.log('---------------item--------------');
      // console.log(item);
    }
  }
};
</script>
<style lang="scss">
.icon {
  width: 1.3em;
  height: 1.3em;
  margin-right: 16px;
}
.el-submenu {
  overflow: hidden;
}
.el-submenu .el-menu-item {
  min-width: 0px;
  width: auto;
}
</style>