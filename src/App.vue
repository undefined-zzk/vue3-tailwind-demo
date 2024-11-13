<script setup>
import { RouterView } from 'vue-router';

const route = useRoute()
console.log('route', route);
window.addEventListener('message', (e) => {
  // console.log('eeee', e.data);
})

</script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped lang="scss"></style>
