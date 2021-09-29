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
    >
    <template #status="scope">
        <el-button size="mini" plain :type="scope.row.enable? 'success':'danger'">
          {{scope.row.enable ? '启用' : '禁用'}}
        </el-button>
    </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

import { searchFromConfig } from './config/search.config'
import PageSearch from '@/components/page-serach'


import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/contentconfig'

import {usePageSearch} from '@/hooks/use-page-search'

export default defineComponent({
  components:{
    PageSearch,
    PageContent
  },
  name: 'user',
  setup() {
    const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()

    return {
      searchFromConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef
    }
  }
})
</script>

<style scoped >

</style>
