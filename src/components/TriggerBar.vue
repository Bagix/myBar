<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBarStore } from '../stores/barStore'

const props = defineProps<{
  rootMargin: number
}>()

const emit = defineEmits(['intersection'])

const store = useBarStore()
const trigger = ref<HTMLElement>()

function handleObserver(entries: IntersectionObserverEntry[]): void {
  if (entries[0].isIntersecting) {
    emit('intersection')
  }
}

onMounted(() => {
  const observerOptions = {
    rootMargin: `${props.rootMargin}px`
  }

  const observer = new IntersectionObserver((enteries) => handleObserver(enteries), observerOptions)
  const trigerElement = trigger.value

  if (trigerElement) {
    observer.observe(trigerElement)
  }
})
</script>

<template>
  <div class="trigger-bar">
    <div ref="trigger" class="trigger" v-show="!store.isLoading" />
    <span v-if="store.isLoading">LOADER</span>
  </div>
</template>

<style lang="scss" scoped>
.trigger-bar {
  display: flex;
  justify-content: center;
  width: 100%;
}

.trigger {
  width: 80%;
  max-width: 500px;
  height: 10px;
  background: var(--vt-c-black-soft);
  border-radius: 5px;
}
</style>
