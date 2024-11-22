<template>
    <div class="animation-container h-full">
        <div class="item1 m-auto w-full h-screen bg-gray-400">
        </div>
        <div class="item2 m-auto w-full h-screen bg-blue-500 fx justify-start">
            <div class="red-box w-[50px] h-[50px] bg-red-500 border">1</div>
            <div class="red-box2 w-[50px] h-[50px] bg-red-500 border">2</div>
        </div>
        <div class="item3 m-auto w-full h-screen bg-purple-600 "></div>
    </div>
</template>
<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { TextPlugin } from "gsap/TextPlugin"
// 注册插件
gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin)

const initAnimation = () => {
    gsap.to('.item1', {
        duration: 3,
        backgroundColor: 'green',
        scrollTrigger: {
            trigger: '.item1',
            scrub: true,
            start: 'top center',
        }
    })
    gsap.from('.item2', {
        duration: 1,
        width: '80%',
        opacity: 0.5,
        scrollTrigger: {
            trigger: '.item2',
            scrub: true,
            start: 'top center',
            end: 'bottom-=100 80%'
        }
    })
    gsap.to('.red-box', {
        x: 600, rotation: 360, duration: 2, scrollTrigger: {
            trigger: '.item2',
            scrub: true,
            start: 'center center',
            markers: true,
            endTrigger: '.item3',
            end: 'top 80%'
        }
    })
    gsap.to('.red-box2', {
        x: 600, rotation: 360, duration: 4,
        scrollTrigger: {
            trigger: '.red-box2',
            toggleActions: 'restart pause reverse pause',
        }
    })
}

onMounted(() => {
    initAnimation()
})


</script>
<style lang="scss" scoped></style>