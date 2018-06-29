<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :search="config.search" @search="search"></search>
      <actions class="list-public-actions" :actions="config.publicActions" @download="download"></actions>
    </div>    
    <table-list class="list-table" :list="list" :itemActions="config.itemActions" :publicActions="config.publicActions.length > 0"></table-list>
    <paging class="list-paging" 
    @size-change="setPageSize"
    @current-change="toPage"
    :pageSize="pageSize" 
    :total="total" 
    :currentPage="currentPage"
    ></paging>
  </div>
  
</template>

<script>
import { getList } from '@/api/admin/adminList'
import Search from './list/Search';
import Actions from './list/Actions';
import TableList from './list/Table';
import Paging from './list/Paging';
import { Loading } from 'element-ui';

export default {
  name: 'AdminList',
  props:['config'],
  data () {
    return {
      list:{},
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
    this.getData(this.$route.path + '/getList', this.currentPage, this.pageSize);
  },
  methods: {
      getData(url, currentPage, pageSize, searchs) {
        var loading = Loading.service({ target:'.list-table', text:'加载中……', fullscreen: false});
        getList(url, currentPage, pageSize, searchs).then(response=>{
          this.list = response.data;
          this.pageSize = response.data.pageSize;
          this.total = response.data.total
        });
        loading.close();
      },
      setPageSize(pageSize) {
        this.pageSize = pageSize;
      },
      toPage(currentPage) {
        this.currentPage = currentPage;
        this.getData(this.$route.path+ '/getList', this.currentPage, this.pageSize);
      },
      search(searchValue) {
        this.getData(this.$route.path+ '/getList', 1, this.pageSize, searchValue);
      },
      download() {
        this.$alert('下载');
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
