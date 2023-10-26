<template>
  <div>
    <div>
       <div>
         <el-button type="primary" size="mini" @click="addmenu">创建表单</el-button>
         <el-input
         style="float: right;margin-left:10px ;width: 200px;"
         v-model="search"
         placeholder="请输入表单名称/创建人"
         size="mini"
         suffix-icon="el-icon-search"
         @change = "refreshContent"
         >
         </el-input>
          <el-date-picker
                @change="selectionPeriod"
                style="float: right;margin-left:10px ;"
                size="mini"
                v-model="timeInterval"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
          </el-date-picker>
          <el-select v-model="collection" placeholder="请选择"
          :clearable="true"
          @change="handleOptionChange"
          style="float: right;width: 100px;"
          size="mini">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
            </el-select>
          <addFrom
          ref="addfrom"
          @updateList="updateList1()">
          </addFrom>
       </div>
       <el-divider></el-divider>
       <div>
          <el-table
               :row-height="20"
               :header-cell-style="{background:'#F2F2F2',color:'#555'}"
               :data="tableData"
               style="width: 100%">
               <el-table-column
                 header-align="center"
                 prop="formName"
                 label="表单名称"
                 width="130">
                 <template slot-scope="scope">
                     <div style="text-align: center">{{ scope.row.formName }}</div>
                 </template>
               </el-table-column>
               <el-table-column
                 prop="stateName"
                 label="采集数"
                 header-align="center"
                 width="160">
                 <template slot-scope="scope">
                     <div style="text-align: center">今日采集：{{ scope.row.totalCollection }}份</div>
                     <div style="text-align: center">采集总数：{{ scope.row.totalCollection }}份</div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="stateName"
                 width="130"
                 label="状态">
                 <template slot-scope="scope">
                     <div style="text-align: center">
                      <span
                      class="ant-badge-status-dot"
                      style="background: rgb(82, 196, 26);"
                      v-if="scope.row.stateName === '采集中'">
                      </span>
                      <span
                      class="ant-badge-status-dot"
                      style="background: rgb(245, 34, 45);"
                      v-else>
                      </span>
                     {{ scope.row.stateName }}
                     </div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="totalCollection"
                 label="引用位置">
                 <template slot-scope="scope">
                     <div style="text-align: center">{{ scope.row.totalCollection }}</div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="address"
                 label="最近采集时间">
                 <template slot-scope="scope" v-if="scope.row.collectionTime === null">
                     <div style="text-align: center">--</div>
                 </template>
                 <template slot-scope="scope" v-else>
                     <div style="text-align: center">{{scope.row.collectionTime}}</div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="adminName"
                 label="创建人">
                 <template slot-scope="scope">
                     <div style="text-align: center">{{ scope.row.adminName }}</div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="creationTime"
                 label="创建时间">
                 <template slot-scope="scope">
                     <div style="text-align: center">{{ scope.row.creationTime }}</div>
                 </template>
               </el-table-column>
               <el-table-column
               header-align="center"
                 prop="remark"
                 width="100"
                 label="备注">
                 <template slot-scope="scope" >
                     <div v-if="scope.row.remark.length === 0" style="text-align: center">--</div>
                     <div v-else style="text-align: center">{{scope.row.remark}}</div>
                 </template>

               </el-table-column>
               <el-table-column label="操作"
                   header-align="center"
                   width="220">
                     <template slot-scope="scope">
                       <div style="text-align: center;color:#1890ff;">
                         <span>查看采集</span> |
                         <el-popover
                             placement="bottom"
                             trigger="click"
                             >
                             <div style="cursor: pointer;">
                              <div style="padding: 10px 10px;" @click="editForm">编辑</div>
                              <div style="padding: 10px 10px;">复用</div>
                              <div style="padding: 10px 10px;">分享</div>
                             </div>
                             <span style="cursor: pointer;" slot="reference">更多</span>
                           </el-popover>
                       </div>
                     </template>
               </el-table-column>
             </el-table>
              <div style="text-align: center;">
                 <el-pagination
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-sizes="[10, 50, 100, 400]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
                 </el-pagination>
               </div>
       </div>
    </div>
  </div>
</template>

<script>
 import addFrom from '@/components/from/addFrom.vue'
 import district from '@/config/district.js'
  export default {
    components:{
      addFrom,
      district,
    },
    data () {
      return {
        search:'',
        entTime:null,
        startingTime:null,
        timeInterval:'',
        collection:'',
        options:[
          {
             value: '1',
             label: '采集中'
          },
          {
             value: '2',
             label: '停止采集'
          },
        ],
        pageSize:'10',
        currentPage:'1',
        total:0,
        tableData:[],

      }
    },
    methods: {
      addmenu () {
      this.getifn();
        this.$refs.addfrom.drawer = true
        this.$nextTick(() => {
               this.$refs.addfrom.getDistrict(); // 调用子组件方法
             });
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      getifn(){
        this.$axios.get("/getdocument/get").then(response => {
        });
      },
      getForm(){
        this.$axios.get("/from/get",{
          params:{
            currentPage:this.currentPage,
            pageSize:this.pageSize,
            collection:this.collection,
            startingTime: this.startingTime,
            entTime : this.entTime,
            search: this.search,

          }
        }).then(response => {
              this.tableData = response.data.records
              this.total = response.data.total
              console.log(this.tableData)
              }).catch(error => {
          this.$message.error(error.response.data.message);
        });
      },
      updateList1(){
        this.getForm()
        this.$forceUpdate()
      },
      handleSizeChange(val) {
              this.pageSize = val
              console.log(`每页 ${val} 条`);
              this.getForm()
            },
      handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
              this.currentPage =val
              this.getForm()
            },
      handleOptionChange(){
        this.getForm()
      },
      selectionPeriod(){
        this.startingTime = Date.parse(this.timeInterval[0])
        this.entTime = Date.parse(this.timeInterval[1])
        this.startingTime = this.formatDate(new Date(this.startingTime))
        this.entTime = this.formatDate(new Date(this.entTime))
        this.getForm()
      },
      refreshContent(){
        this.getForm()
      },
    formatDate(now) {
    var date = new Date(now);  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var y = date.getFullYear();
       var m = date.getMonth() + 1;
       m = m < 10 ? ('0' + m) : m;
       var d = date.getDate();
       d = d < 10 ? ('0' + d) : d;
       var h = date.getHours();
       h = h < 10 ? ('0' + h) : h;
       var minute = date.getMinutes();
       var second = date.getSeconds();
       minute = minute < 10 ? ('0' + minute) : minute;
       second = second < 10 ? ('0' + second) : second;
       return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
      editForm(){
        this.$refs.addfrom.drawer = true
      }

    },
    mounted() {
      this.getForm()
    }
  }
</script>

<style>
  /* el-divider 修改高度&虚线效果 */
   .el-divider--horizontal{
       margin: 8px 0;
       background: 0 0;
       border-top: 1px dashed #e8eaec;
   }
   .ant-badge-status-dot{
         display: inline-block;
         width: 6px;
         height: 6px;
         vertical-align: middle;
         border-radius: 50%;
   }
   .el-popover{
     min-width: 50px;
   }

</style>
