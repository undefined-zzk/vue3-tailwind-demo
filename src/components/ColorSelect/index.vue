<template>
    <div class="fx gap-2.5">
        <div class="font-medium text-sm/6 text-white">棋盘颜色:</div>
        <input type="color" :value="color" class="w-[100px]" @change="changeSelect">
    </div>
</template>
<script setup>

const emits = defineEmits(['change'])
const color = defineModel({ type: String, default: '#D8B4FE' })
const changeSelect = (e) => {
    color.value = e.target.value
}

</script>
<style lang="scss" scoped></style>