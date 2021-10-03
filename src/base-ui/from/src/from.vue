<template>
  <div class="ft-from">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
        <el-row>
          <template v-for="item in fromItems" :key="item.label">
            <el-col v-bind="collLayout">
              <el-form-item v-if="!item.isHidden" :style="itemStyle"  :label="item.label" :rules="item.rules">
                <template v-if="item.type === 'input' || item.type === 'password'" >
                  <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                  />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select v-bind="item.otherOptions" style="width : 100%" :placeholder="item.placeholder" v-model="formData[`${item.field}`]" >
                    <el-option v-for="option in item.options" :key="option.title" :value="option.value">
                      {{option.title}}
                    </el-option>
                  </el-select>
                </template>
                <template v-else-if="item.type ==='datepicker'" >
                  <el-date-picker v-bind='item.otherOptions' style="width :100%"  v-model="formData[`${item.field}`]" ></el-date-picker>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,PropType,ref,watch } from 'vue'
import { IFromItem } from '../types'

export default defineComponent({
  props:{
    modelValue:{
      type:Object,
      require:true
    },
  fromItems:{
      type:Array as PropType<IFromItem[]>,
      default:()=> []
  },
  labelWidth:{
    type:String,
    default:'100px'
  },
  itemStyle:{
    type:Object,
    default:()=>({ padding:' 10px 40px '})
  },
  collLayout:{
    type:Object,
    default:()=>({
      xl:6,
      lg:8,
      md:12,
      sm:24,
      xs:24
    })
  }
  },
  emits:['update:modelValue'],
  setup (props,{emit}) {
    const formData = ref({...props.modelValue})
    // const formData = computed(()=>({...props.modelValue}))

    watch(
    formData,
    (newValue)=>{
      return emit('update:modelValue',newValue)
    },
    {
      deep:true
    } )

    // const formData = computed({
    //   get:()=>props.modelValue,
    //   set:(newValue)=>{
    //     emit('update:modelCalue',newValue)
    //   }
    // })

    return {
      formData
    }
  }
})
</script>

<style scoped lang='less'>
.ft-from {
    padding-top: 22px;
}
</style>
