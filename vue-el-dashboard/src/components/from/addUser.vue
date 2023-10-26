<template>
  <el-drawer
    title="我是标题"
    :visible.sync="visible"
    :with-header="false"
   size="50%">
   <div style="height: 50px;line-height: 50px;">
     <span style="padding-left: 30px;">{{Name}}</span>
   </div>
  <el-divider class="ssdw"></el-divider>
    <el-tabs v-model="activeName" type="card" style="padding-left: 10px;" class="custom-tabs">
      <el-tab-pane label="基本信息" name="first" >
      <div>
      <el-form ref="form" :model="form" label-width="130px" class="form-min" >
       <el-form-item label="用户名: " size="mini" class="form-min-a">
         <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
       </el-form-item>
       <el-form-item label="手机号: " size="mini" class="form-min-a">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
       </el-form-item>
      <el-form-item label="密码: " size="mini" class="form-min-a">
       <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="昵称: " size="mini" class="form-min-a">
       <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
       <el-form-item label="性别: " class="form-min-a">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
       <el-form-item label="身份证号:" size="mini" class="form-min-a">
        <el-input v-model="form.card" placeholder="请输入身份证"></el-input>
       </el-form-item>
      <el-form-item label="是否开启实名认证:" size="mini" class="form-min-a">
        <el-switch
          v-model="form.value">
        </el-switch>
       </el-form-item>
       <el-form-item label="客户分组:" size="mini" class="form-min-a">
         <el-select v-model="form.value1" placeholder="请选择">
           <el-option :key="form.id" :value="form.value1" hidden/>
           <el-tree
            :data="data"
            node-key="form.id"
            accordion
            highlight-current
            @node-click="handleNodeClick"></el-tree>
         </el-select>
        </el-form-item>
        <el-form-item label="备注:" size="mini" class="form-min-a">
         <el-input
           type="textarea"
           :rows="7"
           placeholder="请输入内容"
           v-model="form.remark">
         </el-input>
        </el-form-item>
        <el-button type="primary" style="float: right;margin-right: 10px;padding-bottom: 10px;" @click="addUserTo()">确认</el-button>
     </el-form>
    </div>
    </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>
<script>
  export default {
    props:{
      data:Array,
      drawer:{
        type: Boolean,
        default: false
      },
      Name:{
        type:String,
        default:"新增客户"
      },

    },
    data() {
      return{
        activeName:"first",
        form: {
                  name: '',
                  phone:null,
                  password: '',
                  nickname: '',
                  card: '',
                  radio: 1,
                  id:'',
                  value:true,
                  value1:'',
                  remark: '',
                  userId:''
                },
      }
    },
    computed: {
      visible: {
        get() {
          return this.drawer;
        },
        set(value) {
          console.log(value)
          this.$emit('update:drawer', value);
        },
      }
    },
    methods:{
      handleNodeClick (data) {
            console.log(data)
              this.form.id=data.id,
              this.form.value1=data.label
     },
     getUserInfo(){
       this.$axios.get("/users/get",{
         params:{
           pageName:1,
           size:10,
           condition:this.searchnameInput
         }
       }).then(response => {
                 console.log(response.data.records)
                 this.tableData = response.data.records;
             }).catch(error => {
         this.$message.error(error.response.data.message);
       });
     },
     eidtUser(){
       if(this.form.value === true){
         this.form.value = 1;
       }else{
         this.form.value = 0;
       }
       this.$axios.post("users/eidt/user",{
            userId:this.form.userId,
            userName:this.form.name,
            phone:this.form.phone,
            nickName:this.form.nickname,
            remarks:this.form.remarks,
            groupId:this.form.id,
            card:this.form.card,
            isAuthentication:this.form.value,
            sex:this.form.radio
         }).then(response => {
                this.$emit('child-method-executed', '子组件方法执行完成')
               }).catch(error => {
           this.$message.error(error.response.data.message);
         });
     },
     addUserTo(){
       console.log(this.Name)
       if(this.Name === "编辑客户"){
         this.eidtUser()
       }else{
         if(this.form.value === true){
           this.form.value = 1;
         }else{
           this.form.value = 0;
         }
          this.$axios.post('/users/add/user',{
            userName:this.form.name,
            password:this.form.password,
            groupId:this.form.id,
            sex:this.form.radio,
            phone:this.form.phone,
            nickName:this.form.nickname,
            card:this.form.card,
            isAuthentication:this.form.value,
            remarks:this.form.remark,
          }).then(response => {
           this.$emit('update:drawer', false)
           this.$message.success("添加成功");
           this.form.name = '',
           this.form.password = '',
           this.form.id = '',
           this.form.phone = '',
           this.form.nickname = '',
           this.form.card = '',
           this.form.value = false,
           this.form.remarks = '',
           this.form.value1 = '',
           console.log("触发自定义事件"),
           this.$emit('child-method-executed', '子组件方法执行完成')
          }).catch(error => {
            this.$message.error(error.response.data.message);
          });
       }
      },

      updateData(data) {
          console.log(data.userName)
          this.form.phone = data.phone;
           this.form.name = data.userName;
            this.form.nickname = data.nickName;
             this.form.radio = data.sex;
            this.form.card = data.card;
            if(data.isAuthentication === 1){
              this.form.value = true;
            }else{
              this.form.value = false;
            }
            this.form.id = data.groupId;
            this.form.value1 = data.groupName;
            this.form.remarks = data.remarks;
            this.form.userId = data.userId
        },
    },
  }
</script>

<style>
  .form-min{
    margin-top: 10px;
  }
  .form-min-a{
    width: 500px;
    padding-left: 60px;
  }
  .ssdw{
    padding: 0;
    margin-top: 0px;
    margin-bottom: 20px;
  }
.custom-tabs .el-tabs__header {
  font-size: 10px;
  /* height: 50px; */
}
.custom-tabs .el-tabs__item {
  padding: 0 20px;
}
</style>

