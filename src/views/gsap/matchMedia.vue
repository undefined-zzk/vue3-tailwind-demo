<template>
    <div class="h-full p-5 fx gap-5 bg-purple-700 select-none *:text-white">
        <div ref="testRef" class="test w-fit px-5 h-10 bg-blue-600 rounded-md leading-10 text-center">test{{ screenWidth
            }}</div>
        <button ref="btnRef" class="border p-2 rounded-md">button</button>
        <input ref="checkboxRef" type="checkbox" value="false">change refresh
    </div>
</template>
<script setup>
import { gsap } from "gsap-trial"
import { ScrollTrigger } from "gsap-trial/ScrollTrigger"
import { GSDevTools } from "gsap-trial/GSDevTools"
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin"
gsap.registerPlugin(GSDevTools, ScrollTrigger, Physics2DPlugin)

const testRef = ref(null)
const btnRef = ref(null)
const checkboxRef = ref(null)
const screenWidth = ref(window.innerWidth)

const initAnimation = () => {
    const isMatches = window.matchMedia('(prefers-color-scheme: dark)').matches // 匹配系统主题
    const mm = gsap.matchMedia(),
        breakPoint = 800
    // checkboxRef.value.checked = window.matchMedia('(perfers-reduced-motion:reduce)').matches
    checkboxRef.value.addEventListener('change', gsap.matchMediaRefresh)
    mm.add({
        isDesktop: `(min-width:${breakPoint}px)`,
        isMobile: `(max-width:${breakPoint}px)`,
        prefersMotion: '(prefers-reduced-motion: no-preference)'
    }, (context) => {
        console.log(context)
        const tl = gsap.timeline()
        const { isDesktop, isMobile, prefersMotion } = context.conditions
        const duration = context.isReverted ? 0 : 2
        if (isDesktop) {
            tl.to(testRef.value, {
                backgroundColor: 'red',
                duration,
            }).to(testRef.value, {
                scale: 1.4,
                duration
            })
        } else if (isMobile) {
            gsap.to(testRef.value, { backgroundColor: 'purple' })
            context.add('onClick', () => {
                gsap.to(btnRef.value, { rotation: 360, repeat: -1 })
            })
            btnRef.value.addEventListener('click', context.onClick)
        }
        return () => {
            // 进行一些清理工作
            btnRef.value.removeEventListener('click', context.onClick)
        }
    }, testRef.value)
}

const resizeFn = () => {
    screenWidth.value = window.innerWidth
}

const addEventWindow = () => {
    window.addEventListener('resize', resizeFn)
}

const removeEventWindow = () => {
    window.removeEventListener('resize', resizeFn)
}

onMounted(() => {
    initAnimation()
    addEventWindow()
})

onBeforeUnmount(() => {
    removeEventWindow()
})
</script>
<style lang="scss" scoped></style>