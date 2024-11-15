<template>
    <div class="fx gap-2.5 w-fit">
        <div class="text-sm/6 font-medium text-white">棋盘尺寸:</div>
        <select @change="changeSelect" :value="boardSize" autocomplete="country-name"
            class="w-[100px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-sm/6">
            <option :value="item.value" v-for="(item, index) in sizeList" :key="index">{{ item.value }}</option>
        </select>
    </div>
</template>
<script setup>
const sizeList = ref([{ value: 440 }, { value: 520 }, { value: 600 }])
const boardSize = defineModel({ type: Number, default: 440 })
const changeSelect = (e) => {
    // 改变前 do something
    boardSize.value = +e.target.value
}
</script>
<style lang="scss" scoped></style>