<template>
  <div>
   <el-drawer
     title="我是标题"
     :visible.sync="drawer"
     :with-header="false"
     size="60%">
     <div>
       <div class="from-header">
          <span class="from-header-content">表单</span>
       </div>
       <div class="from-hint">
         <span class="from-hint-content">
          <img class="from-hint-content-img" src="@/config/icon/灯泡.png" alt="">
           点击/拖动下方字段到中间表单区域
         </span>
         <span class="from-hint-content-two">
           <el-button size="mini" @click="$alert('不用点了，还没做预览')">预览</el-button>
           <el-button type="primary" size="mini" @click="submit">保存</el-button>
         </span>
       </div>
       <div class="from-main">
          <div class="from-main-left">
            <div class="from-main-left-contact-field">
              <div style="height: 50px;width: 100%;line-height: 50px;padding-left: 10px;font-size: 15px;">联系人字段</div>
              <div class="from-main-left-contact-field-content">
                <div class="from-main-left-contact-field-content-two"
                 @click="show.name = true,getFromInfo('username')">
                <img class="from-hint-content-img2" src="@/config/icon/姓名.png" alt="">
                  姓名
                </div>
                <div class="from-main-left-contact-field-content-two"
                 @click="show.phone = true,getFromInfo('phone')">
                 <img class="from-hint-content-img2" src="@/config/icon/手机数据.png" alt="">
                  手机号
                </div>
              </div>
              <div class="from-main-left-contact-field-content" >
                <div class="from-main-left-contact-field-content-two"
                 @click="show.credentials = true,getFromInfo('certificate')">
                  <img class="from-hint-content-img2" src="@/config/icon/证件.png" alt="">
                  证件号
                </div>
                <div class="from-main-left-contact-field-content-two"
                 @click="show.province = true,getFromInfo('address')">
                  <img class="from-hint-content-img2" src="@/config/icon/地址.png" alt="">
                  地址
                </div>
              </div>
            </div>

           <div class="from-main-left-contact-field">
              <div style="height: 50px;width: 100%;line-height: 50px;padding-left: 10px;font-size: 15px;">联系人字段</div>
              <div class="from-main-left-contact-field-content">
                <div class="from-main-left-contact-field-content-two" @click="addSingleLine">
                  单行文字
                </div>
                <div class="from-main-left-contact-field-content-two">
                  多行文字
                </div>
              </div>
              <div class="from-main-left-contact-field-content">
                <div class="from-main-left-contact-field-content-two">
                  单选
                </div>
                <div class="from-main-left-contact-field-content-two">
                  多选
                </div>
              </div>
            </div>
          </div>


          <div class="from-main-centre" id="id-from-main-centre">

            <div class="from-main-centre-info" style="text-align: center;cursor: pointer;" @click="getFromInfo('head')">
              <div>
                <span>{{neotou}}</span>
              </div>
              <div style="color: rgba(0, 0, 0, .45);">
                {{form.textarea1}}
              </div>
            </div>

            <div class="from-main-centre-info" v-if="show.name" @click="getFromInfo('username')">
              <div>
                <span style="color: rgba(0, 0, 0, .65);">{{fieldname2}}</span>
                <div style="color: rgba(0, 0, 0, .45);">{{fieldname3}}</div>
              </div>
              <el-input prefix-icon="el-icon-s-check" style="margin-top: 10px;" :placeholder="compellation">
                <template slot="suffix">
                  <i class="el-icon-delete" @click="show.name = false"></i>
                </template>
              </el-input>
            </div>
            <div class="from-main-centre-info" v-if="show.phone" @click="getFromInfo('phone')">
              <div>
                <span style="color: rgba(0,0,0,.65);">手机号</span>
              </div>
              <el-input prefix-icon="el-icon-mobile-phone" style="margin-top: 10px;" :placeholder="phoneform">
                <template slot="suffix">
                  <i class="el-icon-delete" @click="show.phone = false"></i>
                </template>
              </el-input>
            </div>

            <div class="from-main-centre-info" v-if="show.credentials"
             @click="getFromInfo('certificate')">
              <div>
                <span style="color: rgba(0, 0, 0, .65);">{{certificateName}}</span>
                <div style="color: rgba(0, 0, 0, .45);">{{certificatetextarea1}}</div>
              </div>
              <el-input prefix-icon="el-icon-c-scale-to-original" style="margin-top: 10px;"  :placeholder="certi">
                <template slot="suffix">
                  <i class="el-icon-delete" @click="show.credentials = false"></i>
                </template>
              </el-input>
            </div>

            <div class="from-main-centre-info" v-if="show.province" @click="getFromInfo('address')">
              <i class="el-icon-delete" @click="show.province = false" style="float: right;"></i>
              <div>
                <span style="color: rgba(0, 0, 0, .65);">地址</span>
              </div>
              <div style="margin-top: 8px;">
                <el-select v-model="province" placeholder="请选择省份" size="mini" class="selectNot" @change="screen2">
                    <el-option
                      v-for="item in provincelist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                </el-select>
                <el-select v-if="(num ==2  || num == 1) || num === ''  " v-model="city" placeholder="请选择城市" size="mini" class="selectNot" @change="screen3">
                    <el-option
                      v-for="item in citylist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-if="num == 1 || num === ''" v-model="region" placeholder="请选择区/县" size="mini" class="selectNot">
                    <el-option
                      v-for="item in regionlist"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>

                <el-input

                  style="margin-top: 8px;"
                  type="textarea"
                  :rows="5"
                  :placeholder="inputTest"
             >
                </el-input>
              </div>
            </div>


          </div>

          <div class="from-main-right">
              <el-tabs v-model="activeName">
                <el-tab-pane label="字段属性" name="first">
                  <property ref="property"
                  @childByValue="handleParamChange"
                  @fieldname="fieldname"
                  @phoneformPrompt='phoneformPrompt'
                  @certificateformPrompt = "certificateformPrompt"
                  @certificateprompt ="certificateformPrompt2"
                  @addressDefault ="addressDefault2"
                  @fromname = "fromname"
                  @fromtextarea = "fromtextarea"
                  @fromaddress = "fromaddress"
                  @fieldnamethree = 'fieldnamethree'
                  @certificatetextarea ='certificatetextarea'
                  @fromdefault = 'fromdefault'
                  >
                  </property>
                </el-tab-pane>
                <el-tab-pane label="表单属性" name="second">
                  <div class="from-main-right-property">
                    <el-form ref="forms" :model="forms" :rules="ruless">
                      <el-form-item prop="name" label="表单模版名称" label-position="10px">
                      <div style="padding: 10px;">
                        <el-input v-model="forms.name" maxlength="10" show-word-limit placeholder="请输入内容"></el-input>
                      </div>
                      </el-form-item>
                      <el-form-item label="备注:">
                        <div style="padding: 10px;">
                              <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="forms.textarea"
                                maxlength="100" show-word-limit>
                              </el-input>
                        </div>
                      </el-form-item>
                      <el-form-item label="提交成功后提示语:" prop="textarea1">
                        <div style="padding: 10px;">
                              <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="forms.textarea1"
                                maxlength="100" show-word-limit>
                              </el-input>
                        </div>
                      </el-form-item>
                      <el-form-item  label="设置" label-position="10px" prop="shezhi">
                      <div style="padding: 10px;">
                          <el-radio-group v-model="forms.radio">
                            <div style="margin-top: 30px;">
                              <el-radio label='none' >无</el-radio>
                            </div>
                            <div class="foun">
                              <el-radio label='Synchronize'>
                                同步到意向学员
                                <i class="el-icon-warning"></i>
                              </el-radio>
                            </div>
                            <div>
                              <el-radio label='loginRequired'>登陆后才可填写</el-radio>
                            </div>
                          </el-radio-group>
                      </div>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-tab-pane>
              </el-tabs>
          </div>
       </div>
     </div>
   </el-drawer>
  </div>
