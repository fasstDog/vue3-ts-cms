<template>
    <div class="page-search">
      <ft-from v-bind="searchFromConfig" v-model="formData">
        <template #header>
          <h2>高级检索</h2>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">搜索</el-button>
          </div>
        </template>
      </ft-from>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import FtFrom from '@/base-ui/from'


export default defineComponent({
   components:{
    FtFrom,

   },
  props:{
    searchFromConfig:{
      type:Object,
      required:true
    }
  },

  emits:['resetBtnClick','queryBtnClick'],
  setup (props,{emit}) {
    // 双向绑定的属性应该由配置文件的field决定
    const fromItems = props.searchFromConfig?.fromItems ?? []

    const formOriginData:any = {}
    for(const item of fromItems){
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // const formData = ref({
    //   id:'',
    //   name:'',
    //   password:'',
    //   sport:'',
    //   createTime:''
    // })

    //重置按钮
    const handleResetClick = ()=>{
      // 直接修改对象的值，from组件中formData没有被影响到
      // formData.value = formOriginData
      // 通过修改formData中的属性的值，from组件中的formData能被影响到
      for(const key in formOriginData){
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }


    // 搜索按钮
    const handleQueryClick = ()=>{
      emit('queryBtnClick',formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns{
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
