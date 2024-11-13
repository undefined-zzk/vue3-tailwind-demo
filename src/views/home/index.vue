<template>
    <div class="text-3xl font-bold underline bg-slate-600">
        Hello world! -- {{ test }}
    </div>
</template>
<script setup>
import { useTestStore } from '@/stores/modules/test'
import { storeToRefs } from 'pinia'
const testStore = useTestStore()
const { test } = storeToRefs(testStore)
</script>
<style lang="scss" scoped></style>