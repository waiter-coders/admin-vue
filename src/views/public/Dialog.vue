 <template>
<div>
    <el-dialog
    :title="config.title"
    :visible.sync="config.display">
        <admin-builder :configs="config.config"></admin-builder>
    </el-dialog>
</div>
</template>
<script>
// import request from '@/utils/service'
export default {
  props: ['config']
}
</script>

<style scoped>
</style>
