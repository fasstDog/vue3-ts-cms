<template>
  <div>
    <el-form label-width="70px" :rules='rules' :model="phone">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-but">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup () {

    const phone = reactive({
      number:'',
      code:''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped>
  .get-code {
    display: flex;
  }

  .get-but{
    margin-left: 8px;
  }
</style>
