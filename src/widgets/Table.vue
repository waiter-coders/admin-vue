<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :config="search" @search="searchClick" v-if="search.fields.length > 0"></search>
      <el-dropdown trigger="hover" class="header_buttons_group" v-if="allOrderNames.length > 0">
        <el-button size="mini">
          排序：{{ currentName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <div v-for="(name, key) in allOrderNames" :key="key" @click="changeOrderIndex(key)" class="order_select_item">{{ name }}</div>
        </el-dropdown-menu>
      </el-dropdown>
      <buttons class="header_buttons_group" :config="{actions:tableActions}" @click="actionsClick" v-if="tableActions.length > 0"></buttons>
    </div>
    <table-core class="list-table" :config="list" @click="actionsClick" ref="table_list"></table-core>
    <paging class="list-paging"
    @changePaging="changePaging"
    :config="paging"
     v-if="paging.totalNum > paging.pageSize"></paging>
     <admin-dialog :configs="fastEditConfigs" :title="fastEditTitle" :visible="fastEditVisible" @before-close="clearFastEditDialog"></admin-dialog>
  </div>
</template>

<script>
import service from '@/utils/service'
import Buttons from '@/widgets/public/Buttons'
import Search from './table/Search'
import TableCore from './table/Core'
import Paging from './table/Paging'
import AdminDialog from '@/widgets/public/Dialog'
import { Loading } from 'element-ui'

// import fetch from '@/utils/service'
import pageUtil from '@/utils/page'

/*
【列表组件】
用于渲染列表

@配置：
config:{
  fields:[],
  search:[],
  tableActions:[],
  rowActions:[],
  paging:{}
}

@事件：无返回事件
*/

export default {
  name: 'AdminList',
  props: ['config'],
  components: {
    TableCore,
    Buttons,
    Search,
    Paging,
    AdminDialog
  },
  data () {
    return {
      baseUrl: this.$route.path,
      query: this.$route.query,
      fields: [],
      search: { url: this.$route.path, fields: [], searchParams: {} },
      orderIndex: 0,
      orderMap: [
        // ['qaId', 'desc'],
        // ['voteNum', 'desc']
      ],
      hiddenSearch: {},
      tableActions: [],
      list: { fields: [], rowActions: [], data: [], needSelect: false },
      paging: {
        pageSize: 10,
        totalNum: 0,
        currentPage: 1
      },
      orderNames: {
        'asc': '从小到大',
        'desc': '从大到小'
      },
      fastEditConfigs: {},
      fastEditTitle: '快速编辑',
      fastEditVisible: false
    }
  },
  computed: {
    currentName: function () {
      return this.getOrderName(this.orderMap[this.orderIndex])
    },
    allOrderNames: function () {
      let names = []
      for (let i in this.orderMap) {
        names.push(this.getOrderName(this.orderMap[i]))
      }
      return names
    }
  },
  created () {
    this.fields = 'fields' in this.config ? this.config.fields : []
    this.search.fields =
      'search' in this.config
        ? this.filterSearchFields(this.config.search, this.config.fields)
        : []
    this.tableActions =
      'tableActions' in this.config ? this.config.tableActions : []
    this.list.fields = this.fields
    this.list.rowActions =
      'rowActions' in this.config ? this.config.rowActions : []
    this.list.needSelect =
      this.tableActions.filter(function (row) {
        return row.location === 'select'
      }).length > 0
    this.paging.pageSize =
      'paging' in this.config && 'pageSize' in this.config.paging
        ? this.config.paging['pageSize']
        : 10
    this.reloadData()
  },
  methods: {
    reloadData () {
      var _this = this
      var loading = Loading.service({
        target: '.list-table',
        text: '加载中……',
        fullscreen: false
      })
      var params = this.query
      params.search = this.search.searchParams
      params.index = 0
      service.get(_this.baseUrl + '/getTotalNum', {params: params}).then(totalNum => {
        _this.paging.totalNum = parseInt(totalNum)
        if (totalNum === 0) {
          return Promise.resolve([])
        }
        params.limit = _this.paging.pageSize
        params.offset = (_this.paging.currentPage - 1) * _this.paging.pageSize
        return service.get(_this.baseUrl + '/getList', {params: params}).then(data => {
          _this.list.data = data
          loading.close()
        })
      })
    },
    getOrderName (order) {
      for (let i in this.fields) {
        if (this.fields[i]['field'] === order[0]) {
          return this.fields[i]['name'] + ' ' + this.orderNames[order[1]]
        }
      }
      return ''
    },
    changeOrderIndex (key) {
      this.orderIndex = key
      this.paging.currentPage = 1 //  搜索自动跳回第一页
      this.reloadData()
    },
    searchClick (searchParams) {
      this.search.searchParams = searchParams
      this.paging.currentPage = 1 //  搜索自动跳回第一页
      this.reloadData()
    },
    actionsClick (action, params) {
      var _this = this
      var post = {}
      if (params.location === 'select') {
        post.ids = this.$refs.table_list.getSelectIds()
      }
      switch (params.type) {
      case 'ajax':
        pageUtil
          .fetch(
            this.baseUrl + '/' + params.url,
            post,
            params.confirm,
            params.success,
            params.error
          )
          .then(function () {
            _this.reloadData()
          })
        break
      case 'dialog':
        this.showFastEditDialog()
        this.$emit('showDialog', {
          type: 'admin-form',
          fields: [
            {
              name: 'id',
              field: 'id',
              type: 'number',
              primaryKey: true,
              fastEdit: false,
              value: '12'
            },
            {
              name: '姓名',
              field: 'username',
              primaryKey: false,
              type: 'string',
              fastEdit: true,
              value: 'hanhan'
            },
            {
              name: '性别',
              field: 'sex',
              type: 'select',
              map: { '1': '男', '2': '女' },
              value: '2'
            },
            {
              name: '爱好',
              field: 'hobby',
              type: 'multiSelect',
              map: { '1': '电影', '2': '看书', '3': '旅行', '4': '烹饪' },
              value: '[2,4]'
            },
            {
              name: '年份',
              field: 'year',
              type: 'datetime',
              datetime: 'year',
              value: '2018'
            }, // datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange
            {
              name: '月份',
              field: 'month',
              type: 'datetime',
              datetime: 'month',
              value: '201807'
            },
            {
              name: '日期',
              field: 'date',
              type: 'datetime',
              datetime: 'date',
              value: '20180706'
            },
            {
              name: '日期时间范围',
              field: 'datetimerange',
              type: 'datetime',
              datetime: 'datetimerange',
              value: ['2018-07-01 00:00:00', '2018-08-01 00:00:00']
            },
            {
              name: '日期时间',
              field: 'datetime',
              type: 'datetime',
              datetime: 'datetime',
              value: '2018-06-30 10:10:23'
            }
          ],
          url: 'controller/add'
        })
        break
      case 'page':
      default:
        this.$router.push({ path: params.url, params: params.params })
      }
    },
    changePaging (paging) {
      this.paging = paging
      this.reloadData()
    },
    filterSearchFields (searchFields, allFields) {
      var fields = []
      allFields.forEach(row => {
        searchFields.forEach((search, index) => {
          if (search.field === row.field) {
            fields[index] = row
            fields[index]['searchType'] = search.searchType
          }
        })
      })
      return fields
    },
    clearFastEditDialog () {
      this.fastEditConfigs = {}
      this.fastEditTitle = '快速编辑'
      this.fastEditVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container {
  padding: 5px 30px;
}
.list-header {
  display: flex;
  align-items: center;
  margin: 15px 5px;
}
.list-search {
  flex: 1;
  flex-direction: column;
  justify-content: center;
}
.header_buttons_group {
  margin: 0 0 0 35px;
}
.order_select_item {
  padding: 8px 15px;
  font-size: 14px;
  color: #515151;
  cursor: pointer;
}
.order_select_item:hover{
  background: cadetblue
}
</style>
