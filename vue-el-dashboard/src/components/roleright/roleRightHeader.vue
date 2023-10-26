<template>
  <div>
  <div class="roleHeader">
    <div style="text-align: left; padding-top: 15px; margin-left: 15px;">
      <span>{{ message }}</span>
      <span style="font-size: 10px; color: #1890ff; " >包含 {{count}} 人</span>
    </div>
    <div style="text-align: left; padding-top: 15px; margin-left: 15px;">
      <span style="color: rgba(0,0,0,.45);">{{particulars}}</span>
    </div>
  </div>
  <div class="wud">
    <div style="text-align: left; padding-left: 20px; height: 30px;  line-height: 30px; position: relative; border-bottom: 1px solid rgba(0,0,0,.02);">
      <img src="@/config/icon/分配功能权限.png" alt="权限" style="width: 20px; height: 20px; text-align: left; position: absolute; left: 83px; top: 5px;">
      <span>功能权限</span>
    </div>
    <el-tree node-key="id" ref="tree" :data="list" :props="props" show-checkbox ></el-tree>
  <div style="float: right;padding-top: 50px;"><el-button type="primary" size="mini" @click="getCheckedNodes">提交</el-button></div>

  </div>
 </div>
</template>

<script>
 export default {
   props: {
     message: String,
     // 通过props声明接收message属性
     particulars:String,
     count:Number,
     list: Array,
     vall:Number,
     idsi: Array,

   },
   data() {
     return {
       data: [
         {
           id: 1,
           label: '一级节点 1',
           children: [
             {
               id: 11,
               label: '二级节点 1-1'
             },
             {
               id: 12,
               label: '二级节点 1-2'
             }
           ]
         },
         {
           id: 2,
           label: '一级节点 2',
           children: [
             {
               id: 21,
               label: '二级节点 2-1'
             },
             {
               id: 22,
               label: '二级节点 2-2'
             }
           ]
         }
       ],
       props: {
         children: 'children',
         label: 'label'
       }
     }
   },
    methods: {
      getCheckedNodes() {
              console.log(this.$refs.tree.getCheckedNodes());
              this.addBing()
            },
      addBing(){

              var ss = this.$refs.tree.getCheckedNodes();
              ss.push({"vall":this.vall});
              console.log(ss)
              this.$axios.post('/employeeRoleControllerme/bindingPermission',
              ss).then(response => {
              console.log(response.data);
              this.$message.success("添加成功")
                // 提交表单的操作
              }).catch(error => {
                this.$message.error(error.response.data.message);
              });
            }
    },
    watch: {
        idsi: {
          handler(newVal, oldVal) {
            console.log("强行更新试图")
            this.$refs.tree.setCheckedKeys(this.idsi);
             this.$forceUpdate();
          },
          immediate: true // 立即执行一次handler函数
        }
      },

 }
</script>
<style>
  .roleHeader{
    /* border: 1px solid red; */
      height: 77px;
      width: 96%;
     display: inline-block;

     margin-top: 15px;
  }
  .wud{
    height: 430px;
     width: 96%;
    display: inline-block;

    margin-top: 15px;
  }
</style>