</template>

<script>
  import district from '@/config/district.js'
  import property from '@/components/from/RightProperty/Property.vue'

  export default {
    components:{
      district,
      property,
    },
    data() {
      return {
        certificatetextarea1:'',
        fieldname3:'',
        inputTest:'请输入内容',
        textarea:'',
        neotou:'新的表头',
        num:'1',
        certi:'请输入证件号',
        certificateName:'证件号',
        phoneform:'请输入手机号',
        fieldname2:'姓名',
        compellation:'请输入内容',
        ruless:{
          name: [
            { required: true, message: '请输入内容', trigger: 'blur' },
                    ],

            textarea1:[
            { required: true, message: '请输入内容', trigger: 'blur' },
                    ],

          shezhi:[
            { required: true, message: '请输入内容', trigger: 'blur' },
                    ],
        },
        form:{
          name:'',
          textarea1:'我是表头的描述内容',
        },
        forms:{
          name:'',
          textarea:'',
          textarea1:'',
          radio:'none',

        },
        activeName:'first',
        textarea:'',
        region:'',
        regionlist:[],
        city:'',
        citylist:[],
        province:'',
        provincelist:[],
        drawer: false,
        show:{
          name:false,
          phone:false,
          credentials:false,
          province:false
        }
      };
    },
    methods:{
      getDistrict(){
        district.forEach((item,index) =>{
            item.value = index
        });
        this.provincelist = district
      },
      screen2(){
        this. city = '';
        this.citylist = [];
        district.forEach((item,index) =>{
            if(this.province === item.value){
              item.children.forEach((item2,index2) =>{
                    item2.value = index2;
                  });
                  this.citylist = item.children;
            }
        });
      },
      screen3(){
        this.citylist.forEach((item,index) => {
          if(this.city === item.value){
            if(item.children !== undefined){
                console.log(item.children)
            }
          }
        });
      },
      getFromInfo(val){
        this.$refs.property.getInfo = val;
      },
      handleParamChange(val){

        this.compellation = val
      },
      fieldname(val){
        this.fieldname2 = val
      },
      phoneformPrompt(val){
        this.phoneform = val
      },
      certificateformPrompt(val){
        this.certificateName = val
      },
      certificateformPrompt2(val){
        this.certi = val
      },
      addressDefault2(val){
        this.num = val
      },
      fromdefault(val){

      },
      fromname(val){
        this.neotou = val
      },
      fromtextarea(val){
          this.form.textarea1 = val
      },
      fromaddress(val){
        this.inputTest = val
      },
      certificatetextarea(val){
        this.certificatetextarea1 = val
      },
      dataProcessing(){
        console.log('处理数据')
        const listAr = [];
        //处理表单属性
        if(this.$refs.property.form.name.trim() === ''){
          this.activeName = 'first'
          this.$message.error('表单标题不能为空');
          return;
        }

        if(this.forms.name.trim() === ''){
          this.activeName = 'second'
          this.$message.error('表单模版名称不能为空');
          return;
        }
        if(this.forms.textarea1.trim() === ''){
          this.activeName = 'second'
          this.$message.error('提交成功后提示语不能为空');
           return;
        }
        let json = {}
        let formAttributeJson = {
          formsName : this.forms.name,
          formsTextarea :this.forms.textarea,
          formsTextarea1 :  this.forms.textarea1,
          formsRadio : this.forms.radio
        }
        json.formAttribute = formAttributeJson
        //处理姓名数据
        let fieldProperties = {}
        if(this.show.name){
           let name = {
              fieldname : this.fieldname2,
              fieldthree: this.fieldname3,
              compellation :this.compellation,
              isRequired: this.$refs.property.usernameform.isRequired,
           }
          fieldProperties.name = name
        }
        if(this.show.phone){
           let phone = {
              phoneform : this.phoneform,
              isRequired:this.$refs.property.phoneform.isRequired,
              isNote:this.$refs.property.phoneform.isNote,
           }
          fieldProperties.phone = phone
        }
        if(this.show.credentials){
           let credentials = {
              certificateName : this.certificateName,
              certificatetextareaOne : this.certificatetextarea1,
              certi : this.certi,
              isRequired : this.$refs.property.certificateform.isRequired,
           }
          fieldProperties.credentials = credentials
        }
        if(this.show.province){
           let address = {
              prompt:this.inputTest,
              area:this.num,
              isRequired : this.$refs.property.addressform.isRequired,
           }
          fieldProperties.address = address
        }
        let Header = {
          neotou :this.neotou,
          describe:this.form.textarea1,
        }
        json.Header = Header
        json.fieldProperties = fieldProperties
        return json;
      },
      submit(){
        const result = this.dataProcessing()
        if(result){
          this.$axios.post('/from/add',result).then(response => {
            this.drawer = false
            this.$emit("updateList")
            this.$message.success("添加成功");

          }).catch(error => {
            this.$message.error(error.response.data.message);
          });
        }

      },
      fieldnamethree(val){
        this.fieldname3 = val
      },
      addSingleLine(){
        console.log('单行内容展示')
        var parent = document.getElementById("id-from-main-centre");
        var div = document.createElement("div");
        div.className="from-main-centre-info"
        div.setAttribute("id", "single")
        parent.appendChild(div)
        var single = document.getElementById("single");
        var div1 = document.createElement("div");
        var singleSpan = document.createElement("span");
        singleSpan.style.color = "rgba(0,0,0, .65)"
        singleSpan.innerText = "单行文本"
        div1.appendChild(singleSpan)
        single.appendChild(div1)

        var singleIput = document.createElement("el-input");
        singleIput.setAttribute("prefix-icon",'el-icon-s-check')
        singleIput.style.marginLeft = '10px'
        singleIput.setAttribute("placeholder",'请输入内容')
        var template1 = document.createElement("template");
        template1.setAttribute('slot','suffix')
        var i = document.createElement("i");
        i.className = 'el-icon-delete'
        template1.appendChild(i)
        singleIput.appendChild(template1)
        single.appendChild(singleIput)

        console.log(parent)

      }

    }
  };
