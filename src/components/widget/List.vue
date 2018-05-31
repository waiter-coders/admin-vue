<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search"></search>
      <actions class="list-public-actions"></actions>
    </div>    
    <table-list class="list-table"></table-list>
    <paging class="list-paging"></paging>
  </div>
  
</template>

<script>
//import { getList } from '@/api/common/paging'
import Search from './list/Search';
import Actions from './list/Actions';
import TableList from './list/Table';
import Paging from './list/Paging';

export default {
  name: 'HelloWorld',
  props:['config'],
  data () {
    return {
      list:[],
      totalNum:[],
    }
  },
  components: {
    TableList,
    Actions,
    Search,
    Paging
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
        
    }
  },
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
