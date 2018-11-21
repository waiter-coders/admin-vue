<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="100px" class="form-inline" @submit.native.prevent>
      <div v-for="(field,index) in fields" :key="index" v-if="fields.length > 0">
        <component :is="field.type | typeFilter" v-model="field.value" :field="field" v-if="field.primaryKey !== true">组件初始化失败</component>
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

import service from '@/utils/service'
let qs = require('qs')

const formConfig = {
  string: 'admin-input',
  select: 'admin-select',
  linkSelect: 'admin-link-select',
  multiSelect: 'admin-checkbox',
  undefined: 'admin-input',
  datetime: 'admin-datetime',
  html: 'admin-editor',
  date: 'admin-datetime',
  image: 'admin-image',
  number: 'admin-input'
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
      actions: {}
    }
  },
  props: ['config'],
  components: {
    AdminCheckBox, AdminDatetime, AdminEditor, AdminInput, AdminSelect, AdminLinkSelect, AdminImage
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
      service.get(this.baseUrl + '/getFormData', {params: this.query}).then(function (data) {
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
        let _this = this
        service.post(this.baseUrl + '/formSubmit', qs.stringify({ formData: data }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: this.query
        }).then(response => {
          alert('操作成功')
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
