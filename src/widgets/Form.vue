<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="100px" class="form-inline" @submit.native.prevent>
      <div v-for="(field,index) in fields" :key="index" v-if="fields.length > 0">
        <component :is="field.type | typeFilter" v-model="field.value" :field="field" :initData="initData" v-if="field.primaryKey !== true">组件初始化失败</component>
      </div>
       <el-form-item>
         <el-button type="primary" @click="handleAction(action)" v-for="(action,actionIndex) in actions" :key="actionIndex">{{action.name}}</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AdminCheckBox from './form/CheckBox'
import AdminDatetime from './form/Datetime'
import AdminEditor from './form/Editor'
import AdminInput from './form/Input'
import AdminSelect from './form/Select'
import AdminLinkSelect from './form/LinkSelect'
import AdminImage from './form/Image'
import AdminJson from './form/Json'

import service from '@/utils/service'
import { Message } from 'element-ui'
let qs = require('qs')

const formConfig = {
  string: 'adminInput',
  select: 'adminSelect',
  linkSelect: 'adminLinkSelect',
  multiSelect: 'adminCheckbox',
  undefined: 'adminInput',
  datetime: 'adminDatetime',
  html: 'adminEditor',
  date: 'adminDatetime',
  image: 'adminImage',
  number: 'adminInput',
  json: 'adminJson',
  editor: 'adminEditor'
}

export default {
  name: 'AdminForm',
  data () {
    return {
      baseUrl: this.$route.path,
      query: this.$route.query,
      submitType: 'page',
      formData: {},
      fields: {},
      actions: {},
      initData: {}
    }
  },
  props: ['config'],
  components: {
    AdminCheckBox, AdminDatetime, AdminEditor, AdminInput, AdminSelect, AdminLinkSelect, AdminImage, AdminJson
  },
  filters: {
    typeFilter: function (key) {
      return formConfig[key]
    }
  },

  created () {
    this.fields = this.config.fields
    this.actions = this.config.actions
    if (this.config.primaryKey in this.$route.query) {
      var _this = this
      let params = this.query
      service.get(this.baseUrl + '/fetchData', {params: params}).then(function (data) {
        _this.initData = data
        var fields = []
        for (var i in _this.fields) {
          var field = _this.fields[i]['field']
          if (field in data) {
            fields[i] = _this.fields[i]
            fields[i].value = data[field]
          }
        }
        _this.fields = fields
      })
    }
  },
  methods: {
    getFormData: function () {
      let data = {}
      this.fields.forEach(element => {
        data[element.field] = element.value
      })
      return data
    },
    handleAction: function (action) {
      if ('callback' in action) {
        action.callback(this.getFormData())
      } else {
        this.submitForm(this.getFormData())
      }
    },
    submitForm: function (data) {
      try {
        if (data['answer'] !== undefined) {
          let answers = JSON.parse(data['answer'])
          if (answers.length < 6) {
            Message.error('有题目未回答')
            return false
          }
          for (let i = 0; i < 6; i++) {
            if (answers[i] === null) {
              Message.error('第' + (i + 1) + '题未回答')
              return false
            }
            if (i > 3) {
              if (answers[i].length === 0) {
                Message.error('第' + (i + 1) + '题未回答')
                return false
              }
              for (var x in answers[i]) {
                if (answers[i][x] === '') {
                  Message.error('第' + (i + 1) + '题,第' + (parseInt(x) + 1) + '空未回答')
                  return false
                }
              }
            }
          }
        }
        let _this = this
        let params = this.query
        service.post(this.baseUrl + '/submit', qs.stringify({
          formData: data
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: params
        }).then(response => {
          Message.success('操作成功')
          _this.$router.go(-1)
        })
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.admin-form {
  padding: 20px 30px;
  .form-inline {
    width: 90%;
    max-width: 1200px;
  }
}
</style>
