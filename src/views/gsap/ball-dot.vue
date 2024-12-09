<template>
    <div ref="boxRef" @click="playAnimation" class="h-2screen relative animation-container w-full bg-purple-600">
        <div class="w-fit fixed right-0 top-1/2 -translate-y-1/2 ">
            <button class="item" @click.stop="scroll(1)">part1</button>
            <button class="item" @click.stop="scroll(2)">part2</button>
            <button class="item" @click.stop="scroll(3)">part3</button>
        </div>
        <div class="h-screen w-full bg-blue-500 ">
            <h1 id="part1">part1</h1>
        </div>
        <div class="h-screen w-full bg-green-500 ">
            <h1 id="part2">part2</h1>
        </div>
        <div class="h-screen w-full bg-orange-500 ">
            <h1 id="part3">part3</h1>
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
const playAnimation = (e) => {
    const mx = e.pageX
    const my = e.pageY
    const dots = []
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div')
        dot.style.position = 'absolute'
        dot.style.borderRadius = '50%'
        const wh = gsap.utils.random(10, 30)
        dot.style.width = wh + 'px'
        dot.style.height = wh + 'px'
        dot.style.left = (mx - wh / 2) + 'px'
        dot.style.top = (my - wh / 2) + 'px'
        dot.style.scale = 0
        gsap.set(dot, { backgroundColor: "random(['#519ABA','orange','blue','red','yellow','white'])" })
        boxRef.value.appendChild(dot)
        dots.push(dot)
    }
    gsap.to(dots, {
        scale: 1,
        duration: 1,
        stagger: 0.1,
        physics2D: {
            velocity: 'random(100,600)',
            angle: 'random(250,290)',
            gravity: 800,
            friction: 0.01,
            acceleration: 900
        },
        onComplete: () => {
            gsap.to(window, { duration: 1, scrollTo: { y: 0 } })
            gsap.to(dots, {
                scale: 0,
                duration: 1,
                onComplete: () => {
                    dots.forEach(item => {
                        item.remove()
                    })
                }
            })
        }
    })
}
const scroll = (index) => {
    gsap.to(window, {
        duration: 0.5, ease: 'expoScale', scrollTo: {
            y: `#part${index}`, offsetY: 10, autoKill: true, onAutoKill: () => {
                console.log('onAutoKill');
            }
        }
    })
}

const initAnimation = () => {

}

onMounted(() => {
    initAnimation()
})


</script>
<style lang="scss" scoped></style>