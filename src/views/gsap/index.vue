<template>
    <div ref="boxRef"
        class="flex flex-wrap gap-5 p-5 justify-center h-screen relative overflow-y-auto animation-container w-full bg-purple-600">
        <div class="box-item relative rounded-md overflow-hidden w-[400px] h-[300px]" v-for="(item, index) in list"
            :key="index">
            {{ item.loading }}
            <img v-lazy="item.url" @load="onLoad(index)" class="w-full h-full" alt="">
        </div>
    </div>
</template>
<script setup>
import { gsap } from "gsap-trial";
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin";
import { ScrollToPlugin } from "gsap-trial/ScrollToPlugin";
import { SplitText } from 'gsap-trial/SplitText'
// 注册插件
gsap.registerPlugin(Physics2DPlugin, ScrollToPlugin, SplitText)
const boxRef = ref(null)

const list = ref(new Array(100).fill(false).map(item => ({ ...item, loading: true, url: `https://picsum.photos/id/${Math.floor(gsap.utils.random(200, 1000))}/400/300` })))

const initAnimation = () => {
}

const loading = ref(true)

const onLoad = (index) => {
    list.value[index].loading = false
}

setTimeout(() => {
    loading.value = false
}, 2000)

onMounted(() => {
    initAnimation()
})


</script>
<style lang="scss" scoped></style>