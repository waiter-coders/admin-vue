<template>
  <el-table :data="config.data" border width="800" @selection-change="handleSelectionChange" ref="multipleTable" :header-cell-style="header_cell_style" :stripe="true" :cell-style="cellStyle">
      <el-table-column v-if="config.needSelect == true" type="selection" width="50"></el-table-column>
      <el-table-column v-for="item in config.fields" :prop="item.field"
          :label="item.name" :key="item.id" :formatter="itemFormatter" :width="columnWitdh(item)"></el-table-column>
      <el-table-column v-if="config.rowActions.length > 0" label="操作" width="270">
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
export default {
  name: 'tableList',
  components: { Buttons },
  props: ['config'],
  data () {
    return {
      multipleSelection: []
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
          return action
        })
        actionsTable.push(actions)
      }
      return actionsTable
    }
  },
  methods: {
    itemFormatter (value, row, column) {
      var fields = this.config.fields
      var field = fields.find(function (val, i) {
        if (val.field === row.property) {
          return val
        }
      })
      switch (field.type) {
      case 'select':
        return field.map[value[row.property]]
      // case 'image':
      //   return '<img src="' + value[row.property] + '">'
      default:
        return value[row.property]
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
      return field.name === 'id' ? '90' : 'flex'
    },
    cellStyle (args) {
      if (args.column.label === '操作' || args.column.label === 'id') {
        return 'text-align:center;'
      }
      return ''
    }
  }
}
</script>
<style scoped>
.table_header {
  background: #aabbcc;
}
.table_id {
  width:30px;
}
</style>

