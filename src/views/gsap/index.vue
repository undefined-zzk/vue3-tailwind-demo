<template>
    <div class="w-full h-full p-2" ref="container">
        <div class="fx justify-center">
            <button class="border px-2 text-base" @click="tween.play()">开始动画A</button>
            <button class="border px-2 text-base" @click="tween.pause()">暂停动画A</button>
            <button class="border px-2 text-base" @click="tween.reverse()">反向动画A</button>
            <button class="border px-2 text-base" @click="tween.restart()">重新动画A</button>
            <button class="border px-2 text-base" @click="tween.progress(0.5)">执行一半A</button>
        </div>
        <div id="A" class="item mt-2 bg-red-900">A</div>
        <div id="B" class="item mt-2 bg-blue-900">B</div>
    </div>
</template>
<script setup>
import { gsap } from "gsap";

const tween = ref(null)
const container = ref(null)

const initAnimation = () => {
    tween.value = gsap.to('#A', {
        ease: "power2.inOut",
        x: () => container.value.offsetWidth - 80 - 16,
        y: gsap.utils.random(-100, 100, 5), // 随机数字
        duration: 4, // 动画总时长4s
        paused: true,
        delay: 0.5,// 延迟0.5s
    })
}

onMounted(() => {
    initAnimation()
})
</script>
<style lang="scss" scoped></style>