<script setup>
import { getUserListApi, getIdsApi } from '@/api/user'
const users = ref([])
const ids = ref([])
const controller = ref([])

const onChange = async () => {
  const res = await getUserListApi()
  users.value = res.data.list
}

const getIds = async () => {
  const res = await getIdsApi(controller)
  ids.value = res.data.list
}

const cancelRequest = () => {
  controller.value.forEach(item => {
    item.abort()
  })
  controller.value = []
}

</script>

<template>
  <div class="h-screen">
    <div class="flex items-center justify-center  gap-4">
      <input type="text" class="border border-s-cyan-200 outline-none focus:border-purple-400 " @input="onChange">
      <button class="border px-4 select-none" @click="getIds">获取IDS</button>
      <button class="border px-4 select-none" @click="cancelRequest">取消请求</button>
    </div>
    <div>
      <li v-for="(user, index) in users" :key="index">{{ user.name }}--{{ user.age }}</li>
      <li v-for="id in ids" :key="id.id">{{ id }}</li>
    </div>
  </div>
</template>

<style scoped lang='scss'></style>
