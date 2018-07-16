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
 import { getChildren } from '@/api/admin/adminTree'

  export default {
    props:['config'],
    data(){
      return {
        baseUrl:this.$route.path,
        data:[]
      };
    },
    created(){
      var _this = this;
      getChildren(this.baseUrl, 0).then(function(response){
          _this.data = response;
        });
    },
    methods: {

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
      loadChildren(node, callback){
        getChildren(this.baseUrl, node.data[this.config.primaryKey]).then(function(response){
          callback(response);
        });
      },
      allowDrop(){},

      rendNode(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      }
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
