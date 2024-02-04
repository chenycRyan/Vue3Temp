<template>
  <el-select
    v-model="selectId"
    @change="changeRemote"
    filterable
    clearable
    remote
    reserve-keyword
    style="width: 100%"
    placeholder="请输入关键词查询"
    :remote-method="cenantMethod"
  >
    <el-option v-for="item in selectOptions" :key="item.id" :disabled="item.disabled" :label="item.name" :value="item.id">
      <div :style="{ color: item.color }">
        {{ item.name }}
      </div>
    </el-option>
  </el-select>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { apiFun } from '@/api/apiFun'

const selectId = ref(null)
const props = defineProps({
  url: {
    type: String
  },
  queryKey: {
    type: String
  },
  queryString: {
    type: String
  },
  modelValue: {
    type: Number
  }
})
watch(
  () => props.modelValue,
  val => {
    selectId.value = val
  },
  {
    immediate: true
  }
)
let api = apiFun(props.url)

let selectOptions = ref([])
const getTop10 = () => {
  api
    .findPage({
      size: 10,
      page: 0
    })
    .then(res => {
      res.content.forEach(item => {
        item.name = item[props.queryKey]
      })

      selectOptions.value = res.content
      selectOptions.value.push({
        id: -1,
        name: '更多数据,搜索查询',
        disabled: true,
        color: 'red'
      })
    })
}
//组织机构remote
const cenantMethod = queryString => {
  if (queryString !== '') {
    const params = {}
    params[props.queryKey] = queryString
    api.findList(params).then(res => {
      if (res && res.length) {
        res.forEach(item => {
          item.name = item[props.queryKey]
        })
        selectOptions.value = res
      } else {
        ElMessage.warning('您输入的内容不存在')
      }
    })
  } else {
    selectOptions.value = []
  }
}
watch(
  () => props.queryString,
  val => {
    if (val) cenantMethod(val)
    else getTop10()
  },
  {
    immediate: true
  }
)
const em = defineEmits(['changeRemote', 'update:modelValue'])
const changeRemote = val => {
  em('changeRemote', val)
  em('update:modelValue', val)
}
</script>
<style lang="scss" scoped></style>
