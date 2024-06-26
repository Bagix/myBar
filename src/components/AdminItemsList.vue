<script setup lang="ts">
import { onMounted } from 'vue'
import { useBarStore } from '../stores/barStore'
import { storeToRefs } from 'pinia'
import TriggerBar from '@/components/TriggerBar.vue'
import AdminItemCard from '@/components/AdminItemCard.vue'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase'

const store = useBarStore()
const { cocktails } = storeToRefs(store)

function loadMoreData(): void {
  store.loadData()
}

onMounted(() => {
  const q = query(collection(db, 'cocktails'))
  onSnapshot(q, (): any => {
    store.loadData()
  })
})
</script>

<template>
  <div class="list-container">
    <div class="wrapper">
      <AdminItemCard v-for="cocktail in cocktails" :key="cocktail.id" :cocktail="cocktail" />
    </div>
    <TriggerBar :rootMargin="200" @intersection="loadMoreData" />
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  margin: 0 auto;
}

.wrapper {
  display: flex;
  flex-flow: column wrap;
  gap: 24px;
  align-items: center;

  @media (width >= 768px) {
    flex-direction: row;
    justify-content: center;
  }
}

.trigger-bar {
  margin-top: 16px;
}
</style>
