<template>
    <div class="block waiter-paging">
        <el-pagination
        @size-change="changePageSize"
        @current-change="changePageNum"
        :current-page="config.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="config.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="config.totalNum">
        </el-pagination>
    </div>
</template>
<script>
/*
【分页器组件】
  提供分页的页码选择、展示条数等的功能渲染

@配置：
config:{
    currentPage:1,
    pageSize:15,
    totalNum:200
}

@事件：
changePaging(paging)
*/
  export default {
    props: ['config'],
    methods: {
      changePageSize(pageSize){
        this.config.pageSize = pageSize;
        this.$emit('changePaging', this.config)
      },
      changePageNum(pageNum){
        this.config.currentPage = pageNum;
        this.$emit('changePaging', this.config)
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
