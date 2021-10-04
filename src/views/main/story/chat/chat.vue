<template>
  <div class="chat">
    <ft-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ftEditor from '@/base-ui/editor'

export default defineComponent({
  name: 'chat',
  components: {
    ftEditor
  },
  setup() {
    const htmlString = ref<string>('请在此输入……')
    return {
      htmlString
    }
  }
})
</script>

<style scoped></style>
