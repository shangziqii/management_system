<template>

<!-- 登录模块 -->
<div class="login">
    <h2>我是登录</h2>
  <button @click="login">点击登录</button>
  <br><br>
  <router-link to="/home/register">没有账号，点击注册</router-link>
</div>

</template>

<script>
import { useRouter} from 'vue-router'
export default {
    name:'Login',
    setup(){
        const router=useRouter()
        //点击登录后的跳转函数
        const login=()=>{
            router.replace({ 
                path:'/info'
             });
        }
        return {
            login
        }
    } 
}
</script>

<style scoped>
    .login{
        background-color: pink;
    }
</style>