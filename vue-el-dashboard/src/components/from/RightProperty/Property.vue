<template>
  <div>
    <div class="from-main-right-property" v-if="getInfo === 'head'">
     <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="name" label="表头标题" label-position="10px">
        <div style="padding: 10px;">
          <el-input v-model="form.name" maxlength="10" show-word-limit placeholder="请输入内容"></el-input>
        </div>
        </el-form-item>
    <el-form-item label="描述:">
      <div style="padding: 10px;">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.textarea"
              maxlength="100" show-word-limit>
            </el-input>
          </div>
      </el-form-item>
      </el-form>
    </div>
    <div class="from-main-right-property" v-if="getInfo === 'username'">
       <el-form ref="usernameform" :model="usernameform" >
          <el-form-item  label="字段名称" label-position="10px">
          <div style="padding: 10px;">
            <el-input v-model="usernameform.fieldname" maxlength="10" show-word-limit placeholder="请输入内容">
            </el-input>
          </div>
          </el-form-item>
          <el-form-item label="字段说明:">
        <div style="padding: 10px;">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="描述"
                v-model="usernameform.textarea"
                maxlength="50" show-word-limit>
              </el-input>
            </div>
        </el-form-item>
        <el-form-item  label="输入提示语" label-position="10px">
        <div style="padding: 10px;">
          <el-input v-model="usernameform.prompt" maxlength="10" show-word-limit placeholder="请输入提示语"></el-input>
        </div>
        </el-form-item>
        <el-form-item  label="设置" label-position="10px">
        <div style="padding: 10px;">
            <div style="margin-top: 33px;">
              <el-checkbox v-model="usernameform.isRequired" >必填</el-checkbox>
            </div>
        </div>
        </el-form-item>
        </el-form>
      </div>

      <div class="from-main-right-property" v-if="getInfo === 'phone'">
         <el-form ref="phoneform" :model="phoneform" >

          <el-form-item  label="输入提示语" label-position="10px">
          <div style="padding: 10px;">
            <el-input v-model="phoneform.prompt" maxlength="10" show-word-limit placeholder="请输入手机号"></el-input>
          </div>
          </el-form-item>
          <el-form-item  label="设置" label-position="10px">
          <div style="padding: 10px;">
              <div style="margin-top: 33px;">
                <el-checkbox v-model="phoneform.isRequired" >必填</el-checkbox>
              </div>
              <div>
                <el-checkbox v-model="phoneform.isNote">
                  发送短信验证码
                  <i class="el-icon-warning" @click="show.phone = false"></i>
                </el-checkbox>
              </div>
          </div>
          </el-form-item>
          </el-form>
        </div>

        <div class="from-main-right-property" v-if="getInfo === 'certificate'">
           <el-form ref="certificateform" :model="certificateform" >
              <el-form-item  label="字段名称" label-position="10px">
              <div style="padding: 10px;">
                <el-input v-model="certificateform.fieldname" maxlength="10" show-word-limit placeholder="请输入内容">
                </el-input>
              </div>
              </el-form-item>
              <el-form-item label="字段说明:">
            <div style="padding: 10px;">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="描述"
                    v-model="certificateform.textarea"
                    maxlength="50" show-word-limit>
                  </el-input>
                </div>
            </el-form-item>
            <el-form-item  label="输入提示语" label-position="10px">
            <div style="padding: 10px;">
              <el-input v-model="certificateform.prompt" maxlength="10" show-word-limit placeholder="请输入提示语"></el-input>
            </div>
            </el-form-item>
            <el-form-item  label="设置" label-position="10px">
            <div style="padding: 10px;">
                <div style="margin-top: 33px;">
                  <el-checkbox v-model="certificateform.isRequired" >必填</el-checkbox>
                </div>
            </div>
            </el-form-item>
            </el-form>
          </div>

          <div class="from-main-right-property" v-if="getInfo === 'address'">
             <el-form ref="addressform" :model="addressform" >
              <el-form-item  label="输入提示语" label-position="10px">
              <div style="padding: 10px;">
                <el-input v-model="addressform.prompt" maxlength="10" show-word-limit placeholder="请输入内容"></el-input>
              </div>
              </el-form-item>

              <el-form-item  label="默认值" label-position="10px">
              <div style="padding: 10px;">
                <el-select v-model="addressform.default" placeholder="请选择" @change="strike">
                   <el-option
                        v-for="item in addressList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                </el-select>
              </div>
              </el-form-item>

              <el-form-item  label="设置" label-position="10px">
              <div style="padding: 10px;">
                  <div style="margin-top: 33px;">
                    <el-checkbox v-model="addressform.isRequired" >必填</el-checkbox>
                  </div>
              </div>
              </el-form-item>
              </el-form>
            </div>
  </div>

