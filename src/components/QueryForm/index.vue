<template>
  <div>
    <el-form :inline="true" :model="queryForm" label-width="90px">
      <el-form-item class="query-form-item" v-for="item in column" :label="item.label" :key="item.prop">
        <el-input v-if="item.type === 'text'" placeholder="请输入" v-model="queryForm[item.prop]" clearable />
        <el-cascader
          class="form-cascader"
          v-else-if="item.type == 'cascader'"
          ref="cascaderRef"
          v-model="queryForm[item.prop]"
          :options="item.options"
          :props="{ checkStrictly: true }"
          placeholder="请选择"
          clearable
        />
        <el-select
          class="form-select"
          v-else-if="(item.type as string) == 'select'"
          v-model="queryForm[item.prop]"
          placeholder="请选择"
          clearable
        >
          <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="btn.search" @click="search">查询</el-button>
        <el-button @click="add" v-if="btn.add">添加</el-button>
        <el-button @click="exportFile" v-if="btn.export">导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { IColumn } from '@/utils/type'
interface Ibtn {
  search: boolean
  add: boolean
  export?: boolean
}
const props = withDefaults(
  defineProps<{
    column: IColumn[]
    form: any
    btn?: Ibtn
  }>(),
  { btn: () => ({ search: true, add: true, export: false }) }
)
const emits = defineEmits(['search', 'add', 'export'])
const queryForm = ref()
watch(
  () => props.form,
  () => {
    queryForm.value = { ...props.form }
  },
  {
    deep: true,
    immediate: true
  }
)
const search = () => {
  emits('search', queryForm.value)
}
const add = () => {
  emits('add')
}
const exportFile = () => {
  emits('export')
}
</script>
<style lang="scss" scoped></style>
