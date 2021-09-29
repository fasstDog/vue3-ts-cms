<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent ({
  components:{
    LoginPanel
  },
  setup(){
    return{

    }
  }
})
</script>

<style scoped lang='less'>
  .login{
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    width: 100%;
    height: 100%;
    background: url('../../assets/img/login-bg.svg');
  }
</style>

