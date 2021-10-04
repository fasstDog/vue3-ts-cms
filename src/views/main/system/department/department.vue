<template>
  <div class="department">
    <page-search
    :searchFromConfig="searchFromConfig"
    @resetBtnClick="handleResetBtnClick"
    @queryBtnClick="handleQueryBtnClick"
    >
    </page-search>

    <page-content
    createBtn="新建部门"
    :contentTableConfig="contentTableConfig"
    pageName="department"
    ref="pageContentRef"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
    >
    </page-content>

    <page-modal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modalConfig="modalConfigRef"
    pageName="department"
    message="部门操作"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import {useStore} from '@/store'

import PageSearch from '@/components/page-serach'
import { searchFromConfig } from './config/search.config'


import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import PageModal from '@/components/page-modal'
import {modalConfig} from './config/modal.config'




import {usePageSearch} from '@/hooks/use-page-search'
import {usePageModal} from '@/hooks/use-modal'



export default defineComponent({
  components:{
    PageSearch,
    PageContent,
    PageModal
  },
  setup () {
    const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()
    const [ pageModalRef,defaultInfo,handleNewData,handleEditData ] =usePageModal()

       // modal配置信息
    // modal配置信息
    const store = useStore()
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.fromItems?.find((item) => item.field === 'parentId')
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name , value: item.id }
        // {title:item.name,value:item.id}
      })
      return modalConfig
    })



    return {
      searchFromConfig,
      contentTableConfig,
      modalConfigRef,

      pageContentRef,
      handleResetBtnClick,
      handleQueryBtnClick,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped>

</style>
