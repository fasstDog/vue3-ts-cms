<template>
  <div>
    <el-form label-width="60px" :rules='rules' :model="account" ref="fromRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent,reactive,ref } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'

export default defineComponent({
  setup () {
    const account = reactive({
      name:localCache.getCache('name') ?? 'coderwhy' ,
      password:localCache.getCache('password') ?? '123456'
    })
    const store = useStore()
    const fromRef = ref<InstanceType<typeof ElForm>>()


    const loginAction = (isKeepPassword:boolean)=>{
      // 登录逻辑

      // 登录验证
      fromRef.value?.validate((valid)=>{
        // valid通过正则为true
        if(valid){
          // 真正登录
          // 1.判断是否记住密码
          if(isKeepPassword){
            // 本地缓存
            localCache.setCache('name',account.name)
            localCache.setCache('password',account.password)
          }else {
            localCache.deleteCache('password')
          }
          // 2.开始登录验证
          store.dispatch('login/accountLoginAction', {...account})
        }
      })
    }


    return {
      account,
      rules,
      loginAction,
      fromRef
    }
  }
})
</script>

<style scoped>

</style>
