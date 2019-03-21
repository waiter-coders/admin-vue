<template>
  <div>
  	<el-tree v-if="tree.length > 0"
      :data="tree"
      :node-key="field_nodeId"
      :default-expanded-keys="[]"
      accordion
      @node-drop="handleDrop"
      draggable
      :allowDrag="allowDrag"
      :allow-drop="allowDrop" ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data[field_label] }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click.stop="() => append(node, data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="() => edit(node, data)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="() => remove(node, data)">
              删除
            </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-if="actions.length > 0 && (action.onlyLeaf == false || (action.onlyLeaf == true && !('children' in data)))"
                  v-for="(action,index) in actions" :key="index"
                  @click.stop="() => actionClick(node, data, action)" >
                  {{ action.name }}
              </el-button>
          </span>
        </span>
    </el-tree>
    <admin-dialog :configs="fastEditConfigs" :title="fastEditTitle" :visible="fastEditVisible" @before-close="clearFastEditDialog"></admin-dialog>
  </div>
</template>

<script>
import service from '@/utils/service'
import Buttons from '@/widgets/public/Buttons'
import AdminDialog from '@/widgets/public/Dialog'
import pageUtil from '@/utils/page'

export default {
  props: ['config'],
  components: {Buttons, AdminDialog},
  data () {
    return {
      baseUrl: this.$route.path,
      tree: [],
      field_nodeId: this.config.treeKeys.nodeId,
      field_label: this.config.treeKeys.label,
      field_parentNodeId: this.config.treeKeys.parentNodeId,
      field_preNodeId: this.config.treeKeys.preNodeId,
      field_nextNodeId: this.config.treeKeys.nextNodeId,
      fastEditConfigs: {},
      fastEditTitle: '快速编辑',
      fastEditVisible: false,
      actions: this.config.actions
    }
  },
  created () {
    this.loadTree()
  },
  methods: {
    getTree: function (controller, nodeId) {
      let params = this.$route.query
      params[this.field_nodeId] = nodeId
      return service.get(controller + '/getTree', {
        params: params
      })
    },

    addNode: function (controller, label, moveToId, moveType) {
      let params = this.$route.query
      params[this.field_label] = label
      params['moveToId'] = moveToId
      params['moveType'] = moveType
      return service.get(controller + '/addNode', {
        params: params
      })
    },

    changeNodeLabel: function (controller, nodeId, label) {
      let params = this.$route.query
      params[this.field_nodeId] = nodeId
      params[this.field_label] = label
      return service.get(controller + '/changeNodeLabel', {
        params: params
      })
    },

    changeNodePosition: function (controller, nodeId, moveToId, moveType) {
      let params = this.$route.query
      params[this.field_nodeId] = nodeId
      params['moveToId'] = moveToId
      params['moveType'] = moveType
      return service.get(controller + '/changeNodePosition', {
        params: params
      })
    },

    deleteNode: function (controller, nodeId) {
      let params = this.$route.query
      params[this.field_nodeId] = nodeId
      return service.get(controller + '/deleteNode', {
        params: params
      })
    },
    formatAjaxData (response) {
      //  规范数据
      var children = []
      for (var i in response) {
        var node = {}
        node[this.field_label] = response[i][this.field_label]
        node[this.field_nodeId] = response[i][this.field_nodeId]
        node['isLeaf'] = parseInt(response[i]['isLeaf']) > 0 ? 'leaf' : false
        children.push(node)
      }
      return children
    },
    loadTree (node, callback) {
      var _this = this
      this.getTree(this.baseUrl, 0).then(function (response) {
        _this.tree = response
        if (response.length === 0) {
          _this.fastEditTitle = '添加节点'
          _this.fastEditVisible = true
          _this.fastEditConfigs = [
            {
              type: 'admin-form',
              submitType: 'dialogGet',
              fields: [{field: _this.field_label, type: 'string', length: 30, name: '标签'}],
              groups: [],
              actions: [{
                'name': '添加',
                'callback': function (data) {
                  let value = data[_this.field_label]
                  _this.addNode(_this.baseUrl, value, 0, 0).then(function (newNodeId) {
                    let node = {}
                    node[_this.field_nodeId] = newNodeId
                    node[_this.field_label] = data[_this.field_label]
                    _this.tree = [node]
                    _this.clearFastEditDialog()
                  })
                }}]
            }
          ]
        }
      })
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      this.changeNodePosition(this.baseUrl, draggingNode.data[this.field_nodeId], dropNode.data[this.field_nodeId], dropType)
    },
    allowDrag () {
      return true
    },
    allowDrop () {
      return true
    },
    append (node, data) {
      let _this = this
      var _node = node
      this.fastEditTitle = '添加节点'
      this.fastEditVisible = true
      this.fastEditConfigs = [
        {
          type: 'admin-form',
          submitType: 'dialogGet',
          fields: [
            {field: this.field_label, type: 'string', length: 30, name: '标签'},
            {field: 'position', type: 'select', map: { 'after': '兄弟节点', 'inner': '子节点' }, name: '位置'}
          ],
          groups: [],
          actions: [{
            'name': '添加',
            'callback': function (data) {
              _this.addNode(_this.baseUrl, data[_this.field_label], _node.data[_this.field_nodeId], data.position).then(function (newNodeId) {
                let newNode = {}
                newNode[_this.field_nodeId] = newNodeId
                newNode[_this.field_label] = data[_this.field_label]
                newNode['isLeaf'] = true
                if (data.position === 'after') {
                  _this.$refs.tree.insertAfter(newNode, _node)
                }
                if (data.position === 'inner') {
                  _this.$refs.tree.append(newNode, _node)
                }
                _this.clearFastEditDialog()
              })
            }
          }]
        }
      ]
    },
    edit (node, data) {
      let _this = this
      var _node = node
      this.fastEditTitle = '添加节点'
      this.fastEditVisible = true
      this.fastEditConfigs = [
        {
          type: 'admin-form',
          submitType: 'dialogGet',
          fields: [
            {field: this.field_label, type: 'string', length: 30, name: '标签', value: node.data[this.field_label]}
          ],
          groups: [],
          actions: [{
            'name': '编辑',
            'callback': function (data) {
              _this.changeNodeLabel(_this.baseUrl, _node.data[_this.field_nodeId], data[_this.field_label]).then(function () {
                _node.data[_this.field_label] = data[_this.field_label]
                _this.clearFastEditDialog()
              })
            }}
          ]
        }
      ]
    },
    remove (node, data) {
      var _this = this
      let _node = node
      if (node.childNodes.length > 0) {
        this.$message({
          type: 'error',
          message: '该节点仍有子节点，不可删除！'
        })
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.deleteNode(this.baseUrl, node.data[_this.field_nodeId]).then(function () {
          _this.$refs.tree.remove(_node)
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    clearFastEditDialog () {
      this.fastEditConfigs = {}
      this.fastEditTitle = '快速编辑'
      this.fastEditVisible = false
    },
    actionClick (node, data, action) {
      var _this = this
      action.url = action.url.replace('@primaryKey@', this.field_nodeId)
      action.url = action.url.replace('@data.id@', data[this.field_nodeId])

      var post = {}
      if (action.location === 'select') {
        post.ids = this.$refs.table_list.getSelectIds()
      }
      if (action.id === 'fastAdd') {
        return this.fastAdd()
      }

      switch (action.type) {
      case 'ajax':
        pageUtil.fetch(this.baseUrl + '/' + action.url, post,
          action.confirm, action.success, action.error
        ).then(function () {
          _this.reloadData()
        })
        break
      case 'dialog':
        this.showDialog(action)
        break
      case 'page':
      default:
        this.$router.push({ path: action.url, params: action.params })
      }
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 12px 35px;
}
</style>
