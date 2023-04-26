<template>
    <div>
        <div class="top">
          <img width="398" height="94" src="http://www.xiyou.edu.cn/newWeb/images/xy_logo.png">
        </div>
        <div class="Loginbody">
          <div class="LoginForm">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="LoginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
              <el-input  v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          </el-form>
        </div>
      </div>
        <div class="bottom"></div>
    </div>
    
</template>
<script>
import { Login } from './api';
  export default {
    name: 'Login',
    data() {
      const checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        } else {
          callback()
        }
      };
      const checkPass = (rule, value, callback) => {
        if(!value){
            return callback(new Error('密码不能为空'))
        } else {
          callback()
        }
    }
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            { validator: checkAccount, trigger: 'blur', max:30, required: true }
          ],
          password: [
            { validator: checkPass, trigger: 'blur', max:30, required: true }
          ],
        }
      };
    },
    methods: {
      //更新vuex中的权限状态
      handleLoginSuccess(permission){
        this.$store.commit('setPermission', permission)
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            // console.log('验证', valid);
            if(!valid) {
              return false
            }
          })
          const { account, password} = this.ruleForm;
          const params = {
              phone: account,
              password: password,
          }
          const instance =  Login(params); // axios返回promise实例
          instance.then((record) => {
              const { data, msg, status } = record.data;
              console.log(data);
              if(data !== -1){
                    this.$message({
                    message:msg,
                    type: 'success'
                    });
                    this.handleLoginSuccess(data);//vuex
                    const { token } = record.headers;//获取token
                  localStorage.setItem('token',token);//将token存储在localStorage
                  // 还将role的数值存放在localstorage中，便于后面增删班级操作
                  localStorage.setItem('role', data)
                  this.$router.replace({path:'/Main'})
              }
              else{
                  this.$message({
                    message:msg,
                    type: 'error'
                    });
              } 
          }).catch((err) => {
              console.log(err);
          })
          
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.$nextTick(() => {
          this.$refs.LoginForm.resetFields();
        })
      }
    }
  }
</script>

<style scoped>
.top {
  width: 100%;
  height: 130px;
  padding-top: 40px;
  background: url(	http://www.xiyou.edu.cn/newWeb/images/xy_topBG.png);
}
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 130px;
  background: url(	http://www.xiyou.edu.cn/newWeb/images/xy_topBG.png);
}
.LoginForm{
    position: absolute;
    width: 40%;
    height: 30%;
    left: 30%;
    top: 80px;
}
.Loginbody{
  position: relative;
}
</style>