<template>
    <div class="block waiter-paging">
        <el-pagination
        @size-change="PageSizeChange"
        @current-change="toPage"
        :current-page="config.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="config.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="config.totalNum">
        </el-pagination>
    </div>
</template>
<script>
  export default {
    props: ['config'],
    methods: {
      PageSizeChange(pageSize) {
        this.$emit('size-change', pageSize)
      },
      toPage(currentPage) {
        this.$emit('current-change', currentPage)
      }
    }
  }
</script>
<style scoped>
.waiter-paging {    
    text-align: right;
    margin-top: 20px;
    }
</style>
