<template>
<div>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <span class="name">{{name}}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item style="color:red"  icon="el-icon-switch-button" @click="handleExitClick">退出登录</el-dropdown-item>
        <el-dropdown-item divided icon="el-icon-user">用户信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-tools" >系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import { useStore } from '@/store'
import localCache from '@/utils/cache'
import {useRoute, useRouter} from 'vue-router'

export default defineComponent({
  setup () {
    const store = useStore()
    const name = computed(()=> store.state.login.userInfo.name)
    const router = useRouter()
    const handleExitClick = ()=>{
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
  .el-dropdown-link{
    display: flex;
    align-items: center;
    cursor:pointer

  }
  .name {
      padding-left: 10px;
  }

</style>