</template>

<script>
import { watch } from 'vue'
  export default {
    data() {

      return {
        addressList:[
          {
              value: '1',
              label: '省/市/区'
            },
          {
                value: '2',
                label: '省/市'
              },
          {
              value: '3',
              label: '省'
            }

        ],
        getInfo:'head',
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
        },
        form:{
          name:'',
          textarea:'',
        },
        usernameform:{
          fieldname:'',
          textarea:'',
          prompt:'',
          isRequired:false,
        },
        phoneform:{
          prompt:'',
          isRequired:false,
          isNote:false,
        },
        certificateform:{
          fieldname:'',
          textarea:'',
          prompt:'',
          isRequired:false,
        },
        addressform:{
          prompt:'',
          isRequired:false,
          isNote:false,
          default:'',
        },
      }

    },
    watch: {
      'usernameform.prompt': {
        handler(newVal) {
          if(newVal){
            this.$emit('childByValue',newVal);
          }else{
            this.$emit('childByValue','请输入提示语');
          }
        },
        immediate: true
      },
      'usernameform.fieldname'(newVal, oldVal){
        if(newVal){
          this.$emit('fieldname',newVal);
        }else{
          this.$emit('fieldname','姓名');
        }
      },
      'usernameform.textarea'(newVal, oldVal){
        if(newVal){
          this.$emit('fieldnamethree',newVal);
        }else{
          this.$emit('fieldnamethree','');
        }
      },
      'phoneform.prompt'(newVal, oldVal){
        if(newVal){
          this.$emit('phoneformPrompt',newVal);
        }else{
           this.$emit('phoneformPrompt','请输入手机号');
        }
      },
      'certificateform.fieldname'(newVal, oldVal){
        if(newVal){
          this.$emit('certificateformPrompt',newVal);
        }else{
          this.$emit('certificateformPrompt','证件');
        }
      },
      'certificateform.prompt'(newVal, oldVal){
        if(newVal){
          this.$emit('certificateprompt',newVal);
        }else{
          this.$emit('certificateprompt','请输入证件号');
        }
      },
      'certificateform.textarea'(newVal, oldVal){
        console.log(newVal)
        if(newVal){
          this.$emit('certificatetextarea',newVal);
        }else{
          this.$emit('certificatetextarea','');
        }
      },
      'form.name'(newVal, oldVal){
        if(newVal){
          this.$emit('fromname',newVal);
        }else{
          this.$emit('fromname','新的表头');
        }
      },
      'form.textarea'(newVal, oldVal){
        if(newVal){
          this.$emit('fromtextarea',newVal);
        }else{
          this.$emit('fromtextarea','这是表头的描述内容');
        }
      },
      'addressform.prompt'(newVal, oldVal){
        if(newVal){
          console.log(newVal)
          this.$emit('fromaddress',newVal);
        }else{
          this.$emit('fromaddress',"请输入内容");
        }
      },
      'addressform.default'(newVal, oldVal){
        if(newVal){
          console.log(newVal)
          this.$emit('fromdefault',newVal);
        }else{
          this.$emit('fromdefault',"请输入内容");
        }
      },


    },

    methods:{
      strike(){
        this.$emit('addressDefault',this.addressform.default);
      }
    }

  }
</script>

<style>
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
  .el-form-item{
    margin-bottom:0
  }
  .el-form-item__content{
    line-height: 23px;
  }
</style>
