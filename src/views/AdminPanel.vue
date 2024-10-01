<script setup lang="ts">
import AddNewItemForm from '@/components/AddNewItemForm.vue'
import AdminItemsList from '@/components/AdminItemsList.vue'
</script>

<template>
  <div class="container">
    <AddNewItemForm />
  </div>
  <AdminItemsList />
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 25px;
  margin: 25px auto;
  border: 1px solid #10b981;
  border-radius: 4px;

  @media (width >= 1024px) {
    max-width: 50vw;
  }
}
</style>
