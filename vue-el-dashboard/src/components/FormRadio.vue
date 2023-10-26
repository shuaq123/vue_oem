<template>
  <div>
    <el-row style="min-width: 1000px;">
      <el-button type="primary" size="mini" @click.stop="addUser11">添加客户</el-button>
      <el-button size="mini" @click="exportForminfo">导入客户</el-button>
      <div style="display: inline-block; float: right;">
                <el-date-picker
                  v-model="date"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                  size="mini"
                  style="width: 170px;"
                  placeholder="请选择开始时间" >
                </el-date-picker>至<el-date-picker
                  v-model="date1"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions"
                  size="mini"
                  style="width: 170px;"
                  placeholder="请选择结束时间"
                  @change="onDateChange">
                </el-date-picker>

        <el-select v-model="value2" style="width: 120px;" clearable placeholder="所属管理员" size="mini"
        @change="handleSelectChange">
            <el-option
              v-for="item in options2"
              :key="item.employeeId"
              :label="item.employeeName"
              :value="item.employeeId">
            </el-option>
        </el-select>
        <el-input style="width: 200px;" v-model="searchnameInput" @blur="handleBlur" placeholder="请输入客户名字/昵称/手机号" size="mini"></el-input>
      </div>
      <el-divider class="ddwq"></el-divider>

    </el-row>
    <div class="main">
      <div class="role-left">
        <div style="height: 60px; line-height: 60px; border-bottom: 1px solid rgba(0,0,0,.06);">
          <span style="padding-left: 20px;">客户分组</span>
          <img src="@/config/icon/加号2.png" alt="添加分组"
           style="width: 20px; height: 20px;float: right;margin-top: 21px;margin-right: 22px;cursor: pointer;"
            @click="dialogVisible = true,GroupName = '添加分组'">
        </div>
        <div style="height: 60px;line-height: 60px;padding-left: 20px;">
          <el-input style="width: 170px;" v-model="input2" placeholder="请输入分组名称" size="mini">
             <template slot="append">
                  <el-button icon="el-icon-search" slot="append" @click="getUserGroup()"></el-button>
            </template>
          </el-input>
        </div>
        <div
        style="height: 30px;line-height: 30px; padding-left: 30px;"
        v-bind:style="{ backgroundColor: bgColor }" v-on:mouseover="bgColor='#1890ff'"
        v-on:mouseout="bgColor='white'"
        >
          <img src="@/config/icon/文件夹未共享.png" alt="" style="width: 20px; height: 20px;margin-top: 4px;float: left;">
          <span style="margin-left: 10px;cursor:pointer;" @click="quanbufenzu()">全部客户分组({{total2}})</span>
        </div>
        <div v-if="Moreno"
        style="height: 30px;line-height: 30px; padding-left: 30px;"
        v-bind:style="{ backgroundColor: bgColor2 }" v-on:mouseover="bgColor2='#1890ff'"
        v-on:mouseout="bgColor2='white'"
        @click="DefaultPacketUserInfo()">
          <img src="@/config/icon/文件夹未共享.png" alt="" style="width: 20px; height: 20px;margin-top: 4px;float: left;">
          <span style="margin-left: 10px;cursor: pointer;">默认分组({{defaultUserData}})</span>
        </div>
        <el-divider class="my-divider"></el-divider>
        <div style="width: 100%;min-height: 339px;display: inline-block;overflow-y: auto;">
          <el-tree
          :data="data"
          style="margin-left: 6px;"
          @node-click="handleNodeClick"
          class="my-tree">
           <template v-slot="{node,data}" >
             <div style="height: 50px;line-height: 50px; width: 200px;position:relative;overflow: visible;"  @click.stop="fetchGroup(data)">
              <span class="custom-tree-node" style="margin-left:5px;" >
              <img src="@/config/icon/文件夹未共享.png" alt="" style="width: 20px; height: 20px;margin-top: 16px;float: left;padding-right: 10px;">
              <span v-if="data.hasOwnProperty('count')" class="ellipsis-text">{{ node.label }} ({{data.count}})</span>
              <span v-else class="ellipsis-text">{{ node.label }}</span>
              <img
              slot="reference"
              src="@/config/icon/神略.png"
              alt=""
              style="width: 20px; height: 15px;position: absolute;right: 10px;top:17px"
              @click.stop="toggleActions(data)">
              </span>
              <div class="actions" v-if="showActions[data.id]">
                  <div class="actions-1" @click.stop="addSubgroup(data)">添加子分组</div>
                   <div class="actions-1" @click.stop="handleEditGroup(data)">编辑</div>
                   <div class="actions-1" @click.stop="delectdialog(data.id)">删除</div>
              </div>
              </div>
            </template>
          </el-tree>
        </div>
        </div>
      <el-dialog
        :title="GroupName"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>分组名称：<el-input v-model="gourpName" placeholder="" style="width: 300px;" size="mini"
        :maxlength="maxLength"
        show-word-limit>
        </el-input></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserGroup()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="是否删除分组"
        :visible.sync="dialog"
        width="30%"
       >
        <span>删除之后无法复原</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="delectdialog()">确 定</el-button>
        </span>
      </el-dialog>
      <div class="role-right">
        <div class="multiple-selection" v-if="multipleSelection.length>0">
          <span style="float: left;margin-top: 15px;margin-left: 30px;"><img style="width: 15px;height: 15px;position: absolute;left: 10px;" src="@/config/icon/28感叹号-圆框.png" alt="">已选择 {{multipleSelection.length}} 项</span>
          <span style="float: right;margin-top: 15px;margin-right: 50px;cursor: pointer;color:#1890ff;" @click="deleteBatches()">批量删除</span>
                    <span style="float: right;margin-top: 15px;margin-right: 20px;cursor: pointer;color:#1890ff;" @click="deriveUserList()">批量导出</span>
        </div>
        <div class="right-table">
        <el-table
            :header-cell-style="{background:'#F2F2F2',color:'#555'}"
            :row-height="20"
              :data="tableData"
              @selection-change="handleSelectionChange"
              >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
              <el-table-column
                prop="userName"
                label="用户名"
                header-align="center">
              <template slot-scope="scope">
                  <div style="text-align: center">{{ scope.row.userName }}</div>
              </template>
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="昵称"
                header-align="center">
                <template slot-scope="scope">
                    <div style="text-align: center">{{ scope.row.nickName }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                header-align="center"
                 >
                 <template slot-scope="scope">
                     <div style="text-align: center">{{ scope.row.phone }}</div>
                 </template>
              </el-table-column>
              <el-table-column
                prop="groupName"
                label="分组"
                header-align="center">
                <template slot-scope="scope">
                    <div style="text-align: center">{{ scope.row.groupName }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="isAuthentication"
                label="实名状态"
                header-align="center">
                <template slot-scope="scope">
                    <div style="text-align: center">
                    <el-switch
                      v-if="scope.row.isAuthentication === 1"
                      :value="true">
                    </el-switch>
                    <el-switch
                      v-else
                      :value="false">
                    </el-switch>
                    </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="employeeName"
                label="所属管理员"

                header-align="center">
                <template slot-scope="scope">
                    <div style="text-align: center">{{ scope.row.employeeName }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"

                header-align="center">
                <template slot-scope="scope">
                    <div style="text-align: center">{{ scope.row.createTime }}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作"
              width="200px">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            </div>
            <el-pagination
              style="margin-top: 20px;"
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange">
            </el-pagination>
      </div>
    </div>
  <addUser ref="chuli" :Name="Name" :drawer.sync="drawer3" :data="data2" @child-method-executed = "handleChildMethodExecuted()"></addUser>
  <exportForm ref="exportform" @child-method-exe = "handleChildMethodExecuted()"></exportForm>

  </div>
</template>


<script>
  import addUser from '@/components/from/addUser.vue'
  import exportForm from '@/components/ExportForm/exportForm.vue'
  import img1 from '@/config/icon/28感叹号-圆框.png'


  export default {
    components:{
      addUser,
      exportForm,
    },
    data() {
      return {
        param:'',
        componentName:'indexHome',
        headerRowStyle: {
                background: '#888888' // 设置表头的背景颜色
              },
        multipleSelection:[],
        startTime:null,
        endTime:null,
        Moreno:false,
        gourpido:'',
        GroupName:"添加分组",
        showActions: {},
        isar:true,
        Name:"新增客户",
        rowHeight:100,
        date: '',
        date1: '',
        pickerOptions: {
                placeholder: '请选择开始时间'
              },
        dateTime:'',
        total2:0,
        searchnameInput:null,
        tableData:[],
        wdith:"110px",
        drawer3:false,
        groupID:0,
        dialog:false,
        visible: false,
        input2:'',
        defaultUserData:0,
        total:0,
        parentId:0,
        groupLeve:1,
        gourpName:'',
        maxLength:20,
         dialogVisible: false,
        bgColor: 'white',
        bgColor2: 'white',
        options: [{
          value: '选项1',
          label: '已开课学员'
        }, {
          value: '选项2',
          label: '未开课学员'
        }],
        value: '',
        options2: [],
        value2: '',
       data: [],
       data2:[]
      }
    },
    methods:{
      addUserGroup(data){
        if(this.GroupName == "编辑分组"){
         this.$axios.post('/users/eidt/userGroup',{
          groupId:this.gourpido,
          groupName:this.gourpName,
        }).then(response => {
          this.$message.success("编辑成功");
          this.dialogVisible = false;
          this.gourpName = '';
          this.getUserGroup()
        }).catch(error => {
          this.$message.error(error.response.data.message);
        });
        }
        else{
          this.$axios.post('/users/add/userGroup',{
          groupName:this.gourpName,
          groupLeve:this.groupLeve,
          parentId:this.parentId,
        }).then(response => {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          this.gourpName = '';
          this.getUserGroup()
        }).catch(error => {
          this.$message.error(error.response.data.message);
        });
        }
      },
      getUserGroup(val){
        this.$axios.get("/users/get/userGroup",{
          params: {
              name:this.input2,
            }
        }).then(response => {
                  if(val !== 1){
                    response.data.list.forEach((item,index) => {
                           if(item.groupLeve === 0){
                             this.Moreno = true
                             response.data.list.splice(index,1)
                             this.data = response.data.list;
                             console.log(this.data)
                             this.$forceUpdate()
                           }
                    });
                  }else{
                    response.data.list.forEach((item,index) => {
                        if (item.groupLeve === 0) {
                          response.data.list.splice(index, 1);
                          response.data.list.unshift(item);
                        }
                    })
                  }

                  this.data2 = response.data.list;
                  this.total2 = response.data.total2;
                  this.defaultUserData = response.data.defaultUserData;
                  this.options2 = response.data.EmployeeList;
                  this.$refs.exportform.options2 = this.options2;
                  this.$refs.exportform.data = this.data2;
              }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      },
      handleNodeClick(data, node){
        const id = node.data.id; // 获取当前节点的id
        this.groupID = id;
        this.total = data.count
        console.log(this.total)
        this.getUserInfo()
      },
      delectdialog(id){
        console.log("response.data")
        this.$axios.delete('/users/delet/userGroup/'+id).then(response => {
          console.log(response.data);
          this.$message.success("删除成功");
          this.dialogVisible = false;
          this.gourpName = '';
          this.dialog = false;
          this.showActions = {};
          this.getUserGroup()
          this.$forceUpdate();
        }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      },
      addUser11(){
      let data = {
        phone:null,
        userName:'',
        nickName:'',
        sex:1,
        card:'',
        groupId:'',
        groupName:'',
        remarks:'',
        userId:'',
        isAuthentication:1
      }
      this.drawer3 = true;
      this.Name = "新增客户"
      this.$refs.chuli.updateData(data)
      this.getUserGroup(1);
      },
      getUserInfo(val,timestamp,timestamp1){
        let val1 = val
        if(val === undefined){
          val1 = 1;
        }
        this.$axios.get("/users/get",{
          params:{
            pageName:val1,
            size:10,
            condition:this.searchnameInput,
            groupId:this.groupID,
            adminId:this.value2,
            startTime:this.startTime,
            endTime:this.endTime
          }

        }).then(response => {
                  this.tableData = response.data.records;
                  this.total = response.data.total;
              }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      },
      handleBlur() {
            this.getUserInfo()
          },
      handleChildMethodExecuted(result) {
            this.drawer3 = false
            this.getUserInfo()
            this.getUserGroup()
            this.$forceUpdate()
          },
      handleCurrentChange(val) {
              this.getUserInfo(val)
            },
        quanbufenzu(){
          this.groupID = 0;
          console.log(this.groupId)
          this.getUserInfo()
        },
        handleSelectChange(value) {
            // 执行其他逻辑
            this.getUserInfo()
          },
      onDateChange(){
        if(this.date !== null && this.date1 !== null){
          let timestamp = Date.parse(this.date);
          let timestamp1 = Date.parse(this.date1);
          this.startTime = this.date
          this.endTime = this.date1
          this.getUserInfo(0,this.date,this.date1)

        }
      },
      handleDelete(index, data){
        console.log(index)
          console.log(data)
          this.$msgbox.confirm('确认删除该条数据吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 用户点击了确定按钮
            // 执行删除操作
            this.$axios.delete("/users/del",{
              params:{
               id:data.userId
              }

            }).then(response => {
                      this.$message.success("删除成功")
                      this.getUserInfo()
                  }).catch(error => {
              this.$message.error(error.response.data.message);
            });
          }).catch(() => {
            // 用户点击了取消按钮
            // 不执行任何操作
          })
      },

      handleEdit(index, data){
        this.drawer3 = true
        this.Name = "编辑客户"
        this.getUserGroup(1)
        this.$axios.get("/users/getUserInfo",{
            params:{
             id:data.userId
            }
          }).then(response => {
                  console.log("获取个人信息")
                  console.log(response.data)
                  this.$refs.chuli.updateData(response.data)
                }).catch(error => {
            this.$message.error(error.response.data.message);
          });
      },
    toggleActions(node) {
        console.log(node)
        this.showActions = {};
        this.$set(this.showActions,node.id, !this.showActions[node.id]);
        console.log(this.showActions)
      },
      handleEditGroup(data){

        this.showActions = {}
        this.dialogVisible = true
        this.GroupName = "编辑分组"
        this.gourpido = data.id
        this.gourpName = data.label
      },
      addSubgroup(data){
          console.log(data)
          this.showActions = {}
          this.dialogVisible = true
          this.GroupName = "添加子分组"
          this.parentId = data.id
          this.groupLeve = this.groupLeve+1
      },
      handleGlobalClick(){
        this.showActions = {}
      },
      getImportRecord(){
        this.$axios.get("/users/getUserImportRecord").then(response => {
                console.log(response.data.records)
                this.$refs.exportform.tableData = response.data.records
              }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      },
      exportForminfo(){
        this.$refs.exportform.num = 1
        this.$refs.exportform.drawer = true
        this.getImportRecord()
      },
      handleSelectionChange(val){
        console.log(val)
        this.multipleSelection = val
      },
      fetchGroup(data){
        console.log(data)
        this.groupID = data.id
        this.getUserInfo()
      },
      DefaultPacketUserInfo(){
        this.groupID = 1
        this.getUserInfo()
      },
      deletDelUserList(val){
        this.$axios.delete("/users/delUserList",{
            params:{
             ids:val
            }
          }).then(response => {
                  this.$message.success("删除成功")
                  this.getUserInfo()
                  this.getUserGroup()
                }).catch(error => {
            this.$message.error(error.response.data.message);
          });
      },
      deriveUser(val){
        this.$axios.post("/users/deriveUserList",null,{responseType : "blob",
          params:{
             ids:val
          }
          }).then(res => {
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
                          link.download = '用户模版.xlsx';
                          link.click();
                          URL.revokeObjectURL(objectUrl);
                        }
                }).catch(error => {
            this.$message.error(error.response.data.message);
          });
      },
      deleteBatches(){
        console.log(this.multipleSelection)
        var strArray = '';
        this.multipleSelection.forEach((info,index) => {
          strArray += info.userId+","
        })
        console.log(strArray.slice(0, strArray.length - 1))
        if(strArray !== ''){
          this.deletDelUserList(strArray.slice(0, strArray.length - 1))
        }
      },
      deriveUserList(){
        console.log(this.multipleSelection)
        var strArray = '';
        this.multipleSelection.forEach((info,index) => {
          strArray += info.userId+","
        })
        this.deriveUser(strArray.slice(0, strArray.length - 1))
      },
    },
    mounted() {
      this.getUserGroup()
      this.getUserInfo()
      document.addEventListener('click',this.handleGlobalClick);
    }
  }
</script>

<style>
  .main{
    height: 550px;
    min-width: 1000px;
    /* border: 1px solid rgba(0,0,0,.06); */

  }

  .role-left{
    min-height: 550px;
    border: 1px solid rgba(0,0,0,.06);
    width: 220px;
    display:inline-block;
    float: left;
  }
  .role-right{
    margin-left: 20px;
    height: auto;
    width: calc(96% - 200px);
    float: left;
    /* border:  1px solid rgba(0,0,0,.06); */
   /* background-color: honeydew; */
    display:block;
    text-align: center;

  }
  .el-tree-node__content {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .el-tree-node__content i {
    vertical-align: middle;
    margin-right: 5px;
  }
  .my-divider {
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .ellipsis-text {
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ddwq{
    margin-top: 10px;
    margin-bottom: 10px;
    border-style: inherit;
    border-style: initial;
    border-style: unset;
  }
  .actions{
    display: inline-block;
    float: right;
    width: 110px;
    background-color: floralwhite;
    border:  2px solid rgba(0,0,0,.06);
    position: absolute;
    border-radius:10px;
    right: 33px;
    top: 19px;
    z-index: 999;
  }
  .actions-1{
    margin-left: 15px;

  }
  .multiple-selection{
      animation: fadeInDown 0.3s ease forwards;
      opacity: 0;
      transform: translateY(-20px);
    position:relative;
    display: inline-block;
    height: 46px;
    min-width: 100%;
    border: 1px solid #91d5ff;
    background-color: #d6f2ff;
    border-radius:10px;
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
     }
    }
/*  .right-table{
      width: calc(96% - 200px);
  } */

</style>
