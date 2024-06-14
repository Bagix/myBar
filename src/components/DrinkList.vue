<script setup lang="ts">
import { onMounted } from 'vue'
import { useBarStore } from '../stores/barStore'
import { storeToRefs } from 'pinia'
import CocktailCard from '@/components/CocktailCard.vue'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase'

const store = useBarStore()
const { cocktails } = storeToRefs(store)

onMounted(async () => {
  const q = query(collection(db, 'cocktails'))
  onSnapshot(q, (): any => {
    store.loadData()
  })
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

.item {
  width: 100%;
  max-width: 400px;

  @media (width >= 768px) {
    width: 400px;
  }
}
</style>
