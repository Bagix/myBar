<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBarStore } from '../stores/barStore'
import { storeToRefs } from 'pinia'
import CocktailCard from '@/components/CocktailCard.vue'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase'

const store = useBarStore()
const { cocktails } = storeToRefs(store)

const trigger = ref<HTMLElement>()

function handleObserver(entries: IntersectionObserverEntry[]): void {
  if (entries[0].isIntersecting) {
    store.loadData()
  }
}

onMounted(() => {
  const q = query(collection(db, 'cocktails'))
  onSnapshot(q, (): any => {
    store.loadData()
  })

  const options = {
    rootMargin: '200px'
  }

  const observer = new IntersectionObserver((enteries) => handleObserver(enteries), options)
  const trigerElement = trigger.value

  if (trigerElement) {
    observer.observe(trigerElement)
  }
})
</script>

<template>
  <div class="container">
    <CocktailCard
      v-for="cocktail in cocktails"
      :key="cocktail.id"
      :cocktail="cocktail"
      class="item"
    />
    <div ref="trigger" id="trigger" v-show="!store.isLoading" />
    <span v-if="store.isLoading">LOADER</span>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  padding: 16px;
  margin: auto;

  @media (width >= 768px) {
    flex-direction: row;
    justify-content: center;
  }
}

.test-el {
  width: 100%;
  height: 50vh;
  background: #676767;
}

.item {
  width: 100%;
  max-width: 400px;
  height: 100vh;

  @media (width >= 768px) {
    width: 400px;
  }
}

#trigger {
  width: 100%;
  height: 10px;
  background: red;
}
</style>
