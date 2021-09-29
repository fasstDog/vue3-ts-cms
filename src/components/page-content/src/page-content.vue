<template>
  <div class="page-content">
    <ft-table
    :listData="dataList"
    :listCount="dataCount"
    v-bind="contentTableConfig"
    v-model:page="pageInfo"
    >


      <template #createAt="scope">
        <span>{{$filters.formatTime(scope.row.createAt)}}</span>
      </template>
      <template #updateAt="scope">
        <span>{{$filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text" v-if="isUpdate">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text" v-if="isDelete" @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>

      <template
      v-for="item in otherPropSlots"
      :key="item.prop"
      #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- <template #header>
        <h2>hhh</h2>
      </template>
      <template #footer>
        <h2>hhh</h2>
      </template> -->
      <template #header-handler v-if="isCreate">
        <el-button type="primary" size="medium">{{createBtn}}</el-button>
      </template>


    </ft-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,ref, watch  } from 'vue'
import { useStore } from '@/store'
import FtTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  components:{
    FtTable
  },
  props:{
    contentTableConfig:{
      type:Object,
      required:true
    },
    pageName:{
      type:String,
      required:true
    },
    createBtn:{
      type:String,
      default:'新建用户'
    }
  },
  setup (props) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName,'create')
    const isUpdate = usePermission(props.pageName,'update')
    const isDelete = usePermission(props.pageName,'delete')
    const isQuery = usePermission(props.pageName,'query')


    // 双向绑定pageInfo
    const pageInfo = ref({
      currentPage:1,
      pageSize:10
    })
    watch(pageInfo,()=>{
      getPageData()
    },{
      deep:true
    })

    // 发送网络请求
    const getPageData = (queryInfo:any = {})=>{
      if(!isQuery) return
      store.dispatch('system/getPageListAction',{
      pageName:props.pageName,

      queryInfo:{
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size:pageInfo.value.pageSize,
        ...queryInfo
      }
    })
    }

    getPageData()

    // 从vx中获取数据
    const dataList = computed(()=>store.getters[`system/pageListData`](props.pageName))
    const dataCount = computed(()=>store.getters[`system/pageListCount`](props.pageName))


    // 获取动态插槽名称（排除公共的）
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item:any)=>{
        if(item.slotName ==='createAt') return false
        if(item.slotName ==='updateAt') return false
        if(item.slotName ==='handler') return false
        return true
      }
    )

    // 监听删除按钮
    const handleDeleteClick=(item:any)=>{
      console.log(item);
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isDelete,
      isUpdate,
      isCreate,
      handleDeleteClick
    }
  }
})
</script>

<style scoped>
.page-content{
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>

