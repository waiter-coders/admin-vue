<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :search="config.search" @search="handleSearch"></search>
      <actions class="list-public-actions"></actions>
    </div>    
    <table-list class="list-table" :listData="listData"></table-list>
    <paging class="list-paging" 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :pageSize="pageSize" 
    :total="total" 
    :currentPage="currentPage"
    ></paging>
  </div>
  
</template>

<script>
import { getList } from '@/api/factory/list'
import Search from './list/Search';
import Actions from './list/Actions';
import TableList from './list/Table';
import Paging from './list/Paging';

export default {
  name: 'List',
  props:['config'],
  data () {
    return {
      listData:{},
      pageSize: 30,
      total: 0,
      currentPage: 1,
    }
  },
  components: {
    TableList,
    Actions,
    Search,
    Paging
  },
  created() {
    this.getList('/paging/list', this.currentPage, this.pageSize)
  },
  methods: {
      getList(url, curPage, pageSize, searchs) {
        getList(url, curPage, pageSize, searchs).then(res=>{
          this.listData = res.data;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total
        });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
      },
      handleCurrentChange(curPage) {
        this.currentPage = curPage;
        this.getList('/paging/list', this.currentPage, this.pageSize);
      },
      handleSearch(searchValue) {
        this.getList('/paging/list', 1, this.pageSize, searchValue);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container{
  padding:20px 30px;
}
.list-header{
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.list-search{
  flex: 0 0 auto;
}
.list-public-actions{
  flex: 0 0 auto;
}

</style>
