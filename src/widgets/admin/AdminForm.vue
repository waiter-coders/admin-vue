<template>
  <div class="admin-form">
  	<el-form ref="form" :model="formData" label-width="100px" class="form-inline" @submit.native.prevent>
       <component :is="field.type | typeFilter" :field="field" v-for="(field,index) in fields" :key="index">组件初始化失败</component>
       <el-form-item>
         <el-button type="primary" @click="submitForm">提交</el-button>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CheckBox, Datetime, Editor, AdminInput, AdminSelect } from './form'
import { formConfig } from '@/utils/loader'
import { formSubmit, getFormData } from '@/api/admin/adminForm'
export default {
  name: 'AdminForm',
  data () {
    return {
      baseUrl: this.$route.path,
      submitType: 'page',
      formData: {},
      fields: {}
    }
  },
  props: ['config'],
  components: {
    CheckBox,
    Datetime,
    Editor,
    AdminInput,
    AdminSelect
  },
  filters: {
    typeFilter: function (key) {
      return formConfig[key]
    }
  },
  created () {
    this.fields = this.config.fields
    if (this.config.primaryKey in this.$route.query) {
      var _this = this
      let getParams = {}
      getParams[this.config.primaryKey] = this.$route.query[this.config.primaryKey]
      getFormData(this.baseUrl, getParams).then(function (data) {
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

    if ('submitType' in this.config) {
      this.submitType = this.config.submitType
    }
  },
  methods: {
    getFormData: function () {
      let $el = this.$children[0].$children
      let data = {}
      $el.forEach(element => {
        if (element.getElementData) {
          Object.assign(data, element.getElementData())
        }
      })
      return data
    },
    submitForm: function () {
      try {
        let _this = this
        let data = this.getFormData()
        let getParams = {}
        getParams[this.config.primaryKey] =
          this.config.primaryKey in this.$route.query
            ? this.$route.query[this.config.primaryKey]
            : 0
        let url = this.config.url || this.baseUrl
        formSubmit(url, { formData: data }, getParams).then(response => {
          alert('操作成功')
          switch (_this.submitType) {
          case 'dialog':
            _this.$store.dispatch('hiddenDialog')
            break
          case 'page':
          default:
            _this.$router.go(-1)
          }
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
