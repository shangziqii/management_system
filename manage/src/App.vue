<template>
  <router-view></router-view>
</template>

<script>
import Home from './pages/Home'

export default {
  name: 'App',
  components: {
    Home    
  },
  setup(){
    props: {
      index:1
  }
  }
}
</script>

<style>
body{
  height:100vh;
}
</style>
