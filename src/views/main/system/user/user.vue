<template>
  <div class="user">
    <page-search
    :searchFromConfig="searchFromConfig"
    @resetBtnClick="handleResetBtnClick"
    @queryBtnClick="handleQueryBtnClick"
    />
    <page-content
    :contentTableConfig="contentTableConfig"
    pageName="users"
    ref="pageContentRef"

    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
    >
    <template #status="scope">
        <el-button size="mini" plain :type="scope.row.enable? 'success':'danger'">
          {{scope.row.enable ? '启用' : '禁用'}}
        </el-button>
    </template>
    </page-content>
    <page-modal pageName="users" :defaultInfo="defaultInfo" :modalConfig="modalConfigRef" ref="pageModalRef" ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed} from 'vue'
import  { useStore } from '@/store'


import { searchFromConfig } from './config/search.config'
import PageSearch from '@/components/page-serach'


import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/contentconfig'

import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'

import {usePageSearch} from '@/hooks/use-page-search'
import {usePageModal} from '@/hooks/use-modal'
export default defineComponent({
  components:{
    PageSearch,
    PageContent,
    PageModal
  },
  name: 'user',
  setup() {
    const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码逻辑
    const newCallback = ()=>{
      const passwordItem =  modalConfig.fromItems.find(
        (item) => item.field==='password'
        )
      passwordItem!.isHidden = false
    }
    const editCallback = ()=>{
      const passwordItem =  modalConfig.fromItems.find(
        (item) => item.field==='password'
        )
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门列表和角色列表
    const store = useStore()
    const modalConfigRef = computed(()=>{
      const departmentItem = modalConfig.fromItems.find(
        (item)=> item.field === 'departmentId'
      )

      departmentItem!.options = store.state.entireDepartment.map((item)=>{
        return {title:item.name,value:item.id}
      })

      const roleItem = modalConfig.fromItems.find(
        (item)=> item.field === 'roleId'
      )

      roleItem!.options = store.state.entireRole.map((item)=>{
        return {title:item.name,value:item.id}
      })
      return modalConfig
    })




    // ---------------
    const [ pageModalRef,defaultInfo,handleNewData,handleEditData ] =
      usePageModal(newCallback,editCallback)

    return {
      searchFromConfig,
      contentTableConfig,
      modalConfigRef,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
    }
  }
})
</script>

<style scoped >

</style>
