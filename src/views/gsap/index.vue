<template>
    <div class="h-full p-5 fx gap-5 bg-purple-700 select-none *:text-white">
        <button @click="openDialog" class="border border-purple-500 w-40 rounded-md">打开弹窗</button>
        <div id="box"
            class="w-1/2 invisible origin-top-left scale-50 fx h-1/2 fixed z-10 bg-neutral-500 opacity-60 left-0 top-0 border border-purple-400 rounded-md leading-10 text-center">
            <button @click="closeDialog" class="border border-purple-700 w-40 rounded-md">关闭</button>
        </div>
        <div class="container" ref="ballRef">
        </div>
    </div>
</template>
<script setup>
// import { gsap } from 'gsap'
import { gsap } from "gsap-trial"
import { ScrollTrigger } from "gsap-trial/ScrollTrigger"
import { GSDevTools } from "gsap-trial/GSDevTools"
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin"
gsap.registerPlugin(GSDevTools, ScrollTrigger, Physics2DPlugin)
// GSDevTools.create()
const ballRef = ref(null)
const exp = ref(null)
const dots = ref([])
const initAnimation = () => {
    const tl = gsap.timeline({ repeat: -1, defaults: { duration: 3 } })
    try {
        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div')
            dot.setAttribute("class", "dot")
            ballRef.value.appendChild(dot)
            dots.value.push(dot)
        }
        tl.set(dots.value, { backgroundColor: 'random([#663399,#84d100,#cc9900,#0066cc,#993333])', scale: 'random(0.4,1)', x: 400, y: 300, width: '40px', height: '40px', borderRadius: '50%', position: 'absolute' })
        tl.to(dots.value, {
            physics2D: {
                velocity: "random(200, 650)",
                angle: "random(250, 290)",
                gravity: 500
            },
            delay: "random(0, 2.5)"
        }).to(dots.value,
            {
                opacity: 0, onComplete: () => {
                }
            }
        )
    } catch (error) {
        console.log('aa', error)
    }
    // 延迟2秒后执行
    gsap.delayedCall(1, (...args) => {
        // tl.restart()
    }, [1, 2])
}

const openDialog = () => {
    exp.value = gsap.exportRoot()
    exp.value.pause()
    const tl = gsap.timeline({ defaults: { visibility: 'visible', } })
    tl.seek(0).clear()
    tl.to('#box', {
        ease: 'elastic.out',
        duration: 0.8,
        left: () => window.innerWidth / 2,
        top: () => window.innerWidth / 2,
        xPercent: -50,
        yPercent: -50,
        scale: 1,
    })
}

const closeDialog = () => {
    const tl = gsap.timeline()
    tl.seek(0).clear()
    tl.to("#box", {
        left: 0, top: 0, scale: 0, ease: 'expo.in', onComplete: () => {
            exp.value.resume()
        }
    })
}

onMounted(() => {
    initAnimation()
})

onBeforeUnmount(() => {
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