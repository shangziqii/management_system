<template>
  <h1>我是主页</h1>
  <router-view></router-view>
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
    name:'Home',
    components:{
      Login,
      Register
    },
    setup(){
      return {
      }
    }
}
</script>

<style>

</style>