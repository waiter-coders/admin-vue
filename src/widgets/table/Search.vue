<template>
    <div>
        <el-form :inline="true" ref="form" label-width="80px" @submit.native.prevent>
            <el-form-item v-for="item in config.fields" :key="item.field">
                <el-input v-if="item.type == 'string'" size="mini" :name="item.field" :placeholder="'请输入'+item.name" v-model="item.value"
                    @keyup.enter.native="search"></el-input>
                <el-input v-if="item.type == 'number'" size="mini" :name="item.field" :placeholder="'请输入'+item.name" v-model="item.value"
                    @keyup.enter.native="search"></el-input>
                <el-select v-if="item.type == 'select'" size="mini" v-model="item.value" :placeholder="'请选择'+item.name">
                    <el-option value="" label="全部" key="quanbu"></el-option>
                    <el-option
                    v-for="(value, index) in item.map"
                    :key="index"
                    :label="value"
                    :value="index">
                    </el-option>
                </el-select>
                <el-date-picker size="mini" v-if="item.type == 'datetime'" v-model="item.value" type="datetimerange" range-separator="至" :start-placeholder="'请选择' + item.name + '范围'" end-placeholder="未选择" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini"  icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/*
【search 组件】
提供行级的搜索渲染功能

@配置：
config:{
    fields:[
        {name:"", field:"", type:"", value:""} //  type包括：string number text html select multiSelect linkSelect date datetime image file等
    ]
}

@事件：
search(searchData)

*/
export default {
  name: 'search',
  props: ['config'],
  methods: {
    search: function () {
      this.$emit('search', this.getSearchData())
    },
    getSearchData: function () {
      var data = {}
      for (var item in this.config.fields) {
        if (this.config.fields[item].value !== '') {
          data[this.config.fields[item].field] = this.config.fields[item].value
        }
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0 !important;
}
</style>
