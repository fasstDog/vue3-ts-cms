<template>
  <div class="category">
    <page-search
    :searchFromConfig="searchFromConfig"
    @resetBtnClick="handleResetBtnClick"
    @queryBtnClick="handleQueryBtnClick"
    ></page-search>
    <page-content
    createBtn="新建类别"
    :contentTableConfig="contentTableConfig"
    pageName="category"
    ref="pageContentRef"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
    ></page-content>
    <page-modal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modalConfig="modalConfig"
    pageName="category"
    message="类别操作"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content/src/page-content.vue'
import { contentTableConfig } from './config/content.config'

import PageSearch from '@/components/page-serach/src/page-search.vue'
import { searchFromConfig } from './config/search.config'

import PageModal from '@/components/page-modal'
import {modalConfig} from './config/modal.config'

import {usePageSearch} from '@/hooks/use-page-search'
import {usePageModal} from '@/hooks/use-modal'



export default defineComponent({
  components: { pageContent, PageSearch, PageModal },
  name: 'category',
  setup() {
     const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()
     const [ pageModalRef,defaultInfo,handleNewData,handleEditData ] =usePageModal()



    return {
      contentTableConfig,
      searchFromConfig,
      pageContentRef,
      handleResetBtnClick,
      handleQueryBtnClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
