<template>
  <div class="page-modal">
  <el-dialog
  :title="message"
  v-model="dialogVisible"
  width="30%"
  center
  destroy-on-close
  >
  <ft-from v-bind="modalConfig" v-model="formData"></ft-from>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script lang="ts">
import FtFrom from '@/base-ui/from'
import { defineComponent,ref,watch } from 'vue'
import {useStore} from '@/store'

export default defineComponent({
  components:{
    FtFrom
  },
  props:{
    modalConfig:{
      type:Object,
      required:true
    },
    defaultInfo:{
      type:Object,
      default:()=> ({})
    },
    otherInfo:{
      type:Object,
      default:()=>({})
    },
    pageName:{
      type:String,
      require:true
    },
    message:{
      type:String,
      default:()=>('')
    }
  }
  ,
  setup (props) {

    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const store = useStore()

    watch(
      () => props.defaultInfo,
      (newValue)=>{
        for(const item of props.modalConfig.fromItems){
          formData.value[`${item.field}`]=newValue[`${item.field}`]
        }
      }
    )
    // 确定按钮的逻辑
    const handleConfirmClick = ()=>{
      dialogVisible.value=false
      // 利用defaultInfo判断是新建还是删除
      if(Object.keys(props.defaultInfo).length){
        // 编辑
        store.dispatch('system/editPageDataAction',{
          pageName:props.pageName,
          editData:{...formData.value,...props.otherInfo},
          id:props.defaultInfo.id
        })
      }else{
        // 新建
        store.dispatch('system/createPageDataAction',{
          pageName:props.pageName,
          newData:{...formData.value,...props.otherInfo}
        })
      }
    }


    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped>

</style>
