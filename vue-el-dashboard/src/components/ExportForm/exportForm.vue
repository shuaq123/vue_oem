<template>
  <div>
  <el-drawer
    title="导入客户"
    size="45%"
    :visible.sync="drawer"
    :direction="direction"
  >
    <div>
      <div style="min-width:400px;padding-left: 50px;">
          <el-steps  space="80px" direction="vertical" :active="num" style="min-height:100px;">
            <el-step
             status="success"
             title="下载客户样表">
              <template #title>
                    <div style="display: inline-block;margin-right: 10px;">下载学员样表</div>
                    <el-button size="mini" type="primary" @click="DownloadList">下载样表</el-button>
              </template>
            </el-step>
            <el-step title="根据模板格式填写后，上传excel文件">
              <template #title>
                    <div style="display: inline-block;margin-right: 10px;">根据模板格式填写后，上传excel文件</div>
                    <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange">
                    <el-button size="mini" @click="handleClick">上传文件</el-button>
                    <span style="font-size: 10px;color: darkgray; ">{{fileName}}</span>
                    <div style="font-size: 10px;color: darkgray; ">文件大小在10m以内行数在1万以内，若超出限制，请分批导入</div>
              </template>
            </el-step>
            <el-step title="择所属分组标签" >
             <template #title>
               <div style="display: inline-block;margin-right: 10px;float: left;">选择所属分组标签</div>
               <div style="display: inline-block;margin-left: 80px;">
                <el-form ref="form" :model="form" :rules="rules">
                 <el-form-item label="所属管理员：" prop="selectedValue" style="width: 337px;">
                <el-select v-model="form.selectedValue" style="width: 160px;" clearable placeholder="请选择所属管理员" size="mini">
                     <el-option
                       v-for="item in options2"
                       :key="item.employeeId"
                       :label="item.employeeName"
                       :value="item.employeeId">
                     </el-option>
                 </el-select>

                 </el-form-item>
              <div style="margin-top: 10px;">
               <el-form-item label="选择分组：" prop="value1">
                <el-select v-model="form.value1" placeholder="请选择" size="mini">
                  <el-option :key="form.id" :value="form.value1" hidden/>
               <el-tree
                :data="data"
                node-key="form.id"
                accordion
                highlight-current
                @node-click="handleNodeClick"
                ></el-tree>
                </el-select>
                </el-form-item>
                </div>
                </el-form>
               </div>
            </template>
            </el-step>
            <el-step title="导入数据">
                 <template #title>
                         <div style="display: inline-block;margin-right: 10px;float: left;">导入数据</div>
                         <el-button type="primary" @click="submitForm()" size="mini">提交</el-button>
                  </template>
            </el-step>
          </el-steps>
      </div>
    </div>
   <div>
      <el-table
        :header-cell-style="{background:'#F2F2F2',color:'#555'}"
          :data="tableData"
          style="width: 95%;margin-left: 20px;">
          <el-table-column
          align="center"
          header-align="center"
            prop="impotTime"
            label="导入时间"
       >
          </el-table-column>
          <el-table-column
          align="center"
          header-align="center"
            prop="tole"
            label="导入数量"
     >
          </el-table-column>
          <el-table-column
          align="center"
          header-align="center"
            prop="succeedNum"
            label="成功数量">
          </el-table-column>
          <el-table-column
          align="center"
          header-align="center"
            prop="loseNum"
            label="失败数量">
          </el-table-column>
          <el-table-column label="操作"
          align="center"
          header-align="center">
            <template slot-scope="scope">
              <span style="color: #1890ff;cursor: pointer;" @click="exportFailureRecord(scope.row.presentId)">下载导入失败表</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </el-drawer>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        tableData:'',
        form:{
          selectedValue:'',
          value1:'',
          id:'',
        },
        data:[],
        id:'',
        num:1,
        value2:'',
        value1:'',
        options2:[],
        fileName:'',
        fileData:null,
        drawer: false,
        direction: 'rtl',
        rules: {
              selectedValue: [
                // { required: true, message: '请选择选项',type: 'number', trigger: 'change' }
                { required: true, message: '请选择选项',trigger: 'change' }
              ],   value1: [
                // { required: true, message: '请选择选项',type: 'number', trigger: 'change' }
                { required: true, message: '请选择选项',trigger: 'change' }
              ]

            },
      };
    },
    methods: {

      DownloadList(){
        this.$axios.post("/users/ExportForm",{},{responseType : "blob"}).then(res => {
                  console.log("导出表格")
                  this.num = 2;
                  console.log(res.data)
                  const blob = new Blob([res.data]);
                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                          // IE浏览器
                          window.navigator.msSaveBlob(blob,'template.xlsx');
                        } else {
                          const URL = window.URL || window.webkitURL;
                          const objectUrl = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          console.log(objectUrl)
                          link.href = objectUrl;
                          link.download = '客户导入模版.xlsx';
                          link.click();
                          URL.revokeObjectURL(objectUrl);
                        }
                }).catch(error => {
            this.$message.error(error.response.data.message);
          });

      },
      handleClick() {
            // 通过$refs来访问DOM元素
            this.$refs.fileInput.click();
          },
      handleFileChange(event) {
            const file = event.target.files[0];
            // 使用FormData对象来上传文件
            const formData = new FormData();
            formData.append('file',file);
            this.fileData = file;
            const fileName = file.name;
            this.fileName = fileName;
            this.$message.success('上传成功');
            this.num = 3;
          },
          submitForm(){
              this.$refs.form.validate(valid => {
                if(!this.fileName){
                  this.$message.error('请上传文件');
                  return;
                }
                const formData1 = new FormData();
                formData1.append('file', this.fileData); // 将文件添加到请求体中
                formData1.append('selectedValue', this.form.selectedValue); // 添加普通文本参数
                formData1.append('id', this.form.id); // 添加普通文本参数
                  if (valid) {
                      this.$axios.post('/users/upload',formData1,
                      {
                        headers: {
                         'Content-Type': 'multipart/form-data'
                        },
                        }).then(response => {
                        this.fileName = ''
                        this.num = 1
                        this.fileData = ''
                        this.form.selectedValue = ''
                        this.form.id = ''
                        this.form.value1 = ''
                        this.drawer = false
                        this.$refs.form.clearValidate();
                        console.log("导入表格刷新")
                        this.$emit('child-method-exe', '子组件方法执行完成')
                        this.$message.success('添加成功');
                      }).catch(error => {
                        console.log(error);
                        this.$message.error(error.response.data.message);
                      });
                  } else {
                    // 表单验证未通过，进行提示
                    this.$message.error('表单验证未通过');
                  }
                });
              },

          handleNodeClick (data) {
                 console.log(data)
                   this.form.id=data.id,
                   this.form.value1=data.label
                   this.num = 4
          },
          getExportFailureRecord(val){
            this.$axios.post('/users/exportFailureRecord',null,{
              responseType : "blob",
              params:{
                presentId:val
              }
            }).then(res => {
              const blob = new Blob([res.data]);
              if (typeof window.navigator.msSaveBlob !== 'undefined') {
                      // IE浏览器
                      window.navigator.msSaveBlob(blob,'template.xlsx');
              } else {
                      const URL = window.URL || window.webkitURL;
                      const objectUrl = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      console.log(objectUrl)
                      link.href = objectUrl;
                      link.download = '用户导入失败模版.xlsx';
                      link.click();
                      URL.revokeObjectURL(objectUrl);
                    }
            }).catch(error => {
              console.log(error);
              this.$message.error(error);
            });
          },
          exportFailureRecord(presentId){
            console.log(presentId)
            this.getExportFailureRecord(presentId)
          }
    }
  }
</script>
<style>

</style>
