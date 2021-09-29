<template>
  <div>
    <div class="header">
      <slot name="header">
        <div class="title">
          {{title}}
        </div>
      </slot>
      <div class="handler">
          <slot name="header-handler"></slot>
      </div>
    </div>
    <el-table
    border
    @selection-change="handleSelectChange"
    :data="listData"
    style="width: 100%"
    v-bind="childrenProps"
    >
      <el-table-column v-if="showSelectColum"  type="selection" align="center"  width="55" />
      <el-table-column  v-if="showIndexColum" type="index" label="序号" align="center" width="80"></el-table-column>
      <template v-for="propItem in propList" :key="propItem.label">
          <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{scope.row[propItem.prop]}}
              </slot>
            </template>
          </el-table-column>
      </template>
    </el-table>
    <template v-if="showFooter">
      <div class="footer">
      <slot name="footer">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

  props:{
    listData:{
      type:Array,
      required:true
    },
    listCount:{
      type:Number,
      required:true
    },
    propList:{
      type:Array,
      required:true
    },
    showIndexColum:{
      type:Boolean,
      default:false
    },
    showSelectColum:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:''
    },
    page:{
      type:Object,
      defalut:()=>{
        return {
          currentPage:0,
          pageSize:10
        }
      }
    },
    childrenProps:{
      type:Object,
      default:()=>({})
    },
    showFooter:{
      type:Boolean,
      default:true
    }
  },
  emits:['selectionChange','update:page'],
  setup (props,{emit}) {
    const handleSelectChange = (value:any) => {
      emit('selectionChange',value)
    }

    const handleCurrentChange = (currentPage:number)=>{
      emit('update:page',{...props.page,currentPage})
    }


    const handleSizeChange = (pageSize:number)=>{
      emit('update:page',{...props.page,pageSize})
    }

    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
  .header {
    display: flex;
    height: 45px;
    padding: 0 50px;
    justify-content: space-between;
    align-items: center;

    .title{
      font-size: 20px;
      font-weight: 700;
    }

    .handler{
      margin-top: -15px;
    }
  }
  .footer {
    margin-top: 15px;
    .el-pagination{
      text-align: right;
    }
  }

</style>
