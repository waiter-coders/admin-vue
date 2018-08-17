<template>
	<div class="tags-view-container">
	  <div class="tags-view-wrapper">
    <!--<scroll-pane class='tags-view-wrapper' ref='scrollPane'>-->
	      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
	        :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
	        {{tag.title}}
	        {{tag.name}}
	        <!--{{generateTitle(tag.title)}}-->
	        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
	      </router-link>
      </div>
    <!--</scroll-pane>-->
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">全部关闭</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.app.visitedViews
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    // generateTitle, //  generateTitle by vue-i18n
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag () {
      //     const tags = this.$refs.tag
      //     this.$nextTick(() => {
      //       for (const tag of tags) {
      //         if (tag.to === this.$route.path) {
      //           this.$refs.scrollPane.moveToTarget(tag.$el)
      //           break
      //         }
      //       }
      //     })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$borderColor: #d8dce5;
$activeColor: #42b983;
.tags-view-container {
  .tags-view-wrapper {
    height: 34px;
    background: #fff;
    border-bottom: 1px solid $borderColor;
    box-shadow: 0px 1px 3px 0 rgba(55, 55, 55, 0.12),
      0 0 3px 0 rgba(0, 0, 0, 0.04);
    text-align: left;
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      padding: 0px 8px;
      border: 1px solid $borderColor;
      margin-top: 3px;
      font-size: 12px;
      position: relative;
      &:first-of-type {
        margin-left: 10px;
      }
      & + .tags-view-item {
        margin-left: 6px;
      }
      &.active {
        background: $activeColor;
        border-color: $activeColor;
        color: #fff;
        &:before {
          content: "";
          background: #fff;
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    position: absolute;
    width: 100px;
    background: #fff;
    border-radius: 6px;
    z-index: 22;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);
    text-align: left;
    padding: 4px 0;
    font-size: 12px;
    li {
      padding: 6px 10px;
      &:hover {
        background: #f1f1f1;
      }
    }
  }
}
</style>
