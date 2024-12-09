import Loading from '@/components/Loading/index.vue'
import { createApp } from "vue"
// 加载效果指令
export const loading = {
    mounted(el, binding) {
        const bool = binding.value
        if (bool) {
            const app = createApp(Loading)
            const instance = app.mount(document.createElement('div'))
            el._instance=instance.$el
            el.style.position='relative'
            el.appendChild(el._instance)            
        } 
    },
      updated(el, binding) {
        const bool = binding.value
        if (bool) {
            const app = createApp(Loading)
            const instance = app.mount(document.createElement('div'))
            el._instance=instance.$el
            el.style.position='relative'
            el.appendChild(el._instance)            
        } 
          if (el.contains(el._instance)) {
              el.removeChild(el._instance)
          }
    }
}