import { defineStore } from "pinia"
import { routes } from '@/router'
const useRouteStore = defineStore("test", {
  state () {
    return {
      // 需要进行缓存的路由
      cacheRoute: [],
      // 最大缓存数量
      maxCacheNum: 3
    }
  },
  actions: {
    setCacheRoute () {
      this.cacheRoute = routes.filter(item => item.meta.keepAlive).map(item => item.meta.name)
    }
  },
  getters: {},
})

export { useRouteStore }
