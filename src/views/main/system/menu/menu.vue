<template>
  <div class="menu">
    <page-content
    :contentTableConfig="contentTableConfig" createBtn="添加权限" pageName="menu">
    <template #icon="scope">
      <el-icon :class="scope.row.icon">
      </el-icon>
    </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import {contentTableConfig} from './config/contentconfig'

export default defineComponent({
  components: { PageContent },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
