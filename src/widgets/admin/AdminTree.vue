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
          </span>
        </span>
    </el-tree>
  </div>
</template>

<script>
import service from '@/utils/service'
import ButtonGroup from '@/widgets/admin/public/ButtonGroup'

export default {
  props: ['config'],
  components: [ButtonGroup],
  data () {
    return {
      baseUrl: this.$route.path,
      tree: [],
      field_nodeId: this.config.treeKeys.nodeId,
      field_label: this.config.treeKeys.label,
      field_parentNodeId: this.config.treeKeys.parentNodeId,
      field_preNodeId: this.config.treeKeys.preNodeId,
      field_nextNodeId: this.config.treeKeys.nextNodeId
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
          _this.$store.dispatch('showDialog', {
            config: [
              {
                type: 'admin-form',
                submitType: 'dialogGet',
                fields: [{field: _this.field_label, type: 'string', length: 30, name: '标签'}],
                groups: [],
                actions: [{
                  'name': '添加',
                  'callback': function (data) {
                    _this.$store.dispatch('hiddenDialog')
                    _this.addNode(_this.baseUrl, data[_this.field_label], 0, 0).then(function (newNodeId) {
                      let node = {}
                      node[_this.field_nodeId] = newNodeId
                      node[_this.field_label] = data[_this.field_label]
                      _this.tree = [node]
                    })
                  }}]
              }
            ]
          })
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
      var _this = this
      var _node = node
      var formFields = [
        {field: this.field_label, type: 'string', length: 30, name: '标签'},
        {field: 'position', type: 'select', map: { 'after': '兄弟节点', 'inner': '子节点' }, name: '位置'}
      ]

      var addAction = {
        'name': '添加',
        'callback': function (data) {
          _this.$store.dispatch('hiddenDialog')
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
          })
        }}
      this.$store.dispatch('showDialog', {
        config: [
          {
            type: 'admin-form',
            submitType: 'dialogGet',
            fields: formFields,
            groups: [],
            actions: [addAction]
          }
        ]
      })
    },
    edit (node, data) {
      var _this = this
      var _node = node
      var formFields = [
        {field: this.field_label, type: 'string', length: 30, name: '标签', value: node.data[this.field_label]}
      ]

      var editBtn = {
        'name': '编辑',
        'callback': function (data) {
          _this.$store.dispatch('hiddenDialog')
          _this.changeNodeLabel(_this.baseUrl, _node.data[_this.field_nodeId], data[_this.field_label]).then(function () {
            _node.data[_this.field_label] = data[_this.field_label]
          })
        }}
      this.$store.dispatch('showDialog', {
        config: [
          {
            type: 'admin-form',
            submitType: 'dialogGet',
            fields: formFields,
            groups: [],
            actions: [editBtn]
          }
        ]
      })
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
      console.info(node)
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
