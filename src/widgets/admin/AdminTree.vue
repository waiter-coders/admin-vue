<template>
  <div>
  	<el-tree
      :data="tree"
      node-key="nodeId"
      :default-expanded-keys="[]"
      accordion
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
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
  getTree
  // addNode,
  // changeNodLabel,
  // changeNodePosition,
  // deleteNode
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
        // callback(_this.formatAjaxData(response))
      })
    },
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrag () {
      console.info('drag')
      return true
    },
    allowDrop () {
      console.info('drop')
      return true
    },
    append (node, data) {
      var _this = this
      var _node = node
      this.$store.dispatch('showDialog', {
        config: [
          {
            type: 'admin-form',
            submitType: 'dialog',
            fields: [
              { field: 'nodeId', name: 'id', type: 'number', primaryKey: true },
              {
                field: 'label',
                type: 'string',
                length: 30,
                name: '标签'
              },
              {
                field: 'position',
                type: 'select',
                map: { 1: '兄弟节点', 2: '子节点' },
                length: 30,
                name: '位置'
              }
            ],
            groups: [],
            primaryKey: 'nodeId',
            url: ''
          }
        ],
        callback: function () {
          _this.$refs.tree.insertAfter(
            { nodeId: 999, label: '不错', isLeaf: true },
            _node
          )
        }
      })
    },
    edit (node, data) {
      var _this = this
      var _node = node
      this.$store.dispatch('showDialog', {
        config: [
          {
            type: 'admin-form',
            submitType: 'dialog',
            fields: [
              { field: 'nodeId', name: 'id', type: 'number', primaryKey: true },
              {
                field: 'label',
                type: 'string',
                length: 30,
                name: '标签'
              },
              {
                field: 'position',
                type: 'select',
                map: { 1: '添加到前面' },
                length: 30,
                name: '位置'
              }
            ],
            groups: [],
            primaryKey: 'qaId',
            url: ''
          }
        ],
        callback: function () {
          _this.$refs.tree.insertAfter(
            { nodeId: 999, label: '不错', isLeaf: true },
            _node
          )
        }
      })
    },
    remove (node, data) {
      this.$refs.tree.remove(node)
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
