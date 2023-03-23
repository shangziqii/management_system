<template>
    <div class="LoginForm">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="LoginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
            <el-input  v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('LoginForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Login } from './api';
  export default {
    name: 'Login',
    data() {
      const checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      const checkPass = (rule, value, callback) => {
        if(!value){
            return callback(new Error('密码不能为空'))
        }
    }
      return {
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            { validator: checkAccount, trigger: 'blur', required: true }
          ],
          password: [
            { validator: checkPass, trigger: 'blur', required: true }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
          const { account, password} = this.ruleForm;
          const params = {
              phone: account,
              password: password,
          }
          const instance =  Login(params); // axios返回promise实例
          instance.then((record) => {
              const { data, msg } = record.data;
              if(data === 0){
                    this.$message({
                    message:msg,
                    type: 'success'
                    });
                    const { token } = record.headers;//获取token
                  localStorage.setItem('token',token);//将token存储在localStorage
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
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.LoginForm{
    position: absolute;
    width: 40%;
    height: 30%;
    left: 30%;
    top: 25%;
}
</style>