<script setup>
import LoginVue from './views/Login.vue';
</script>

<template>
  <!--引入 Login.vue 文件，测试效果-->
  <!--<LoginVue></LoginVue>-->
  
  <!--声明路由标签，这样就可以自动根据访问路径加载对应的 vue 页面-->
  <router-view></router-view>
</template>

<style scoped>

</style>
