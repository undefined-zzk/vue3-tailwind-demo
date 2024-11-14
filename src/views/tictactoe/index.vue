<template>
    <div class="tictactoe w-full h-screen p-5 flex justify-center items-center">
        <div class="w">
            <div class="">黑方</div>
            <div class="">棋盘</div>
            <div class="">白方</div>
        </div>
    </div>
</template>
<script setup>
onActivated(() => {
    console.log('onActivated,进入')
})
onDeactivated(() => {
    console.log('onDeactivated,销毁')
})
</script>
<style lang="scss" scoped></style>