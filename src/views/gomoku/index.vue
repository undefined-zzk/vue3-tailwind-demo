<template>
    <div class="tictactoe w-full h-screen p-5 flex flex-col bg-gray-400">
        <header class=" text-white h-[100px] opacity-60 bg-gray-800 text-center leading-[100px] font-bold text-2xl">{{
            routeTitle }}
        </header>
        <div class="w-full flex flex-col justify-center items-center flex-1">
            <div class="flex items-center gap-10">
                <div class="flex flex-col items-center">
                    <div>黑方</div>
                    <SvgIcon name="black" width="40" height="40" />
                </div>
                <div class="border flex flex-wrap  box-content border-purple-300 rounded-sm" :style="computedWH">
                    <div :style="computeCellWh"
                        class="flex flex-wrap border border-purple-300 items-center justify-center"
                        v-for="(item, index) in tttData" :key="item.id">
                        <SvgIcon v-if="item.type == 'black'" name="black" width="20" height="20" />
                        <SvgIcon v-else name="white" width="20" height="20" />
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="text-E6E6">白方</div>
                    <SvgIcon name="white" width="40" height="40" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { nanoid } from 'nanoid'
// 棋盘宽高
const tttWH = ref(400)
// 每个格子的宽高
const cellWH = ref(40)

// 棋盘数据
const tttData = ref([])

// 标题
const route = useRoute()

const routeTitle = computed(() => {
    return route.meta.title
})

const computedWH = computed(() => {
    return `width:${tttWH.value}px;height:${tttWH.value}px`
})
const computeCellWh = computed(() => {
    return `width:${cellWH.value}px;height:${cellWH.value}px`
})

// 格子个数
const cellNum = computed(() => {
    const num = Math.floor(tttWH.value / cellWH.value)
    return Math.pow(num, 2)
})

tttData.value = Array.from({ length: cellNum.value }).map((_, index) => {
    return {
        id: nanoid(),
        type: index % 2 == 0 ? 'black' : 'white', // 用于判断是黑方(black)还是白方(white)
    }
})



onActivated(() => {
    console.log('onActivated,进入')
})
onDeactivated(() => {
    console.log('onDeactivated,销毁')
})
</script>
<style lang="scss" scoped></style>