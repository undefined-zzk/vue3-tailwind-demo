<template>
    <div class="h-full p-5 bg-purple-700 select-none *:text-white">
        <div class="flex flex-wrap gap-5 content-start" v-memo="[comItemCount]">
            <div id="color-item" :style="{ backgroundColor: getRandomColor() }"
                class="leading-[80px] text-center w-20 h-20 border border-purple-500 rounded-md shadow" :key="i"
                v-for="i in comItemCount">{{ i }}
            </div>
        </div>
        <div class="flex items-start justify-center gap-20 mt-10">
            <div class="fx items-start gap-5">
                <div>from:</div>
                <div>
                    <label v-for="(item, index) in fromList" :key="index" :for="item.value"
                        class="fx gap-1 justify-start">
                        <input :id="item.value" type="radio" v-model="fromType" :value="item.value" />
                        <code>{{ item.label }}</code>
                    </label>
                </div>
            </div>
            <div class="fx items-start gap-5">
                <div>axis:</div>
                <div>
                    <label v-for="(item, index) in axisList" :key="index" :for="item.value"
                        class="fx gap-1 justify-start">
                        <input :id="item.value" type="radio" v-model="axisType" :value="item.value" />
                        <code>{{ item.label }}</code>
                    </label>
                </div>
            </div>
            <div class="fx items-start gap-5">
                <div>ease:</div>
                <div>
                    <label v-for="(item, index) in easeList" :key="index" :for="item.value"
                        class="fx gap-1 justify-start">
                        <input :id="item.value" type="radio" v-model="easeType" :value="item.value" />
                        <code>{{ item.label }}</code>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { gsap } from 'gsap'
import { gsap } from "gsap-trial"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { TextPlugin } from "gsap/TextPlugin"
import { GSDevTools } from "gsap-trial/GSDevTools"
import { SplitText } from "gsap-trial/SplitText"
import { useMouse } from '@/composables/useMouse'

const innerWidth = ref(window.innerWidth)

const fromList = ref([
    { label: 'center', value: 'center' },
    { label: 'end', value: 'end' },
    { label: 'edges', value: 'edges' },
    { label: 'random', value: 'random' },
    { label: '11(index)', value: '11' },
])

const axisList = ref([
    { label: 'null(both)', value: null },
    { label: 'x', value: 'x' },
    { label: 'y', value: 'y' },
])

const easeList = ref([
    { label: 'none', value: 'none' },
    { label: 'power3.inOut', value: 'power3.inOut' },
    { label: 'power2.in', value: 'power2.in' },
])
let tl = gsap.timeline({ repeat: -1, yoyo: true })
const fromType = ref('center')
const axisType = ref(null)
const easeType = ref('none')
const timer = ref(null)
// 行数
const lineCount = 3
// 注册插件
gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin, GSDevTools, SplitText)

const colCount = computed(() => {
    return Math.floor(innerWidth.value / 100)
})
const comItemCount = computed(() => {
    return colCount.value * lineCount
})

const grid = computed(() => {
    return [lineCount, colCount.value]
})


const getRandomColor = gsap.utils.random(['blue', 'orange', 'purple', 'green', 'red', 'yellow', '#FF7043', "#24292E"], true)

const initAnimation = () => {
    tl.to('#color-item', {
        scale: 0.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        y: 60,
        stagger: {
            amount: 1,
            grid: grid.value,
            from: fromType.value,
            axis: axisType.value,
            ease: easeType.value,
        }
    })
}

const resizeWidth = (e) => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
        innerWidth.value = e.target.innerWidth
    }, 200)
}

watch([fromType, axisType, easeType, innerWidth], async () => {
    await nextTick()
    tl.seek(0).clear()
    initAnimation()
})

onMounted(() => {
    window.addEventListener('resize', resizeWidth)
    initAnimation()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeWidth)
})


</script>
<style lang="scss" scoped>
.active {
    color: purple !important;
}
</style>