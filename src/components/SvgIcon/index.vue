<template>
    <svg aria-hidden="true" :style="style">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>
<script setup>
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#333',
    },
    width: {
        type: [Number, String],
        default: 100
    },
    height: {
        type: [Number, String],
        default: 100
    }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const style = computed(() => ({ width: props.width + 'px', height: props.height + 'px' }))
</script>
<style lang="scss" scoped></style>