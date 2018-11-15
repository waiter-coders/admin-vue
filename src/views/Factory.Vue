<template>
    <div>
        <component :is="config.type" :config="config" v-for="(config,index) in configs" :key="index" v-if="configs.length > 0">组件初始化中</component>
    </div>
</template>
<script>
import service from '@/utils/service'

import AdminForm from './factory/Form'
import AdminList from './factory/List'
import AdminTree from './factory/Tree'
import AdminStatistics from './factory/Statistics'

export default {
  name: 'factory',
  components: {
    AdminForm,
    AdminList,
    AdminTree,
    AdminStatistics
  },
  data () {
    return {
      configs: []
    }
  },
  created: function () {
    this.getConfigs()
  },
  methods: {
    getConfigs () {
      var _this = this
      service.get(this.$route.path + '/getConfigs', {params: this.$route.query}).then(function (response) {
        _this.configs = response
      })
    }
  }
}
</script>