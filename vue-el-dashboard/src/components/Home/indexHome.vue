<template>
  <div id="app">

      <el-container>
      <el-header style="background-color: rgb(0, 21, 41);padding:0;">
        <div style="display: flex;font-size: 0;">
          <div style="background-color: rgb(0, 21, 41);height: 82px;width: 180px;display: inline-block;text-align: center;line-height: 82px;">
            <span style="color: aliceblue;font-size: 20px;">
              某某系统
            </span>
          </div>
          <div class="child2">
           <div style="height: 40px;width: 100%;font-size: 14px;border-bottom: 1px #f0f0f0 solid;line-height: 40px;cursor: pointer;"  >
             <el-popover
                 placement="top-start"
                 width="50"
                 trigger="hover"
                 >
                   <span slot="reference" style="float: right;margin-right: 50px;">
                     {{employ}}
                    <i class="el-icon-caret-bottom"></i>
                   </span>
                    <div style="cursor: pointer;width: 100px;">
                      <span style="padding-left: 30px;" @click="exit">退出登陆</span>
                    </div>
               </el-popover>
            </div>
            <div style="font-size: 14px;">

            </div>
          </div>
        </div>
      </el-header>
      <el-container>
       <el-aside width="181px" >
          <navmenu></navmenu>
       </el-aside>
       <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      </el-container>
  </div>
</template>
<script>

import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'


export default {
  name: 'app',
  props:{
    drawer:String,
  },
  components: {
    'navmenu': NavMenu,
    'vheader': Header,
  },
  computed: {
    visible: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit('update:drawer', value);
      },
    }
  },
  data() {
    return{
        employ:'管理员名称'
    }

  },
  methods:{
    exit(){
      localStorage.removeItem('token');
      this.$router.push('/login')
    },
    getInfo(){
        this.$axios.get("/employeeRoleControllerme/getInfo").then(response => {
                console.log(response.data.employeeInfo.employeeName)
                this.employ = response.data.employeeInfo.employeeName
              }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style>
.header {
  height: 100px;
  background-color: aquamarine;
}
body {
  font-family: PingFang SC,PingFang SC-Regular;
  font-size: 13px;
}
.child2 {
        background-color: #fff;
        height: 82px;
        width: calc(100% - 180px);
        margin: 0;
        display:inline-block;
    }
.el-aside{
  overflow: hidden;
}
</style>
