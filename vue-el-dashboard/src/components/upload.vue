<template>
<el-upload
  class="avatar-uploader"
  action="http://192.168.3.17:8214/employeeRoleControllerme/upload"
  :headers = "headers"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
  export default {
    props:{
      imageUrl:String,
      default:''
    },
    data() {
      return {
        imaUrl:'',
        headers: {Authorization: localStorage.getItem('token')},
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = "https://img03.sogoucdn.com/app/a/100520021/96793d1c0026caf837a67b22a48eda53"
        console.log(res)
        this.imaUrl = res
        this.handleClick()
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleClick() {
            this.$emit('my-event', this.imaUrl);
          }

    },
    mounted() {

      },
  }
</script>

<style>
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
