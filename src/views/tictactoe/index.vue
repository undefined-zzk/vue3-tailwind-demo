<template>
    <div class="tictactoe w-full h-screen p-5 flex flex-col bg-gray-400">
        <header class="h-[100px] bg-gray-800">header</header>
        <div class="w-full flex flex-col justify-center items-center flex-1">
            <div class="flex items-center gap-10">
                <div class="flex flex-col items-center">
                    <div>黑方</div>
                    <SvgIcon name="black" width="40" height="40" />
                </div>
                <div class="border box-content border-purple-300 rounded-sm flex flex-wrap" :style="computedWH">

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

// 棋盘宽高
const tttWH = ref(400)
// 每个格子的宽高
const cellWH = ref(40)

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

onActivated(() => {
    console.log('onActivated,进入')
})
onDeactivated(() => {
    console.log('onDeactivated,销毁')
})
</script>
<style lang="scss" scoped></style>