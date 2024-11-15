<template>
    <div class="tictactoe w-full h-screen p-5 flex flex-col bg-gray-400">
        <header
            class="text-white h-[100px] opacity-60 px-2.5 bg-gray-800 flex items-center justify-between  text-2xl *:h-full">
            <div class="fx"></div>
            <div class="font-bold fx"><span>{{ routeTitle }}</span></div>
            <div class="fx flex-col gap-2.5">
                <CellSizeSelect v-model="boardSize" />
                <ColorSelect v-model="borderColor" />
            </div>
        </header>
        <div class="w-full flex flex-col justify-center items-center flex-1">
            <div class="flex items-center gap-10 select-none">
                <div class="flex flex-col items-center">
                    <div>黑方</div>
                    <SvgIcon :class="{ 'animate-chess': user == opponentBlack }" name="black" width="40" height="40" />
                </div>
                <div class="border flex flex-wrap box-content  rounded-sm" :style="computedWH">
                    <div :style="computeCellWh"
                        class="flex flex-wrap border items-center justify-center hover:cellhover"
                        v-for="(item, index) in tttData" :key="item.id">
                        <SvgIcon v-if="item.type == 'black'" name="black" width="20" height="20" />
                        <SvgIcon v-else name="white" width="20" height="20" />
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="text-E6E6">白方</div>
                    <SvgIcon :class="{ 'animate-chess': user == opponentWhite }" name="white" width="40" height="40" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { nanoid } from 'nanoid'
import CellSizeSelect from '@/components/CellSizeSelect/index.vue'
import ColorSelect from '@/components/ColorSelect/index.vue'
const opponentBlack = 'black' // 黑方
const opponentWhite = 'white' // 白方
// 表格边框颜色
const borderColor = ref('#D8B4FE')
// 棋盘宽高
const boardSize = ref(440) // 440(11X11) 520(13X13) 600(15X15)
// 每个格子的宽高
const cellWH = ref(40)
// 棋盘数据
const tttData = ref([])

// 下棋方
const user = ref('black')

const route = useRoute()
// 标题
const routeTitle = computed(() => {
    return route.meta.title
})

// 监听表格尺寸重新计算格子数
const stopBoardWatch = watch([boardSize], () => {
    getChessData()
})

const computedWH = computed(() => {
    return `width:${boardSize.value}px;height:${boardSize.value}px;border-color:${borderColor.value}`
})
const computeCellWh = computed(() => {
    return `width:${cellWH.value}px;height:${cellWH.value}px;border-color:${borderColor.value}`
})

// 格子个数
const cellNum = computed(() => {
    const num = Math.floor(boardSize.value / cellWH.value)
    return Math.pow(num, 2)
})

// 棋子数据
const getChessData = () => {
    tttData.value = Array.from({ length: cellNum.value }).map((_, index) => {
        return {
            id: nanoid(),
            type: index % 2 == 0 ? opponentBlack : opponentWhite, // 用于判断是黑方(black)还是白方(white)
        }
    })
}

// 随机指定先手
const randomMathToUser = () => {
    user.value = Math.floor(Math.random() * 1000) % 2 === 0 ? opponentBlack : opponentWhite
}

onMounted(() => {
    randomMathToUser()
    getChessData()
})
onActivated(() => {
    console.log('onActivated,进入')
})
onDeactivated(() => {
    console.log('onDeactivated,销毁')
})

onBeforeRouteLeave((to, from) => {
    // 路由离开前　todo~
    return true
})

onBeforeUnmount(() => {
    stopBoardWatch()
})
</script>
<style lang="scss" scoped></style>