<script setup>
import { RouterView } from 'vue-router';

const route = useRoute()
// console.log('route', route.query);
// window.addEventListener('message', (e) => {
//   console.log('eeee', e);
// })

</script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped lang="scss"></style>
