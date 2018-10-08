<template>
  <div>
  	<el-tree
      :data="tree"
      node-key="nodeId"
      :default-expanded-keys="[]"
      accordion
      @node-drop="handleDrop"
      draggable
      :allowDrag="allowDrag"
      :allow-drop="allowDrop" ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
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
import {
  getTree,
  addNode,
  changeNodeLabel,
  changeNodePosition,
  deleteNode
} from '@/api/admin/adminTree'
import ButtonGroup from '@/widgets/admin/public/ButtonGroup'

export default {
  props: ['config'],
  components: [ButtonGroup],
  data () {
    return {
      baseUrl: this.$route.path,
      tree: []
    }
  },
  created () {
    this.loadTree()
  },
  methods: {
    formatAjaxData (response) {
      //  规范数据
      var children = []
      for (var i in response) {
        var node = {}
        node['label'] = response[i]['label']
        node['nodeId'] = response[i]['nodeId']
        node['isLeaf'] = parseInt(response[i]['isLeaf']) > 0 ? 'leaf' : false
        children.push(node)
      }
      return children
    },
    loadTree (node, callback) {
      var _this = this
      getTree(this.baseUrl, 0).then(function (response) {
        _this.tree = response
      })
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      changeNodePosition(this.baseUrl, draggingNode.data.nodeId, dropNode.data.nodeId, dropType)
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
        {field: 'label', type: 'string', length: 30, name: '标签'},
        {field: 'position', type: 'select', map: { 'after': '兄弟节点', 'inner': '子节点' }, name: '位置'}
      ]

      var addAction = {
        'name': '添加',
        'method': function (data) {
          _this.$store.dispatch('hiddenDialog')
          addNode(_this.baseUrl, data.label, _node.data.nodeId, data.position).then(function (newNodeId) {
            let newNode = { nodeId: newNodeId, label: data.label, isLeaf: true }
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
        {field: 'label', type: 'string', length: 30, name: '标签', value: node.data.label}
      ]

      var editBtn = {
        'name': '编辑',
        'method': function (data) {
          _this.$store.dispatch('hiddenDialog')
          changeNodeLabel(_this.baseUrl, _node.data.nodeId, data.label).then(function () {
            _node.data.label = data.label
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
        deleteNode(this.baseUrl, node.data.nodeId).then(function () {
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
