<template>
    <div class="block waiter-paging">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
      handleSizeChange(val) {
        this.$emit('size-change', val)
      },
      handleCurrentChange(val) {
        this.$emit('current-change', val)
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
