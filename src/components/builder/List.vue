<template>
  <div class="list-main">
    <table-list></table-list>
  </div>
  
</template>

<script>
//import { getList } from '@/api/common/paging'
import TableList from './list/Table';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    TableList
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
.list-main{
  padding:20px 30px;
}
</style>
