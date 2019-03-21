<template>
  <div class="list-container">
    <div class="list-header">
      <search class="list-search" :config="search" @search="searchClick" v-if="search.fields.length > 0"></search>
      <buttons class="header_buttons_group" :config="{actions:tableActions}" @click="actionsClick" v-if="tableActions.length > 0"></buttons>
    </div>
    <table-core class="list-table" :config="list" @click="actionsClick" @changeOrderBy="changeOrderBy" @clearDialog="clearDialog" ref="table_list"></table-core>
    <paging class="list-paging"
    @changePaging="changePaging"
    :config="paging"
     v-if="paging.totalNum > paging.pageSize"></paging>
     <admin-dialog :configs="dialogConfigs" :title="dialogTitle" :visible="dialogVisible" @before-close="clearDialog"></admin-dialog>
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
      list: { fields: [], rowActions: [], data: [], needSelect: false, detail: '', primaryKey: 'id' },
      paging: {
        pageSize: 10,
        totalNum: 0,
        currentPage: 1
      },
      orderNames: {
        'asc': '从小到大',
        'desc': '从大到小'
      },
      dialogConfigs: {},
      dialogTitle: '快速编辑',
      dialogVisible: false
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
    this.search.fields = 'search' in this.config ? this.filterSearchFields(this.config.search, this.config.fields) : []
    this.tableActions = 'tableActions' in this.config ? this.config.tableActions : []
    this.list.fields = this.fields
    this.list.rowActions = 'rowActions' in this.config ? this.config.rowActions : []
    this.list.needSelect = this.tableActions.filter(function (row) {
      return row.location === 'select'
    }).length > 0
    this.list.detail = this.config.detail
    this.list.orderBy = 'orderBy' in this.config ? this.config.orderBy : this.defaultOrdered()
    this.list.primaryKey = this.config.fields.find(function (val) { return val.primaryKey === true }).field
    this.paging.pageSize = 'paging' in this.config && 'pageSize' in this.config.paging ? this.config.paging['pageSize'] : 10
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
      service.get(_this.baseUrl + '/getTotalNum', {params: params}).then(totalNum => {
        _this.paging.totalNum = parseInt(totalNum)
        if (totalNum === 0) {
          loading.close()
          return Promise.resolve([])
        }
        params.limit = _this.paging.pageSize
        params.offset = (_this.paging.currentPage - 1) * _this.paging.pageSize
        params.orderBy = _this.list.orderBy
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
    defaultOrdered () {
      let primaryKeyField = this.config.fields.find(function (val, i) {
        return val.primaryKey === true
      })
      return primaryKeyField.field + ' desc'
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
    changeOrderBy (orderBy) {
      this.list.orderBy = orderBy
      this.reloadData()
    },
    fastAdd () {
      let _this = this
      let config = {'type': 'AdminForm'}
      config.fields = this.fields
      config.actions = [
        {id: 'fastAdd',
          type: 'ajax',
          isShow: true,
          isDisabled: false,
          url: 'formSubmit',
          name: '添加'
        }
      ]
      config.needCallback = function () {
        _this.clearDialog()
        _this.reloadData()
      }
      this.showDialog({
        'type': 'dialog',
        'configs': [config],
        'title': '快速添加'
      })
    },
    actionsClick (action, params) {
      var _this = this
      var post = {}
      if (params.location === 'select') {
        post.ids = this.$refs.table_list.getSelectIds()
      }
      if (params.id === 'fastAdd') {
        return this.fastAdd()
      }

      switch (params.type) {
      case 'ajax':
        pageUtil.fetch(this.baseUrl + '/' + params.url, post,
          params.confirm, params.success, params.error
        ).then(function () {
          _this.reloadData()
        })
        break
      case 'dialog':
        this.showDialog(params)
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
    showDialog (params) {
      this.dialogConfigs = params.configs
      this.dialogTitle = params.title
      this.dialogVisible = true
    },
    clearDialog () {
      this.dialogConfigs = {}
      this.dialogTitle = '快速编辑'
      this.dialogVisible = false
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
