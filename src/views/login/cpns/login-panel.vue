<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-button" @click="headleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components:{
    LoginAccount,
    LoginPhone
  },
  setup () {
    const isKeepPassword =ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const currentTab = ref<string>('account')


    const headleLoginClick = ()=>{
      if(currentTab.value ==='account'){
        accountRef.value?.loginAction(isKeepPassword.value)
      }else{
        console.log('执行pone登录逻辑');
      }
    }

    return {
      isKeepPassword,
      headleLoginClick,
      accountRef,
      currentTab
    }
  }
})
</script>

<style scoped lang='less'>
 .login-panel{
   margin-top: -150px;
   width: 340px;

 }
 .title {
   text-align: center;
 }
 .account-control{
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
 }
 .login-button{
   width: 100%;
   margin-top:10px ;
 }
</style>
