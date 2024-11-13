<template>
    <div class="tictactoe">tictactoe</div>
</template>
<script setup>
onActivated(() => {
    console.log('onActivated')
})
onDeactivated(() => {
    console.log('onDeactivated')
})
</script>
<style lang="scss" scoped></style>