<template>
    <div class="block waiter-paging">
        <el-pagination
        @size-change="PageSizeChange"
        @current-change="toPage"
        :current-page="currentPage"
        :page-sizes="[30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>
<script>
  import { getList } from '@/api/factory/list'

  export default {
    props: {
      pageSize: Number,
      total: Number,
      currentPage: Number,
    },
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
