<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="100px" class="form-inline" @submit.native.prevent>
       <component :is="field.type | typeFilter" v-model="field.value" :field="field" v-for="(field,index) in fields" :key="index" v-if="fields.length > 0">组件初始化失败</component>
       <el-form-item>
         <el-button type="primary" @click="handleAction(action)" v-for="(action,actionIndex) in actions" :key="actionIndex">{{action.name}}</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CheckBox, Datetime, Editor, AdminInput, AdminSelect, AdminLinkSelect, AdminImage } from '@/widgets/admin/form'
import { formConfig } from '@/utils/loader'
import service from '@/utils/service'
let qs = require('qs')

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
    CheckBox,
    Datetime,
    Editor,
    AdminInput,
    AdminSelect,
    AdminLinkSelect,
    AdminImage
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
    width: 800px;
  }
}
</style>
