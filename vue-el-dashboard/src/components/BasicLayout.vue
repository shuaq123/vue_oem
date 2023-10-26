<template>
  <div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="员工管理" name="first" >
           <el-button size="mini" type="primary" @click="openwindow">添加员工</el-button>
           <el-drawer
              title="我是标题"
             :visible.sync="dialogVisible"
             size="50%"
             :with-header="false">
             <div style="margin:30px;">{{ title }}</div>
                <div style="width: 400px;margin: 0 auto;">
                 <el-form :rules="rules" :model="form" ref="myForm">
                   <el-form-item  prop="name" label="员工姓名" >
                     <el-input v-model="form.name" size="mini" placeholder="请输入员工姓名"></el-input>
                   </el-form-item>
                   <el-form-item size="mini" label="手机号" prop="age">
                     <el-input v-model="form.age" placeholder="请输入手机号"></el-input>
                   </el-form-item>
                   <el-form-item size="mini" label="密码" prop="password">
                     <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                   </el-form-item>
                   <el-form-item size="mini" label="选择角色" prop="selectedValue">
                    <el-select size="mini" class="form-item" v-model="form.selectedValue" placeholder="请选择角色">
                         <el-option
                           v-for="item in options"
                           :key="item.roleId"
                           :label="item.roleName"
                           :value="item.roleId"
                           >
                         </el-option>
                    </el-select>
                      </el-form-item>
                <el-form-item size="mini" label="状态">
                   <el-switch v-model="delivery"></el-switch>
                 </el-form-item>
                  <el-form-item size="mini" label="员工头像">
                  <upload @my-event="handleMyEvent" :imageUrl="parentPropA"></upload>
                </el-form-item>
                   <el-form-item size="mini">
                     <el-button type="primary" size="mini" @click="submitForm">提交</el-button>
                     <el-button @click="dialogVisible = false">取消</el-button>
                   </el-form-item>
                 </el-form>
                </div>
            </el-drawer>
                <el-input
                  type="search"
                  v-model="searchText"
                  placeholder="用户名或手机号搜索"
                  @blur="handleSearch"
                  @keyup.native.enter="handleSearch"
                  class="absolute-input"
                  size="mini"
                >

                </el-input>
            <el-table
                  :data="tableData"
                  style="width: 100%">

                  <el-table-column
                    show-overflow-tooltip=true
                    prop="employeeName"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="employeePhone"
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop="roleName"
                    label="所属角色">
                  </el-table-column>
                  <el-table-column
                    prop="stateName"
                    label="状态">
                  </el-table-column>
                  <el-table-column
                    prop="creationTime"
                    label="创建时间"
                    width="180">
                  </el-table-column>
                  <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                </el-table>
        <div class="block" v-if="num > 0 && num != ''">
           <el-pagination
             style="text-align: center;"
             :hide-on-single-page="value2"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :page-sizes="[10, 20, 40, 100]"
             :page-size=pageSize
             layout="sizes, prev, pager,next"
             :total=total>
           </el-pagination>
         </div>
        </el-tab-pane>

        <el-tab-pane label="角色管理" name="second">
          <!-- <el-button type="primary" @click="role.drawer = true">添加角色</el-button> -->
          <div class="role">
            <div class="role-left">
              <div>
                <div style="padding-top: 10px; padding-left: 10px;">
                  <span>角色</span>
                  <img src="@/config/icon/jiahao.png"  class="icon" alt="添加角色" @click="role.drawer = true" style="float: right; padding-right: 20px;">
                </div>
                <div style="padding-top: 10px;  cursor:pointer; padding-bottom: 15px;" @click="toggleDre($event)">
                  <img :src="role.img1"  class="icon" v-if="dre">
                  <img :src="role.img2"  class="icon" v-else>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span>默认角色</span>
                </div>
                <transition name="expand">
                <div :class="bgColor" v-if="dre" style="padding-left: 50px; padding-top: 10px; padding-bottom: 15px; cursor: pointer;" @click="defaultDetails(1)">
                  高级管理员
                </div>
                </transition>
              </div>
              <div>
                <div style="padding-left: 5px; padding-top: 8px; cursor:pointer;" @click="toggleProp">
                  <span>自定义角色</span>
                  <img :src="role.img1"  class="icon" style="float: right; padding-right: 10px;" v-if="role.drawer2 === false">
                  <img :src="role.img2"  class="icon" style="float: right; padding-right: 10px;" v-else>
                </div>

                <div style="display: block;">
                  <transition name="expand">
                  <ul class="ss" v-if="role.drawer2 === true" v-module="list" style="overflow: auto; height: 463px;">
                      <li @click="defaultDetails(item.roleId)" style="padding-left: 20px; padding-top: 15px; padding-bottom: 15px; cursor: pointer;" v-for="(item, index) in list" :key="index" class="sddw">
                      <span>
                        {{ item.roleName }}
                      </span>
                      <img src="@/config/icon/删除.png" alt="删除" class="icon" style="float: right; padding-right: 20px; cursor: pointer;" @click="deletingRole(item.roleId)">
                      </li>
                    </ul>
                   </transition>
                </div>
              </div>
            </div>
            <div class="role-right">
              <roleHeader
              :message="mes"
              :particulars="mes2"
              :count="mes3"
              :list="listTree"
              :idsi="idss"
              :vall="val">
              </roleHeader>
            </div>
          </div>
         <el-drawer
           title="我是标题"
           :visible.sync="role.drawer"
           :with-header="false"
           size="40%"
           >
          <div style="height: 50px; line-height: 50px; padding-left: 30px;">
            <span>添加角色</span>
          </div>
          <div style="width: 400px;margin: 0 auto;margin-top: 50px;">
            <el-form :model="role.from" label-width="80px" :rules="ruleNo">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="role.from.name" placeholder="请输入内容"  ></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input type="textarea" v-model="role.from.description" placeholder="请输入内容" :autosize="{ minRows: 5, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item label="数据权限">
                 <el-radio-group v-model="role.from.radio" >
                      <el-radio  label="0">个人</el-radio>
                      <el-radio  label="1">全部客户</el-radio>
                      <el-radio label="2">按专业</el-radio>
                  </el-radio-group>
              </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="role.drawer = false">取消</el-button>
                </el-form-item>
            </el-form>
          </div>


         </el-drawer>
        </el-tab-pane>
      </el-tabs>


  </div>
