<template>
    <div class="h-screen w-screen ">
        <div v-for="item in demoList" :key="item.id"
            class="flex  border rounded overflow-hidden  border-s-cyan-400 size-[150px] flex-col items-center justify-center">
            <SvgIcon :name="item.icon" />
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
<script setup>
import { nanoid } from 'nanoid'
const demoList = ref([
    { id: nanoid(), name: '井字棋', path: "/ticTacToe", icon: 'tictactoe' }
])
</script>
<style lang="scss" scoped></style>