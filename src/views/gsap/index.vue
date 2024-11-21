<template>
    <div class="animation-container h-full">
        <div class="h-screen overflow-auto">
            <div id="item1" class="h-screen border rounded-md bg-orange-300 "></div>
            <div id="item2" class="h-screen border rounded-md bg-orange-400">
                <div id="item2-child" class="w-[100px] h-[100px] border rounded-md bg-purple-400">item2</div>
                <div class="item2-child2 w-[100px] h-[100px] border rounded-md bg-purple-400">item2-test</div>
            </div>
            <div id="item3" class="h-screen border rounded-md bg-orange-500 "></div>
            <div id="item4" class="h-screen border rounded-md bg-orange-600 "></div>
            <div id="item5" class="h-screen border rounded-md bg-orange-700 "></div>
            <div id="item6" class="h-screen border rounded-md bg-orange-800 "></div>
        </div>
    </div>
</template>
<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";



</script>
<style lang="scss" scoped></style>