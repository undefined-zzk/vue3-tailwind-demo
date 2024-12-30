<template>
  <div>
    <div id="screen0" class="h-screen w-full bg-red-500">
      <img
        class="w-full h-full object-cover"
        src="@/assets/images/bg.jpeg"
        alt=""
      />
    </div>
    <div
      ref="screen1Ref"
      id="screen1"
      class="h-screen m-0 p-0 w-full bg-green-700"
    >
      <video
        ref="videoRef"
        id="video"
        class="w-full object-cover h-full"
        src="@/assets/video/firework.mp4"
      ></video>
    </div>
    <div id="screen2" class="h-screen relative bg-blue-500">
      <div
        class="div-row absolute border border-purple-400 w-52 h-3/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          class="div1 z-0 w-52 h-full absolute inset-0 bg-purple-200 text-center"
        >
          1
        </div>
        <div
          class="div2 z-30 w-52 h-full absolute inset-0 bg-blue-200 text-center"
        >
          2
        </div>
        <div
          class="div3 z-40 w-52 h-full absolute inset-0 bg-pink-500 text-center"
        >
          3
        </div>
        <div
          class="div4 z-50 w-52 h-full absolute inset-0 bg-red-200 text-center z"
        >
          4
        </div>
        <div
          class="div5 z-40 w-52 h-full absolute inset-0 bg-orange-500 text-center"
        >
          5
        </div>
        <div
          class="div6 z-30 w-52 h-full absolute inset-0 bg-green-200 text-center"
        >
          6
        </div>
        <div
          class="div7 z-0 w-52 h-full absolute inset-0 bg-yellow-200 text-center"
        >
          7
        </div>
      </div>
    </div>
    <div id="screen3" class="h-screen bg-pink-500">3</div>
    <div id="screen4" class="h-screen bg-purple-500">4</div>
    <div id="screen5" class="h-screen bg-orange-500">5</div>
  </div>
</template>
<script setup>
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { GSDevTools } from "gsap-trial/GSDevTools";
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin";
gsap.registerPlugin(GSDevTools, ScrollTrigger, Physics2DPlugin);
const screen1Ref = ref(null);
const videoRef = ref(null);
const initAnimation = () => {
  ScrollTrigger.create({
    trigger: "#screen0>img",
    start: "top top",
    end: "bottom center",
    scrub: true,
    pinSpacing: false,
    animation: gsap
      .timeline()
      .fromTo("#screen0>img", { scale: 1 }, { scale: 0.7 })
      .fromTo("#screen1", { scale: 0.8 }, { scale: 1 }, "<"),
  });
  ScrollTrigger.create({
    trigger: "#screen1",
    start: "top top",
    end: "center top",
    pin: true,
    markers: true,
    scrub: true,
    poinSpacing: false,
    onUpdate: (self) => {
      try {
        videoRef.value.currentTime = self.progress * videoRef.value.duration;
      } catch (error) {}
    },
  });
  const tl = gsap.timeline();
  ScrollTrigger.create({
    trigger: "#screen2",
    start: "top top",
    endTrigger: "#screen3",
    pin: true,
    scrub: true,
    animation: tl
      .to(".div3", { x: -160, width: "-=50", scale: 0.95 })
      .to(".div5", { x: 210, width: "-=50", scale: 0.95 }, "<")
      .to(".div2", { x: -285, width: "-=80", scale: 0.9 }, "<")
      .to(".div6", { x: 365, width: "-=80", scale: 0.9 }, "<")
      .to(".div1", { x: -385, width: "-=100", scale: 0.85 }, "<")
      .to(".div7", { x: 485, width: "-=100", scale: 0.85 }, "<"),
  });
};
onMounted(() => {
  initAnimation();
});
</script>
<style lang="scss" scoped></style>
