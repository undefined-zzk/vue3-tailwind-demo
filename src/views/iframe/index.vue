<script setup>
import { ref, onMounted, watch } from 'vue'

const myIframe = ref(null)
const maskStyle = ref({})
const testOffset = { left: 500, top: 500 }
// 更新 mask 的位置
const updateMaskPosition = () => {
  const iframe = myIframe.value
  const rect = iframe.getBoundingClientRect()
  maskStyle.value = {
    position: 'absolute',
    left: rect.left + testOffset.left + 'px',
    top: rect.top + testOffset.top + 'px',
    width: '100px',  // 根据 .test 的宽度调整
    height: '100px', // 根据 .test 的高度调整
    background: 'rgba(255, 0, 0, 0.5)', // 示例背景色
    pointerEvents: 'none' // 确保 mask 不阻止鼠标事件
  }
}

// 在组件挂载后更新 mask 位置
onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', updateMaskPosition)
})

// 清理事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMaskPosition)
})
</script>

<template>
  <div class="w-screen h-screen">
    <iframe ref="myIframe" class="w-full h-full" src="http://localhost:5174/" frameborder="0"></iframe>
    <div class="mask" :style="maskStyle"></div>
  </div>
</template>

<style scoped lang='scss'></style>