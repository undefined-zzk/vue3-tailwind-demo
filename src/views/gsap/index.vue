<template></template>
<script setup>
import { gsap } from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { SplitText } from "gsap-trial/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const boxRef = ref(null);
const restartRef = ref(null);
const inRestartRef = ref(null);
const tween = ref(null);
const initAnimation = () => {
  tween.value = gsap.to(boxRef.value, {
    id: "test",
    x: "+=200",
    duration: 1,
    stagger: 0.1,
    repeat: 4,
    opacity: "-=0.1",
  });
};

const restartAni = () => {
  tween.value.restart();
};
const stopAni = () => {
  tween.value.pause(1);
};
const inRestartAni = () => {
  tween.value.invalidate();
  tween.value.restart();
};

const checkActive = () => {
  console.log(tween.value.isActive());
};

const iteration = () => {
  tween.value.iteration(2);
};
const kill = () => {
  tween.value.kill(boxRef.value, "x");
};

onMounted(() => {
  initAnimation();
});
</script>
<style lang="scss" scoped></style>