</template>

<script>
  import upload from '@/components/upload.vue'
  import inde from '@/config/index'
  import img1 from '@/config/icon/向下.png'
  import img2 from '@/config/icon/向上.png'
  import roleHeader from '@/components/roleright/roleRightHeader.vue'


export default {
  components: {
      upload,
      roleHeader
    },
  data() {
    return {
      activeName:"first",
      password:null,
      isSelected: true,
      idss:[],
      val:1,
      list:[],
      listTree:[],
      bgColor: true,
      mes:"高级管理员",
      mes2:"高级管理员拥有最高权限，默认角色不可以修改",
      mes3:0,
      dre:true,
      role:{
          drawer2:true,
          list:[],
          drawer:false,
          img1,
          img2,
          from:{
            name:'',
            administrativeAuthority:'',
            description:'',
            radio:"1"
        }
      },
      form:{
        name: '',
        age:'',
        password:'',
        selectedValue:''
      },
      searchText: '',
      parentPropA:"我是父组件的值",
      imaUrl:'',
      employeeId:'',
      title:"添加员工",
      inputWidth:'300px',
      inputHeight:'30px',
      total:0,
      pageNum: 1,
      pageSize: 10,
      num:'',
      value2: false,
      delivery:false,
      dialogVisible: false,
      name: '',
      age: '',
      tableData: [],
      state:'',
      options:[],
      selectedValue:'',
      rules: {
            name: [
              {required: true, message: '请输入用户名' }
            ],
            password: [
              {required: true, message: '密码不能为空' }
            ],
            selectedValue: [
              {required: true, message: '角色不能为空' }
            ],
            age:[
               {required: true, message: '手机号不能为空' }
            ]
          },
        ruleNo: {
              name: [
                {required: true, message: '请输入角色名称' }
              ]
            },

      pagination:{
        total:''
      }
    };
  },
  methods: {
    submitForm() {
      if(this.delivery == true){
        this.delivery = 1;
      }else{
        this.delivery =0;
      }
      if(this.title == "添加员工"){
        this.$axios.post('/employeeRoleControllerme/add',{
          employeeName:this.form.name,
          employeePhone:this.form.age,
          rolePermission:this.form.selectedValue,
          password:this.form.password,
          state:this.delivery
        }).then(response => {
          console.log(response.status);
          this.$message.success("添加成功");
          // 提交表单的操作
          // 关闭对话框
          this.dialogVisible = false;
          this.form.name = '';
          this.age = '';
          this.delivery = false;
          this.form.selectedValue = '';
          this.handleClick()

        }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      }
      if(this.title == "编辑员工"){
        console.log('-----------');
        this.$axios.post('/employeeRoleControllerme/edit',{
          employeeId:this.employeeId,
          employeeName:this.form.name,
          employeePhone:this.form.age,
          rolePermission:this.form.selectedValue,
          password:this.form.password,
          state:this.delivery
        }).then(response => {
          console.log(response.status);
          this.$message.success("编辑成功");
          // 提交表单的操作
          // 关闭对话框
          this.dialogVisible = false;
          this.handleClick()

        }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      }

    },
    handleClick() {
          this.$axios.get("/employeeRoleControllerme/get",{
            params: {
                name:this.searchText,
                pageNum: this.pageNum,
                pageSize: this.pageSize,

              }
          }).then(response => {
            this.tableData = response.data.records
            this.pageSize = response.data.size
            this.total = response.data.total
            this.num = response.data.total
            this.$forceUpdate()
          })
        },
    openwindow(){
      console.log('-----------');
      this.rules.password = [
              {required: true, message: '密码不能为空' }
            ];
      this.parentPropA = '';
      this.title = "添加员工";
      this.form.name = '';
      // // 重置表单验证状态
      this.$nextTick(() => {
          if (this.$refs.myForm) {
            this.$refs.myForm.resetFields();
          }
        });

      this.age = '';
      this.form.selectedValue = '';
      this.delivery = false;
      this.dialogVisible = true;
      console.log(this.parentPropA,this.title);
      console.log('-----------');
      this.$axios.get("/employeeRoleControllerme/getRole").then(response => {
          console.log(response.data)
          this.options = response.data
      })
    },
    handleSizeChange(val) {
            console.log("每页显示数"+val)
            this.pageSize = val;
            this.handleClick()
          },
    handleCurrentChange(val) {
        console.log(""+val)
            this.pageNum = val;
            this.handleClick()
          },
    handleEdit(index, row) {
        // // 重置表单验证状态
        this.$nextTick(() => {
            if (this.$refs.myForm) {
              this.$refs.myForm.resetFields();
            }
          });
           console.log(row.employeeId);
           this.rules.password = [];
           this.dialogVisible = true;
           this.title = "编辑员工";
           this.parentPropA = "https://img03.sogoucdn.com/app/a/100520021/96793d1c0026caf837a67b22a48eda53";
           this.$axios.get("/employeeRoleControllerme/edit/WriteBack",{
             params: {
                 id:row.employeeId
               }
           }).then(response => {
             console.log(response.data)
             this.employeeId = response.data.employeeId
             this.form.name = response.data.employeeName;
             this.form.age = response.data.employeePhone;
             this.form.password = null;
            this.$axios.get("/employeeRoleControllerme/getRole").then(response => {
                this.options = response.data
            })
            this.form.selectedValue = response.data.roleId
             if(response.data.state === 1){
               this.delivery = true
             }else{
               this.delivery = false
             }
           }).catch(error => {
        this.$message.error(error.response.data.message);
      });
         },
    handleDelete(index, row) {
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    console.log(index, row);
                    this.$axios.post('/employeeRoleControllerme/delet',null,
                    {
                      params:{
                        id:row.employeeId
                      }
                    }).then(response => {
                      console.log(response.status);
                      // 提交表单的操作
                      // 关闭对话框
                      this.dialogVisible = false;
                      this.handleClick()
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }).catch(error => {
                      this.$message.error(error.response.data.message);
                    });

                  }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
              });
            });
         },
         handleMyEvent(param1) {
               console.log(param1);
               this.imaUrl = param1
             },
      handleSearch() {
                   console.log(this.searchText)
                   this.handleClick()
                 },
        handleEnter() {
            console.log('回车键被按下')
          },
        onSubmit(){
            this.$axios.post('/employeeRoleControllerme/addRole',{
              roleName:this.role.from.name,
              roleDescription:this.role.from.description,
              administrativeAuthority:this.role.from.radio,
            }).then(response => {
              console.log(response.data);
              this.$message.success("添加成功");
              this.role.drawer = false;
              this.role.from.name = '';
              this.role.from.radio = "1";
              this.role.from.description = ''
              this.getRole();
              // 提交表单的操作
            }).catch(error => {
              this.$message.error(error.response.data.message);
            });

          },
          toggleDre(event) {
                this.dre = !this.dre; // 点击时切换dre的值
              },

        getRole(){
          this.$axios.get('/employeeRoleControllerme/getRole').then(response => {
            this.list = response.data;
            // 强制更新试图
            this.$forceUpdate();
          }).catch(error => {
            this.$message.error(error.response.data.message);
          });
        },
        toggleProp() {
              this.role.drawer2 = !this.role.drawer2;
            },
        deletingRole(roleId){
              this.$axios.post('/employeeRoleControllerme/delRole',null,{
                 params:{
                   id:roleId
                 }
              }).then(response => {
                console.log(response.data);
                this.$message.success("删除成功");
                this.getRole();
                // 强制更新试图
                this.$forceUpdate();
              }).catch(error => {
                this.$message.error(error.response.data.message);
              });

            },
            defaultDetails(val){
              this.idss = [];
              this.val =val
              this.$axios.get('/employeeRoleControllerme/getRoleDetails',{
                params:{
                  id:val
                }
              }).then(response => {
                console.log(response.data);
                this.mes =response.data.roleName;
                this.mes2 = response.data.roleDescription;
                this.mes3 = response.data.cunt;
                this.idss = response.data.ids;
                console.log(this.idss)
                // 强制更新试图
                this.$forceUpdate();
              }).catch(error => {
                this.$message.error(error.response.data.message);
              });
              this.bgColor = "bg-color";
              if(val !== 1){
                console.log(val)
                 this.bgColor = '';
              }
              this.addBing()
            },
            getMenuInfo(){
              this.$axios.get('/employeeRoleControllerme/getMenuInfo').then(response => {
                this.listTree = response.data.list
              }).catch(error => {
                this.$message.error(error.response.data.message);
              });
            },
            addBing(){
              this.$axios.post('/employeeRoleControllerme/bindingPermission',
              this.$refs.tree.getCheckedNodes()).then(response => {
                console.log(response.data);
                this.$message.success("添加成功")
                // 提交表单的操作
              }).catch(error => {
                this.$message.error(error.response.data.message);
              });
            }
  },
  mounted() {
      this.handleClick()
      this.bgColor = "bg-color";
      this.getRole()
      this.getMenuInfo()
      this.defaultDetails(1)
    },
};
</script>

<style>
  .Adds{
    display: flex;
   justify-content: center;
   align-items: center;
   height: 80%;
  }
  .absolute-input {
    position: absolute;
    right: 200px;
    width: 200px;
    /* height: 30px; */
  }
  .form-item {
    margin-top:5px;
  }
  .role{
    min-height: 486;
    min-width: 1000px;
    border: 1px solid rgba(0,0,0,.06);

  }
  .role-left{
    float: left;
    min-height: 550px;
    width: 200px;
    display:inline-block;
  }
  .icon{
    width:1em;
    height:1em;
    vertical-align:-0.15em;
    fill:currentColor;
    overflow:hidden;
    cursor:pointer;
  }
  .expand-enter-active, .expand-leave-active {
    transition: all 0.2s ease-out;
  }

  .expand-enter, .expand-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .role-right{

    width:calc(100%-300px);
    float: left;
    /* border-left:  1px solid rgba(0,0,0,.06); */
   /* background-color: honeydew; */
    display:block;
    text-align: center;

  }
  ul,li{list-style:none; padding:0; margin:0;}
  .ss li:hover {
    background-color: #eee;
  }
  .bg-color{
    background-color: #1890ff;
  }


</style>