</script>

<style>
  .from-header{
    height: 60px;
    width: 100%;
    line-height: 60px;
    border-bottom:1px #f0f0f0 solid;
    .from-header-content{
      padding-left: 20px;
      font-size: 17px;
    }
  }
  .from-hint{
    height: 40px;
    border-bottom:1px #f0f0f0 solid;
    line-height: 40px;
    width: 100%;
    .from-hint-content{
      color: black;;
      font-size: 13px;
      padding-left: 50px;
      position: relative;
      .from-hint-content-img{
        width: 20px;
        height: 20px;
        position: absolute;
        top: -1px;
        left: 26px;
      }
    }
    .from-hint-content-two{
      float: right;
      padding-right: 30px;
    }
  }
  .from-main{
    min-height: 627px;
    width: 100%;
    background-color: #f0f0f0;
    .from-main-left{
      float: left;
      width: 210px;
      min-height: 610px;
      background-color: #fff;
      margin-top: 5px;
      display: inline-block;
      .from-main-left-contact-field{
        width: 100%;
        .from-main-left-contact-field-content{
          padding: 5px;
        }
      }
    }
  }
  .from-main-left-contact-field-content-two{
    width:88px;
    height: 30px;
    border:1px #f0f0f0 solid;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  .from-hint-content-img2{
    width: 20px;
    height: 20px;
    margin-top: 7px;
    top: 10px;
    float: left;
    margin-top: 4px;
    margin-left: 9px;
  }
  .from-main-centre{
    min-height: 600px;
    width: 420px;
    background-color: #fff;
    display: inline-block;
    margin-top: 15px;
    float: left;
    margin-left: 6px;
  }
  .from-main-centre-info{
    padding: 20px;
    padding-bottom: 0;
    cursor: pointer;
  }
  .selectNot{
    width: 120px;
  }

  .from-main-right{
    margin-top: 7px;
    width: calc(100% - 643px);
    min-height: 608px;
    background-color: #fff;
    float:right;
    display: inline-block;
  }
  .from-main-right-property{
    width: 100%;
    min-height: 533px;
  }
  .el-tabs__nav{
    left: 30px;
  }
  .el-form-item__label{
    margin-left:10px
  }
</style>
