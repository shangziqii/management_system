<template>
  <h2>我是登录</h2>
  <!-- <router-link to="/administrator" @click="login">点击登录</router-link> -->
  <!-- <router-link to="/teacher" @click="login">点击登录</router-link> -->
  <router-link to="/counselor" @click="login">点击登录</router-link>

  <button @click="backData">点击注册</button>
</template>

<script>
import { defineEmits } from 'vue'
export default {
    name:'Login',
    setup(){
        const login=()=>{
            
        }
        return {
            login
        }
    }
}
</script>

<style>

</style>