<template>
  <div class="nav-header">
    <i class="fold-menu" :class="isFold ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="handLeFoldClick" ></i>
    <div class="content">
      <div>
        <ft-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import userInfo from './cpns/user-info.vue'
import ftBreadcrumb from '@/base-ui/breadcrumb'

import { pathMapBreadcrumbs } from '@/utils/map-menus'



export default defineComponent({
  components:{
    userInfo,
    ftBreadcrumb
  },
  emits:['foldChange'],


  setup (props,{emit}) {
    const isFold = ref(false)
    const handLeFoldClick =()=>{
      isFold.value = !isFold.value
      emit('foldChange',isFold.value)
    }
    // 面包屑的数据
    const store = useStore()

    const breadcrumbs =computed(()=>{
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return  pathMapBreadcrumbs(userMenus,currentPath)
    })


    return {
      isFold,
      handLeFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header{
  display: flex;
  width: 100%;

  .fold-menu{
    font-size: 30px;
    cursor: pointer;
  }
}

.content{
  display: flex;
  justify-content: space-between ;
  align-items: center;
  flex: 1;
  padding: 0 20px;
}
</style>
