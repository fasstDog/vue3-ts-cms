<template>
  <div class="goods">
    <page-search
    :searchFromConfig="searchFromConfig"
    @resetBtnClick="handleResetBtnClick"
    @queryBtnClick="handleQueryBtnClick"
    />

    <page-content
    createBtn='添加商品'
    :contentTableConfig="contentTableConfig"
    pageName="goods"
    ref="pageContentRef"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
    >
      <template #image="scope">
        <el-image
        style="height:60px;"
        :src="scope.row.imgUrl"
        :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">
        <s>
          {{ '￥'+scope.row.oldPrice}}
        </s>
      </template>
      <template #newPrice="scope">{{ '￥'+scope.row.newPrice}}</template>
      <template #status="scope">
        <el-button size="mini" plain :type="scope.row.status? 'success':'danger'">
          {{scope.row.status ? '有货' : '缺货'}}
        </el-button>
      </template>
    </page-content>
    <page-modal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modalConfig="modalConfig"
    pageName="goods"
    message="商品"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'



import PageContent from '@/components/page-content'
import {contentTableConfig} from './config/content.config'

import PageSearch from '@/components/page-serach'
import { searchFromConfig } from './config/search.config'

import PageModal from '@/components/page-modal'
import {modalConfig} from './config/modal.config'

import {usePageSearch} from '@/hooks/use-page-search'
import {usePageModal} from '@/hooks/use-modal'


export default defineComponent({
  name: 'goods',
  components:{
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {

    const [pageContentRef,handleResetBtnClick,handleQueryBtnClick] = usePageSearch()
    const [ pageModalRef,defaultInfo,handleNewData,handleEditData ] =usePageModal()


    return {
      searchFromConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef,
      modalConfig,
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
