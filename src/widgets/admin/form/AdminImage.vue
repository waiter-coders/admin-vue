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
        <img v-if="imageUrl" :src="'http://image.teamcorp.cn/wo_de/product/' + imageUrl" class="avatar">
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
      action: 'index.php/' + this.$route.path + '/formUpload?field=' + this.field.field
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
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
