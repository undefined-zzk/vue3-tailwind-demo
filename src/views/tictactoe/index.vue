<template>
    <div class="tictactoe">tictactoe</div>
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