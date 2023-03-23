<template>
  <!-- 注册模块 -->
<div class="register">
<h2>我是注册</h2>
  <button @click="register">点击注册</button>
  <br><br>
  <router-link to="/home/login">已有账号，点击注册</router-link>
</div>

</template>

<script>
import { useRouter} from 'vue-router'
export default {
name:'Register',
setup(){
    const router=useRouter()
    const register=()=>{
        router.replace('/home/login')
    }
    return {
        register
    }
}
}
</script>

<style scoped>
.register{
        background-color: greenyellow;
    }
</style>