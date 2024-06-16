<script setup lang="ts">
import type { ICocktailFullInfo } from '@/Interfaces'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  cocktail: ICocktailFullInfo
}>()

const isOpen = ref<boolean>(false)
const cardWRapper = ref<HTMLElement>()
const ingredients = props.cocktail.ingredients.split(',')
const hasScroll = ref<boolean>(false)
const isScrollEnd = ref<boolean>(false)

function toggleCard(): void {
  isOpen.value = !isOpen.value
}

function handleScroll(): void {
  const cardWRapperElement = cardWRapper.value!
  isScrollEnd.value =
    cardWRapperElement.clientHeight + cardWRapperElement.scrollTop ===
    cardWRapperElement.scrollHeight
}

function handleResize(): void {
  const cardWRapperElement = cardWRapper.value!
  hasScroll.value = cardWRapperElement.scrollHeight > cardWRapperElement.clientHeight
}

onMounted(() => {
  const cardWRapperElement = cardWRapper.value

  if (!cardWRapperElement) {
    return
  }

  hasScroll.value = cardWRapperElement.scrollHeight > cardWRapperElement.clientHeight

  const resizeObserver = new ResizeObserver(() => handleResize())
  resizeObserver.observe(cardWRapperElement)
  cardWRapperElement.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="card"
    :class="{ 'is-open': isOpen, 'has-scroll': hasScroll, 'is-scroll-end': isScrollEnd }"
  >
    <div ref="cardWRapper" class="card-wrapper">
      <div class="header">
        <p class="name">{{ cocktail.name }}</p>
        <i class="pi pi-angle-down toggle" @click="toggleCard" />
      </div>
      <p class="description">{{ cocktail.description }}</p>
      <div class="accordion">
        <div class="image-wrapper">
          <img v-if="cocktail.imageUrl" :src="cocktail.imageUrl" />
          <div v-else class="image-placeholder" />
        </div>
        <p class="tools">{{ cocktail.tools }}</p>
        <ul class="ingredients">
          <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <p class="preparation">{{ cocktail.preparation }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$icon-size: 25px;

.card {
  width: 100%;
  background-color: var(--vt-c-black-soft);
  border-radius: 5px;

  @media (width >= 1024px) {
    width: 15%;
    min-width: 350px;
    height: 55vh;
    overflow: hidden;
  }

  @media (width >= 1366px) {
    height: 70vh;
  }

  @media (width > 1920px) {
    height: 75vh;
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

.card-wrapper {
  height: 100%;
  padding: 16px;

  @media (width >= 1024px) {
    padding: 24px;
    overflow-y: auto;
  }
}

.has-scroll {
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    content: '';
    background-image: linear-gradient(
      0deg,
      rgb(200 200 200 / 30%) 0%,
      rgb(200 200 200 / 10%) 50%,
      transparent 100%
    );
    transition: opacity 0.25s linear;
  }

  &:not(.is-scroll-end)::after {
    opacity: 1;
  }

  &.is-scroll-end::after {
    opacity: 0;
  }

  .card-wrapper {
    @media (width >= 1024px) {
      margin-right: -17px; // hide scroll
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

  @media (width >= 1024px) {
    max-height: unset;
  }
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

  @media (width >= 1024px) {
    display: none;
  }
}

.image-wrapper {
  display: flex;
  justify-content: center;
  aspect-ratio: 0.667;
  margin: auto;
  margin-top: 10px;

  .image-placeholder {
    display: none;

    @media (width >= 1024px) {
      display: block;
      width: 100%;
      height: auto;
      background: var(--vt-c-black-mute);
    }
  }

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
  width: 80%;
  padding: 0;
  margin: 16px auto;
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
