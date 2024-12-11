<template>
    <div ref="boxRef" id="box"
        class="flex flex-col gap-5 items-center overflow-hidden min-h-screen relative animation-container w-full bg-purple-600">
        <div class="box-item fx relative gap-5 w-[1220px] h-[300px]" v-for="(item, index) in list" :key="index">
            <div class="rounded-md border border-purple-500 overflow-hidden w-[400px] h-[300px]"
                v-for="(sub, idx) in item.children" :key="sub">
                <Loading v-if="sub.loading"></Loading>
                <img v-lazy="sub.url" @load="onLoad(index, idx)" class="w-full h-full object-fill" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
import { gsap } from "gsap-trial"
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin"
import { ScrollToPlugin } from "gsap-trial/ScrollToPlugin"
import { SplitText } from 'gsap-trial/SplitText'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Loading from '@/components/Loading/index.vue'
// 注册插件
gsap.registerPlugin(Physics2DPlugin, ScrollToPlugin, SplitText, ScrollTrigger)
const boxRef = ref(null)

const list = ref(new Array(30).fill(false).map(item => ({
    ...item, children: [
        { url: `https://picsum.photos/id/${Math.floor(gsap.utils.random(200, 1000))}/400/300`, loading: true },
        { url: `https://picsum.photos/id/${Math.floor(gsap.utils.random(200, 1000))}/400/300`, loading: true },
        { url: `https://picsum.photos/id/${Math.floor(gsap.utils.random(200, 1000))}/400/300`, loading: true },
    ]
})))

const initAnimation = () => {
    const items = gsap.utils.toArray('.box-item')
    items.forEach(item => {
        gsap.from(item.children, {
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'back.inOut',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: "play none none reverse",
                onEnter: () => {
                    // console.log('onEnter');
                },
                onLeave: () => {
                    // console.log('onLeave');
                },
                onEnterBack: () => {
                    // console.log('onEnterBack');
                },
                onLeaveBack: () => {
                    // console.log('onLeaveBack');
                }
            }
        })
    })
}

const onLoad = (index, idx) => {
    list.value[index].children[idx].loading = false
}

onMounted(() => {
    initAnimation()
})

</script>
<style lang="scss" scoped>
.active {
    color: purple !important;
}

.container {
    background-color: #000;
    height: 262px;
    overflow: hidden;
    position: relative;
    width: 800px;
    margin: auto;
}
</style>