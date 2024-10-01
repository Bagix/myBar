<script setup lang="ts">
import type { ICocktailFullInfo } from '@/Interfaces'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import { ref } from 'vue'
import { useBarStore } from '@/stores/barStore'

const store = useBarStore()
const fileInput = ref()

const props = defineProps<{
  cocktail: ICocktailFullInfo
}>()

const itemModel = ref<ICocktailFullInfo>({
  id: props.cocktail.id,
  name: props.cocktail.name,
  baseAlcohol: props.cocktail.baseAlcohol,
  description: props.cocktail.description,
  preparation: props.cocktail.preparation,
  ingredients: props.cocktail.ingredients,
  tools: props.cocktail.tools,
  imageUrl: props.cocktail.imageUrl
})

function saveChanges(): void {
  store.updateStore(itemModel.value, fileInput.value.files[0])
}

function deleteItem(): void {
  store.deleteFromStore(props.cocktail.id)
}
</script>

<template>
  <div class="item">
    <InputText v-model="itemModel.name" />
    <InputText v-model="itemModel.baseAlcohol" />
    <Textarea v-model="itemModel.description" />
    <div class="image-wrapper">
      <img v-if="cocktail.imageUrl" :src="cocktail.imageUrl" />
      <img v-else src="../assets/drink-icon.svg" class="image-placeholder" />
      <div class="upload-overlay" :class="{ 'is-visible': fileInput?.files[0] !== undefined }">
        <FileUpload
          mode="basic"
          class="btn-upload"
          ref="fileInput"
          accept="image/*"
          :maxFileSize="1000000"
          chooseLabel="Obrazek"
        />
      </div>
    </div>
    <InputText v-model="itemModel.ingredients" />
    <Textarea v-model="itemModel.preparation" />
    <InputText v-model="itemModel.tools" />
    <div class="footer">
      <UIButton type="button" label="Zapisz" class="btn-save" @click="saveChanges" />
      <UIButton
        type="button"
        label="Usuś"
        class="btn-delete"
        severity="danger"
        @click="deleteItem"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border: 4px solid #10b981;
  border-radius: 6px;
}

.image-wrapper {
  position: relative;
  max-width: 300px;
  aspect-ratio: 0.667;
  margin: auto;

  img {
    width: 100%;
    height: auto;
  }

  &:hover > .upload-overlay {
    opacity: 1;
  }
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 40%);
  opacity: 0;
  transition: all 0.25s linear;

  &.is-visible {
    opacity: 1;
  }
}

:deep(.btn-upload) {
  width: 240px;
}

.footer {
  display: flex;
  justify-content: space-between;
}
</style>
