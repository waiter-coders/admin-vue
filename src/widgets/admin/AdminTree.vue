<template>
  <div>
  	<el-tree
      :data="data"
      :node-key="config.primaryKey"
      :default-expanded-keys="[]"
      lazy
      :load="loadChildren"
      accordion
      draggable
      :allow-drop="allowDrop"
      :render-content="rendNode">
    </el-tree>
  </div>
</template>

<script>
 import { getNodes } from '@/api/admin/adminTree'

  export default {
    props:['config'],
    data(){
      return {
        baseUrl:this.$route.path,
        data:[]
      };
    },
    methods: {
      rendNode(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      formatAjaxData(response){
        // 规范数据
          var children = [];
          for (var i in response) {
            var node = {};
            node['label'] = response[i]['label'];
            node[this.config.primaryKey] = response[i][this.config.primaryKey];
            node['isLeaf'] = parseInt(response[i]['isLeaf']) > 0 ? 'leaf' : false;
            children.push(node);
          }
          return children;
      },
      loadChildren(node, callback){
        var _this = this;
        getNodes(this.baseUrl, node.data[this.config.primaryKey]).then(function(response){
          callback(_this.formatAjaxData(response));
        });
      },
      allowDrop(){},
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },    
    }
  };
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
