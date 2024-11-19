<template>
    <div class="tictactoe w-full h-screen p-5 flex flex-col bg-gray-400">
        <header
            class="text-white h-[100px] opacity-60 px-2.5 bg-gray-800 flex items-center justify-between text-2xl *:h-full">
            <div class="font-bold fx"><span>{{ routeTitle }}</span></div>
            <div class="fx gap-2.5 select-none">
                <div class="fx flex-col gap-2.5">
                    <button :disabled="isStart"
                        class="w-[100px] hover:bg-gray-600 hover:border-1 text-sm/6 border border-white rounded disabled:cursor-not-allowed"
                        @click="startGame">开始游戏</button>
                    <button :disabled="!isStart"
                        class="w-[100px] hover:bg-gray-600 hover:border-1 text-sm/6 border border-white rounded disabled:cursor-not-allowed"
                        @click="overGame">结束游戏</button>
                </div>
                <div class="fx flex-col gap-2.5">
                    <button :disabled="!isStart"
                        class="w-[100px] hover:bg-gray-600 hover:border-1 text-sm/6 border border-white rounded disabled:cursor-not-allowed"
                        @click="stopGame">{{ isStop ? '继续' : '暂停' }}游戏</button>
                    <button :disabled="!isStart"
                        :class="`w-[100px] hover:bg-gray-600 text-sm/6 border border-white rounded disabled:cursor-not-allowed`"
                        @click="resetGame">重置本局</button>
                </div>
                <div class="fx flex-col gap-2.5">
                    <CellSizeSelect v-model="boardSize" />
                    <ColorSelect v-model="borderColor" />
                </div>
            </div>
        </header>
        <div class="w-full flex flex-col justify-center items-center flex-1 gap-5">
            <div class="fx gap-4 font-bold select-none">
                <div>黑方: {{ blackCount }}</div>
                <div class="text-xl"><span>V</span><span class="text-white">S</span></div>
                <div class="text-white">白方: {{ whiteCount }}</div>
            </div>
            <div class="flex items-center gap-10 select-none">
                <div class="flex flex-col items-center">
                    <div>黑方</div>
                    <SvgIcon :class="{ 'animate-chess': user === opponentBlack }" name="black" width="40" height="40" />
                </div>
                <div class="border flex flex-wrap box-content  rounded-sm" :style="computedWH">
                    <div :style="computeCellWh" class="flex flex-wrap border items-center justify-center"
                        :class="{ 'hover:cellhover': isStart }" v-for="(item) in tttData" :key="item.id"
                        @dblclick="playChess(item)">
                        <SvgIcon v-if="item.type === 'black'" name="black" width="20" height="20" />
                        <SvgIcon v-if="item.type === 'white'" name="white" width="20" height="20" />
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="text-E6E6">白方</div>
                    <SvgIcon :class="{ 'animate-chess': user === opponentWhite }" name="white" width="40" height="40" />
                </div>
            </div>
            <div v-if="isStart" class="text-white fx gap-4">
                <div>
                    <span>落子方: </span>
                    <span class="text-lg">{{ isBlack ? '黑方' : '白方' }}</span>
                </div>
                <div class="fx gap-1">
                    <div>倒计时: </div>
                    <div :class="{ 'animate-chess': downCount <= 10 }" class="w-5 text-center">{{ downCount }}S</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { nanoid } from 'nanoid'
import CellSizeSelect from '@/components/CellSizeSelect/index.vue'
import ColorSelect from '@/components/ColorSelect/index.vue'
const DOWNCOUNTTIME = 300
// 黑方
const opponentBlack = 'black'
// 白方
const opponentWhite = 'white'
// 是否开始了
const isStart = ref(false)
// 是否暂停
const isStop = ref(false)
// 表格边框颜色
const borderColor = ref('#D8B4FE')
// 棋盘宽高
const boardSize = ref(440) // 440(11X11) 520(13X13) 600(15X15)  
// 每个格子的宽高
const cellWH = ref(40)
// 棋盘数据
const tttData = ref([])
// 下棋倒计时长（秒）
const downCount = ref(DOWNCOUNTTIME)
// 下棋方
const user = ref('')
// 定时器
const timer = ref(null)
//路由参数
const route = useRoute()
// 积分
const winIntegralMap = reactive(new Map([['black', 0], ['white', 0]]))
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
// 黑方积分总和
const blackCount = computed(() => {
    return winIntegralMap.get(opponentBlack)
})
// 白方积分总和
const whiteCount = computed(() => {
    return winIntegralMap.get(opponentWhite)
})
// 此刻落子方是否是黑方
const isBlack = computed(() => {
    return user.value === opponentBlack
})
// 黑方积分加1
const blackAddOne = () => {
    let num = winIntegralMap.get(opponentBlack)
    num++
    winIntegralMap.set(opponentBlack, num)
}
// 白方积分加1
const whiteAddOne = () => {
    let num = winIntegralMap.get(opponentWhite)
    num++
    winIntegralMap.set(opponentBlack, num)
}
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
            type: null,// 用于判断是黑方(black)还是白方(white)
            index, // 索引
            chessTime: 0,// 落棋时间
        }
    })
}
// 随机指定先手
const randomMathToUser = () => {
    user.value = Math.floor(Math.random() * 1000) % 2 === 0 ? opponentBlack : opponentWhite
}
// 清除定时器
const clearTime = () => {
    clearInterval(timer.value)
    timer.value = null
}

// 判断五子是否相连
const chessWin = () => {
    return false
}

// 开始下棋
const playChess = (item) => {
    // 游戏没开始或者处于暂停或者该格子已有棋子直接return
    if (!isStart.value || isStop.value || item.type) return
    if (isBlack.value) {
        // 黑方下棋
        item.type = opponentBlack
        item.chessTime = Date.now()
        user.value = opponentWhite
    } else {
        // 白方下棋
        item.type = opponentWhite
        item.chessTime = Date.now()
        user.value = opponentBlack
    }
    console.log(tttData.value)
    // chessWin()
    startCutDownCount(DOWNCOUNTTIME)
}

// 重置
const resetGame = () => {
    startCutDownCount(DOWNCOUNTTIME)
    getChessData()
}
// 结束
const overGame = () => {
    isStart.value = false
    user.value = ''
    isStop.value = false
    downCount.value = DOWNCOUNTTIME
    winIntegralMap.set(opponentBlack, 0)
    winIntegralMap.set(opponentWhite, 0)
    clearTime()
}
// 暂停
const stopGame = () => {
    isStop.value = !isStop.value
    if (isStop.value) {
        // 暂停
        clearTime()
    } else {
        // 继续
        startCutDownCount(downCount.value)
    }
}

// 倒计时结束判断输赢
const DetermineWinnerloserByCutDownCount = () => {
    if (isBlack.value) {
        // 白方赢
        whiteAddOne()
    } else {
        // 黑方赢
        blackAddOne()
    }
    overGame()
}
// 开启倒计时
const startCutDownCount = (count = downCount.value) => {
    clearTime()
    downCount.value = count
    timer.value = setInterval(() => {
        if (downCount.value <= 0) {
            // 判断输赢
            DetermineWinnerloserByCutDownCount()
        } else {
            downCount.value--
        }
    }, 1000)
}
// 开始
const startGame = () => {
    randomMathToUser()
    isStart.value = true
    startCutDownCount()
}

onMounted(() => {
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