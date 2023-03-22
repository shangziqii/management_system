<template>
  <h1>我是主页</h1>
  <Login v-if="loginShow"/>
  <Register v-if="registerShow"/>
</template>

<script>
import {ref} from 'vue'

import Login from './Login'
import Register from './Register'
export default {
    name:'Home',
    components:{
      Login,
      Register
    },
    setup(){
/*       const getData=(val)=>{
        console.log(val)
        console.log('yes')
      } */
      let loginShow=ref(true)
      let registerShow=ref(false)
      // const changeShow=changeShow
      // console.log(changeShow)
      return {
        loginShow,
        registerShow
      }
    }
}
</script>

<style>

</style>