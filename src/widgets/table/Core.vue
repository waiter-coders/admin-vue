<template>
  <el-table :data="config.data" border width="800" @selection-change="handleSelectionChange" ref="multipleTable" :header-cell-style="header_cell_style" :stripe="true" :cell-style="cellStyle" @sort-change="handleSortChange" :default-sort="table_sort">
      <el-table-column v-if="config.needSelect == true" type="selection" width="50"></el-table-column>
      <el-table-column v-for="item in config.fields" :prop="item.field"
          :label="item.name" :key="item.id" :width="columnWitdh(item)" :sortable="isSortable(item)">
        <template slot-scope="scope">
          <span v-html="itemFormatter(item, scope.row, scope.$index)"></span>
          <span  v-if="('fastEdit' in item && item.fastEdit === true)" class=" table-row-fast-edit-icon" @click="showFastEdit(item, scope.row, scope.$index)">
            <i class="el-icon-edit-outline"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="config.rowActions.length > 0" label="操作" width="140">
          <template slot-scope="scope">
              <buttons class="list-table-actions" :config="{actions:rowActions[scope.$index]}" @click="rowActionClick" v-if="config.rowActions.length > 0"></buttons>
          </template>
      </el-table-column>
  </el-table>
</template>
<script>
/*
 【表格组件】
 用于渲染表格数据，支持表格的内部操作

@配置：
 config:{
     data:[],
     fields:[],
     rowActions:[],
     needSelect:true
 }

@事件：
click(action, params)
 */
import Buttons from '@/widgets/public/Buttons'

import DateFormatter from '@/utils/date'
import service from '@/utils/service'

export default {
  name: 'tableList',
  components: { Buttons },
  props: ['config'],
  data () {
    return {
      multipleSelection: [],
      isFirst: true
    }
  },
  computed: {
    rowActions: function () {
      var actionsTable = []
      var primaryKey = this.config.fields.filter(function (row) {
        return 'primaryKey' in row
      })[0].field
      for (var i = 0; i < this.config.data.length; i++) {
        var rowData = this.config.data[i]
        var _this = this
        var actions = this.config.rowActions.map(function (row) {
          var action = Object.assign({}, row)
          for (var field in rowData) {
            action.url = action.url.replace(
              '@data.' + field + '@',
              rowData[field]
            )
          }
          action.url = action.url.replace('@primaryKey@', primaryKey)
          action.url = action.url.replace('@data.id@', rowData[primaryKey])
          if ('confirm' in action) {
            action.confirm = action.confirm.replace(
              '@data.id@',
              rowData[primaryKey]
            )
          }
          action.isShow = true
          if ('hidden' in action) {
            action.isShow = !_this.needHidden(action.hidden, rowData)
          }
          return action
        })
        actionsTable.push(actions)
      }
      return actionsTable
    },
    table_sort: function () {
      let sorted = this.config.orderBy.split(' ')
      return {prop: sorted[0], order: sorted[1] === 'desc' ? 'descending' : 'ascending'}
    }
  },
  methods: {
    needHidden (where, rowData) {
      for (var i in where) {
        switch (where[i][1]) {
        case '=':
          if (parseInt(rowData[where[i][0]]) === parseInt(where[i][2])) {
            return true
          }
          break
        case '!=':
          if (parseInt(rowData[where[i][0]]) !== parseInt(where[i][2])) {
            return true
          }
          break
        }
      }
      return false
    },
    itemFormatter (field, rowData, rowIndex) {
      let value = rowData[field.field]

      // 主键详情页链接处理
      if (field.primaryKey === true && this.config.detail.length > 0) {
        let detailUrl = this.config.detail.replace('@primaryKey@', field.field)
        detailUrl = detailUrl.replace('@data.id@', value)
        return '<a href="' + detailUrl + '" target="_blank">' + value + '</a>'
      }

      switch (field.type) {
      case 'select':
        let color = ['success', 'danger', 'warning', 'info']
        let colorIndex = 0
        for (let i in field.map) {
          if (i === value) {
            break
          }
          colorIndex++
        }
        colorIndex = colorIndex % 5
        return '<span class="el-tag el-tag--' + color[colorIndex] + ' el-tag--mini" disable-transitions size="mini">' + field.map[value] + '</el-tag>'
      case 'datetime':
        return '<abbr title="' + value + '">' + DateFormatter.toChinese(value) + '</abbr>'

      // case 'image':
      //   return '<img src="' + value[row.property] + '">'
      case 'string':
        if (value.length > 22) {
          return '<details><summary>' + value.substr(0, 22) + '</summary><span>' + value.substr(22) + '</span></details>'
        } else {
          return value
        }
      default:
        return value
      }
    },
    rowActionClick (action, params) {
      this.$emit('click', action, params)
    },
    getSelectIds () {
      let ids = []
      var primaryKey = this.config.fields.filter(function (row) {
        return 'primaryKey' in row
      })[0].field
      this.multipleSelection.map(item => {
        ids.push(item[primaryKey])
      })
      return ids
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    header_cell_style (args) {
      let style = 'background:#f1f1f1;'
      if (args.column.label === '操作' || args.column.label === 'id') {
        style += 'text-align:center;'
      }
      return style
    },
    header_cell_class_name (args) {
      let cellClass = 'table_header'
      // if (args.columnIndex === 0) {
      //   cellClass += ' table_id'
      // }
      return cellClass
    },
    columnWitdh (field) {
      if (field.name === 'id' || field.type === 'number') {
        return '92'
      }
      if (field.type === 'select') {
        return ('fastEdit' in field && field.fastEdit === true) ? '110' : '90'
      }
      if (field.type === 'datetime') {
        return '80'
      }
      return 'flex'
    },
    isSortable (field) {
      return ('sortable' in field && field.sortable === true)
    },
    cellStyle (args) {
      if (args.column.label === '操作' || args.column.label === 'id') {
        return 'text-align:center;'
      }
      return ''
    },
    handleSortChange (orderSeq) {
      if (this.isFirst) {
        this.isFirst = false
      } else {
        let sorted = orderSeq.order === 'ascending' ? 'asc' : 'desc'
        this.$emit('changeOrderBy', orderSeq.prop + ' ' + sorted)
      }
    },
    showFastEdit (field, rowData, rowIndex) {
      let _this = this
      let config = {'type': 'AdminForm'}
      field.value = rowData[field.field]
      config.fields = [field]
      config.actions = [
        {id: 'fastEdit',
          type: 'ajax',
          isShow: true,
          isDisabled: false,
          url: 'formSubmit',
          name: '更新',
          callback: function (values) {
            // 无内容修改则直接跳过
            if (values[field.field] + '' === rowData[field.field] + '') {
              _this.$emit('clearDialog')
              return false
            }
            let params = {}
            params[_this.config.primaryKey] = rowData[_this.config.primaryKey]
            params['field'] = field.field
            params['value'] = values[field.field]
            service.get(_this.$route.path + '/fieldUpdate', {params: params}).then(function (response) {
              _this.config.data[rowIndex][field.field] = values[field.field]
              _this.$emit('clearDialog')
            })
          }}
      ]
      this.$emit('click', 'fastEdit', {
        'type': 'dialog',
        'configs': [config],
        'title': '快速编辑'
      })
    }
  }
}
</script>
<style>
.table_header {
  background: #aabbcc;
}
.table_id {
  width:30px;
}
.table-row-fast-edit-icon {
  display: inline-block;
  padding: 0 0 0 5px;
  cursor: pointer;
  color:#67c23a;
}
</style>

