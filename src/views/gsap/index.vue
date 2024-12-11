<template>
    <div class="h-full p-5 fx gap-5 bg-purple-700 select-none *:text-white">
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
const dots = ref([])
const initAnimation = () => {
    const tl = gsap.timeline({ repeat: -1 })
    try {
        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div')
            dot.setAttribute("class", "dot")
            ballRef.value.appendChild(dot)
            dots.value.push(dot)
        }
        tl.set(dots.value, { backgroundColor: 'random([#663399,#84d100,#cc9900,#0066cc,#993333])', scale: 'random(0.4,1)', x: 400, y: 300, width: '40px', height: '40px', borderRadius: '50%', position: 'absolute' })
        tl.to(dots.value, {
            duration: 2.5,
            physics2D: {
                velocity: "random(200, 650)",
                angle: "random(250, 290)",
                gravity: 500
            },
            delay: "random(0, 2.5)"
        }).to(dots.value,
            {
                opacity: 0, onComplete: () => {
                    console.log('dots', dots.value.length)
                }
            }
        )
    } catch (error) {
        console.log('aa', error)
    }
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