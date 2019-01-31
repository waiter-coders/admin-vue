<template>
<div>
  <div class="topic">{{ value.topic }}</div>
  <div class="orderedContainer">
    <div class="orderedIndex">
      <div v-for="(i,key) in value.index" :key="key" class="orderedIndexItem">{{ i }}</div>
    </div>
    <div class="orderedRange"  :class="sortClass">
      <div v-for="(row,key) in value.range" :key="key" >
        <div v-if="row.isShow" class="orderedRangeItem">
          <div class="orderedRangeItemTitle">{{ row.name }}</div>
          <div v-if="value.canRemove"><el-button type="text" size="mini" @click="removeItem(key)">删除</el-button></div>
        </div>
        <div v-else class="orderedRangeItem orderedRangeItemRemove">
          无
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="tip">请拖动改变内容的排名次序<span v-if="value.canRemove">,点击删除可去掉自己不需要的选项&nbsp;&nbsp;<el-button @click="clearChange" type="text">还原删除项</el-button></span></div> -->
<div class="tip">按照最左侧红色排序，请拖动部门来改变排名次序，和自己不相关的部门可点击删除&nbsp;&nbsp;<el-button @click="clearChange" type="text">还原删除项</el-button></div>

</div>

</template>

<script>

import AdminInput from '../Input'
import Sortable from 'sortablejs'

export default {
  name: 'AdminJsonDefault',
  props: ['params', 'index'],
  components: {
    AdminInput
  },
  data () {
    return {
      createParams: {},
      value: {
        topic: '',
        range: [],
        userAnswer: [],
        canRemove: false,
        index: []
      },
      sortable: null,
      sortClass: 'sort_' + parseInt(Math.random() * 1000)
    }
  },
  created () {
    this.createParams = this.params
    this.value.topic = this.params.topic
    this.value.range = this.params.range.map(function (name) { return {'name': name, 'isShow': true} })
    this.value.canRemove = this.params.canRemove
    for (let i = 1; i <= this.value.range.length; i++) {
      this.value.index.push(i)
    }
    for (let i = 0; i < this.value.range.length && i < this.params.index.length; i++) {
      this.value.index[i] = this.params.index[i]
    }
    this.value.userAnswer = this.value.range.slice()
    this.$nextTick(() => {
      this.setSort()
    })
  },
  methods: {
    setSort () {
      const el = document.querySelectorAll('.' + this.sortClass)[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        onEnd: evt => {
          const tempIndex = this.value.userAnswer.splice(evt.oldIndex, 1)[0]
          this.value.userAnswer.splice(evt.newIndex, 0, tempIndex)
          this.pushValue()
        }
      })
    },
    removeItem (key) {
      this.value.range[key]['isShow'] = false
      this.pushValue()
    },
    clearChange () {
      for (let i = 0; i < this.value.range.length; i++) {
        this.value.range[i]['isShow'] = true
      }
      this.pushValue()
    },
    pushValue () {
      this.$emit('makeAnswer', this.index, this.value.userAnswer.map(function (row) {
        return row['isShow'] ? row['name'] : ''
      }))
    }
  },
  watch: {
    value: function (newValue, oldValue) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topic {
  padding: 0 0 15px 0;
}
.orderedContainer {
  display: flex;
  width: 35%;
  margin: 5px 0 20px 0;
   background: #f8f8f8;
   border: solid 1px #aaa;
}
.hide {
  display: none;
}
.orderedIndex{
 text-align: left;
 background: #aaa;
 display: flex;
 flex-direction: column;
}
.orderedIndexItem{
  padding: 9px 12px 8px 12px;
  color:crimson;
  font-weight: 800;
  flex:1;
  text-align: center;
  height:28px;
  line-height: 28px;
}
.orderedRange{
border: solid 1px #abc;
 flex:1;
 background: #f8f8f8;
}
.orderedRangeItem{
    padding: 8px 25px;
    border-bottom:solid 1px #abc;
    display: flex;
}
.orderedRangeItemRemove{
background:#efefef;
text-align:center;
color:#888;
  flex:1;
  line-height: 28px;
  justify-items: center;
  align-items: center;
}
.orderedRangeItem:hover{
  background: #abc;
}
.orderedRangeItemTitle{
  flex:1;
  line-height: 28px;
  cursor: pointer;
}
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
.tip {
  font-size: 9px;
  color: red;
  font-family: 'Courier New', Courier, monospace
}
</style>
