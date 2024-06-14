<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const trigger = ref<HTMLElement>()

function handleObserver(): void {
  console.log('test2-----------')
}

onMounted(async () => {
  console.log('2--------')
  const options = {
    root: null,
    threshold: 1,
    rootMargin: '100px'
  }
  await nextTick()
  const observer = new IntersectionObserver(handleObserver, options)
  const x = trigger.value
  console.log(x)
  observer.observe(x)
  alert()
})
</script>

<template>
  <div ref="trigger" id="trigger" />
</template>

<style lang="scss" scoped>
#trigger {
  width: 100%;
  height: 10px;
  background: red;
}
</style>
