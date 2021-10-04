<template>
  <div class="role">
    <page-content

     :contentTableConfig="contentTableConfig"
     pageName="role"
     @newBtnClick="handleNewData"
     @editBtnClick="handleEditData"
     :otherInfo="otherInfo"
     createBtn="新建角色"
     ></page-content>
    <page-modal ref="pageModalRef" message="角色操作" :defaultInfo="defaultInfo" :modalConfig="modalConfig" pageName="role">
      <div class="menu-tree">
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children:'children',label:'name' }"
        @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,ref,nextTick } from 'vue'
import { useStore } from '@/store'
import {meunMapLeafKeys} from '@/utils/map-menus'

import {ElTree} from 'element-plus'

import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/contentconfig'



import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-modal'


export default defineComponent({
  components: { pageContent,PageModal },
  name: 'role',
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item:any) => {
      const leafKeys = meunMapLeafKeys(item.menuList)
      nextTick(()=>{
        elTreeRef.value?.setCheckedKeys(leafKeys,false)
      })
    }


    const [ pageModalRef,defaultInfo,handleNewData,handleEditData ] =
    usePageModal(undefined,editCallBack)

    const store = useStore()
    const menus= computed(()=>{
      return store.state.entireMeun
    })
    const otherInfo = ref({})

    const handleCheckChange= (data1:any,data2:any)=>{
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys,...halfCheckedKeys]
      otherInfo.value={ menuList }
    }

    return {
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang='less'>
.menu-tree {
  margin-left: 30px;
}
</style>
