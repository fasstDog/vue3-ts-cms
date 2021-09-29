<template>
  <div class="role">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="role"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/contentconfig'

import pageSearch from '@/components/page-serach'
import { searchFromConfig } from './config/search.config'

export default defineComponent({
  components: { pageContent, pageSearch },
  name: 'role',
  setup() {
    return {
      contentTableConfig,
      searchFromConfig
    }
  }
})
</script>

<style scoped></style>
