<template>
  <div class="login">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">某某系统后台</h2>
        <form>
          <div class="form-group">
            <label for="username"><span>用户名</span></label>
            <input class="swr" type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password"><span>密码</span></label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" @click="VerificationUser">登陆</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="show" class="box">
        <SliderVerification
        ref="child"
         @getImg="getImg"
         @validImg="validImg"
         @close="onClose"
        ></SliderVerification>
    </div>
  </div>
</template>
<script>
  import SliderVerification from '@/components/login/SliderVerification.vue'

export default {
  components: {
      SliderVerification
    },
  data() {
    return {
      show: false,
      isVerified: false,
      backgroupImg:'',
      smallImageBase64:'',
      token:'',
      username: '',
      password: '',
      loginForm: {},

    };
  },
  methods: {
    onClose(){
      this.show = false
    },
  validImg(movex, id, callback) {
          // this.show= false;
          this.graphicalVerification(movex)


        },
     refresh() {
          this.$refs.sliderVerify.refresh();
        },
      graphicalVerification(movex){
        this.$axios.get('/employee/verification',{
          params: {
              user:this.username,
              movePercent:movex,
            }
        }).then((res) => {
          this.login()
        }, error => {
      
          this.$message.error(error.response.data.message)
          this.$refs.child.reset()
        });
      },
      VerificationUser(){
        if(!this.username){
          this.$message.error('请输入用户名')
          return;
        }
        if(!this.password)
        {
          this.$message.error('请输入密码')
          return;
        }

        this.show =true

      },
     getImg(callback) {
          this.$axios.get('/employee/getImageVerifyCode',{
            params: {
                user:this.username,
              }
          }).then((res) => {
            callback(res.data);
          }, error => {
            callback(error);
          });
        },

    login() {
      // 这里可以编写登录逻辑，比如向后端发送账号密码并接收返回结果
      // 在这里只是简单地打印出账号密码
      this.$axios.post('/employee/login',{
        username:this.username,
        password:this.password
      }).then(response => {
        if(response.status === 200){
          if(response.data){
            this.token == response.data
            localStorage.setItem('token', response.data);
            this.$router.push('/FormRadio')
          }
        }
        // 提交表单的操作
        // 关闭对话框
      }).catch(error => {
        this.$message.error(error.response.data.message);
        this.$refs.child.reset()
      });

    },
  },
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}
.card {
  width: 400px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 40px;
}
.card-title {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 25px;
}
label {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-block {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 盒子样式 */
}
</style>
