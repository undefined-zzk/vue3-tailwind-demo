<script setup>
import { useRouteStore } from '@/stores/modules/route'
import { storeToRefs } from 'pinia'
const useRoute = useRouteStore()
const { cacheRoute, maxCacheNum } = storeToRefs(useRoute)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <keep-alive :includes="cacheRoute" :max="maxCacheNum">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
