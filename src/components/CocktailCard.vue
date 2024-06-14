<script setup lang="ts">
import type { ICocktailFullInfo } from '@/Interfaces'
import { ref } from 'vue'

const props = defineProps<{
  cocktail: ICocktailFullInfo
}>()

const isOpen = ref<boolean>()
const ingredients = props.cocktail.ingredients.split(',')

function toggleCard(): void {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="card" :class="{ 'is-open': isOpen }">
    <div class="header">
      <p class="name">{{ cocktail.name }}</p>
      <i class="pi pi-angle-down toggle" @click="toggleCard" />
    </div>
    <p class="description">{{ cocktail.description }}</p>
    <div class="accordion">
      <div v-if="cocktail.imageUrl" class="image-wrapper">
        <img :src="cocktail.imageUrl" />
      </div>
      <p class="tools">{{ cocktail.tools }}</p>
      <ul class="ingredients">
        <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <p class="preparation">{{ cocktail.preparation }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$icon-size: 25px;

.card {
  width: 100%;
  max-width: 500px;
  padding: 16px;
  background-color: #2a2a2a;
  border-radius: 5px;

  @media (width >= 768px) {
    padding: 16px 24px;
  }

  &.is-open {
    .accordion {
      max-height: 1000px;
    }

    .toggle {
      transform: rotate(180deg);
    }
  }
}

.name {
  padding: 0 $icon-size + 10px;
  margin-bottom: 5px;
  font-size: 24px;
  text-align: center;
}

.description {
  font-size: 16px;
  text-align: center;
}

.accordion {
  max-height: 0;
  overflow: hidden;
  transition: all 0.25s linear;
}

.header {
  position: relative;
}

.toggle {
  position: absolute;
  top: 7px;
  right: 7px;
  font-size: $icon-size;
  cursor: pointer;
  transition: all 0.25s linear;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  img {
    width: 100%;
    height: auto;
  }
}

.tools {
  margin-top: 10px;
  text-align: center;
}

.ingredients {
  padding: 0;
  margin: 16px 0;
  text-align: center;
  list-style: none;

  li {
    padding: 5px 0;
    border-bottom: 1px solid #777;
  }
}

.preparation {
  text-align: center;
}
</style>
