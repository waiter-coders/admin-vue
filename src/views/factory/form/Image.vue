<template>
  <div>
    <el-form-item :label="field.name">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :name="field.field"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="baseUrl + '/' + imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'AdminImage',
  props: ['field', 'value'],
  data () {
    return {
      imageUrl: this.value,
      action: 'index.php/' + this.$route.path + '/query?index=0&action=imageUpload&field=' + this.field.field,
      baseUrl: this.field.baseUrl,
      imageType: {'image/png': 1, 'image/jpeg': 1}
    }
  },
  watch: {
    imageUrl: function (newValue, oldValue) {
      this.$emit('input', newValue)
    },
    value: function (newValue, oldValue) {
      this.imageUrl = newValue
    }
  },
  methods: {
    handleAvatarSuccess (response, file) {
      this.imageUrl = response.data
    },
    beforeAvatarUpload (file) {
      if (!(file.type in this.imageType)) {
        this.$message.error('不支持的图片格式!')
        return false
      }
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 1) {
        this.$message.error('上传图片大小不能超过 1MB!')
        return false
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 240px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .avatar {
    width: 240px;
    height: 180px;
    display: block;
  }
</style>
