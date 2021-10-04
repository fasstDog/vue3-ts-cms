<template>
  <div class="category">
    <page-search
    :searchFromConfig="searchFromConfig"
    @resetBtnClick="handleResetBtnClick"
    @queryBtnClick="handleQueryBtnClick"
    ></page-search>
    <page-content
    createBtn="-"
    :contentTableConfig="contentTableConfig"
    pageName="category"
    ref="pageContentRef"
    ></page-content>
    <page-modal

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

import {usePageSearch} from '@/hooks/use-page-search'
import PageModal from '@/components/page-modal/src/page-modal.vue'


export default defineComponent({
  components: { pageContent, PageSearch, PageModal },
  name: 'category',
  setup() {
     const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()


    return {
      contentTableConfig,
      searchFromConfig,
      pageContentRef,
      handleResetBtnClick,
      handleQueryBtnClick
    }
  }
})
</script>

<style scoped></style>
