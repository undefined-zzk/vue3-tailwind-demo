<template>
    <div>
        <div class="w-full p-2" ref="container">
            <div class="fx justify-center">
                <button class="border px-2 text-base" @click="play">开始动画A</button>
                <button class="border px-2 text-base" @click="tweenA.pause()">暂停动画A</button>
                <button class="border px-2 text-base" @click="tweenA.reverse()">反向动画A</button>
                <button class="border px-2 text-base" @click="tweenA.restart()">重新动画A</button>
                <button class="border px-2 text-base" @click="tweenA.progress(0.5)">进度一半A</button>
                <button class="border px-2 text-base" @click="tweenA.timeScale(0.2)">变慢0.2x</button>
                <button class="border px-2 text-base" @click="tweenA.timeScale(2)">变快2x</button>
                <button class="border px-2 text-base" @click="tweenA.seek(1.4)">SEEK</button>
            </div>
            <div id="A" class="item mt-2 bg-red-900">A</div>
            <div id="B" class="item mt-2 bg-blue-900">B</div>
        </div>
        <div class="w-full p-2" ref="container">
            <div class="fx justify-center">
                <button class="border px-2 text-base" @click="palyC">开始动画C</button>
                <button class="border px-2 text-base" @click="tweenC.pause()">暂停动画</button>
                <button class="border px-2 text-base" @click="tweenC.resume()">恢复动画</button>
            </div>
            <div id="C" class="item mt-2 bg-blue-500">C</div>
            <div id="D" class="item mt-2 bg-purple-900">D</div>
            <div class="fx gap-10">
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-300 "></span>
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-400 "></span>
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-500 "></span>
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-600 "></span>
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-700 "></span>
                <span class="cricle shadow block w-[40px] h-[40px] rounded-full border bg-slate-800 "></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { gsap } from "gsap"

const tweenA = ref(null)
const tweenB = ref(null)
const tweenC = ref(null)
const container = ref(null)
const play = () => {
    tweenA.value.play()
    tweenB.value.play()
}

const palyC = () => {
    tweenC.value = gsap.from("#C,#D", { ease: "power2.in", x: '50vw', y: 100, duration: 1, rotation: 300, scale: 0.4, repeat: 0, yoyo: false, stagger: 0.3 })
}
const getRandomMath = () => {
    return gsap.utils.random(0, 200, 5)
}
const initAnimation = () => {
    const tl = gsap.timeline({ paused: true })
    gsap.set("#A,#B", { transformOrigin: "50% 50%" })
    const params = {
        x: () => container.value.offsetWidth - 80 - 16,
        y: getRandomMath(), // 随机数字
        duration: 2, // 动画总时长2s
        delay: 0,// 动画延迟时间
        repeat: 1, // 无限循环
        repeatDelay: 0.5, // 重复延迟时间
        yoyo: true, // 重复播放
        backgroundColor: 'purple',
        border: '5px solid #000',
        rotation: 360,
        repeatRefresh: true,
        skewX: 45
    }
    tweenA.value = tl.to('#A', {
        ease: "power2.inOut",
        ...params,
        onUpdate (e) {
        }
    })
    tweenB.value = tl.to('#B', {
        ease: "power2.in",
        x: () => container.value.offsetWidth - 80 - 16,
        ...params
    })

    tl.from('.cricle', { duration: 1, opacity: 0, y: getRandomMath(), repeat: 0, stagger: 0.25, yoyo: true })
    tl.from('#D', { duration: 1, opacity: 0 }, '-=1.5')
    tl.addLabel('label', '-=0.5')
    tl.to('.cricle', { duration: 0.5, opacity: 0, x: 300, y: 0, stagger: -0.25 }, 'label')
}

// const myObject = { rotation: 0, x: 0, y: 0 }
// gsap.to(myObject, {
//     duration: 2, rotation: 360, x: 100, onUpdate () {
//         console.log(myObject)
//     },
//     onStart (start) {
//         console.log('start', start)
//     },
//     onComplete (finish) {
//         console.log('finish', finish)
//     }
// })

onMounted(() => {
    initAnimation()
})
</script>
<style lang="scss" scoped></style>