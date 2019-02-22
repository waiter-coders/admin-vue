 <template>
<div>
    <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :modal="true"
    width="45%"
    :before-close="handleClose"
    :modal-append-to-body="true">
    <div>
      <component :is="config.type" :config="config" v-for="(config,index) in dialogConfigs" :key="index" v-if="dialogConfigs.length > 0">组件初始化中</component>
    </div>
    </el-dialog>
</div>
</template>
<script>
import AdminForm from '@/widgets/Form'

export default {
  props: ['configs', 'title', 'visible'],
  components: {
    AdminForm
  },
  data () {
    return {
      dialogConfigs: this.configs,
      dialogTitle: this.title,
      dialogVisible: this.visible
    }
  },
  methods: {
    handleClose () {
      this.$emit('before-close')
    }
  },
  watch: {
    configs: function (newValue, oldValue) {
      this.dialogConfigs = newValue
    },
    title: function (newValue, oldValue) {
      this.dialogTitle = newValue
    },
    visible: function (newValue, oldValue) {
      this.dialogVisible = newValue
    }
  }
}
</script>

<style scoped>
</style>
