<script setup lang="ts">
import AddNewItemForm from '@/components/AddNewItemForm.vue'
</script>

<template>
  <div class="container">
    <AddNewItemForm />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 16px;
  margin: auto;

  @media (width >= 1024px) {
    max-width: 50vw;
  }
}
</style>
