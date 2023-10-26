<template>
  <div>
    <div>
      <el-button type="primary" @click="drawer = true">创建菜品</el-button>
    </div>

    <el-drawer
      title="创建菜品"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="30%">
      <div>
        <el-form :rules="rules" label-width="90px" :model="formLabelAlign">
          <el-form-item prop="vegetableName" label="菜名称:" >
            <el-input v-model="formLabelAlign.vegetableName" style="width: 300px;" placeholder="请输入菜名"></el-input>
          </el-form-item>
          <el-form-item  prop="price" label="价钱:">
            <el-input v-model="formLabelAlign.price" placeholder="请输入价格" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              style="width: 300px;"
              v-model="formLabelAlign.textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="菜品照:" prop="url">
            <el-upload
             :headers="headerObj"
              v-model="formLabelAlign.url"
              action="http://192.168.3.17:8214/dishes/upload"
              list-type="picture-card"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div style="float: right;margin-top: 155px;margin-right: 20px;">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary">提交</el-button>
        </div>

      </div>
    </el-drawer>
    <el-divider></el-divider>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headerObj:{
          Authorization:localStorage.getItem('token'),
        },
        dialogImageUrl: '',
        dialogVisible: false,
        drawer: false,
        direction: 'rtl',
        formLabelAlign: {
                  vegetableName: '',
                  textarea: '',
                  price: '',
                  url:{},
                },
        rules: {
                  vegetableName: [
                    { required: true, message: '请输入菜名称', trigger: 'blur' },
                  ],
                  price:[
                    { required: true, message: '请输入价钱', trigger: 'blur' },
                  ],
                  url:[{required: true, message: '请输入价钱', trigger: 'blur'}]
                  }


      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleRemove(file, fileList) {
              var filename = file.name
              console.log(filename)
              delete this.formLabelAlign.url[filename]
              console.log(this.formLabelAlign.url);
            },
      handlePictureCardPreview(file) {
              console.log(file)
              var filename = file.match(/[^/\\]+$/)[0]
              this.formLabelAlign.url[filename] = file
              this.dialogVisible = true;
              console.log(this.formLabelAlign.url)
            },
      cancel(){
        this.drawer=false
      }
    }
  };
</script>
<style>
</style>
