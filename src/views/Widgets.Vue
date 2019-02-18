<template>
  <div>
    <component :is="config.type" :config="config"  v-for="(config, index) in configs" v-if='configs.length > 0'>
      组件初始化中
    </component>
  </div>
</template>
<script>
import service from '@/utils/service'

import AdminForm from '@/widgets/Form'
import AdminTable from '@/widgets/Table'
import AdminTree from '@/widgets/Tree'
import AdminStatistics from '@/widgets/Statistics'

export default {
  name: 'widgets',
  components: {
    AdminForm,
    AdminTable,
    AdminTree,
    AdminStatistics
  },
  data () {
    return {
      configs: []
    }
  },
  created: function () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      var _this = this
      service.get(this.$route.path + '/getConfig', {params: this.$route.query}).then(function (response) {
        _this.configs = [response]
      })
    }
  }
}
</script>
