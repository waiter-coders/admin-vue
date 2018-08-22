<template>
  <div>
  	<el-tree
      :data="data"
      node-key="nodeId"
      :default-expanded-keys="[]"
      lazy
      :load="loadChildren"
      accordion
      draggable
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
  getNodes
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
      data: []
    }
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
    loadChildren (node, callback) {
      var _this = this
      getNodes(this.baseUrl, node.data['nodeId']).then(function (response) {
        callback(_this.formatAjaxData(response))
      })
    },
    allowDrop () {},
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
