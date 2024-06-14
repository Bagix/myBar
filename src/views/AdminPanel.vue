<script setup lang="ts">
import { ref } from 'vue'
import { deleteCocktail } from '../firebase'
import { useBarStore } from '@/stores/barStore'
import { storeToRefs } from 'pinia'
import type { ICocktailBaseInfo } from '@/Interfaces'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'

const store = useBarStore()
const { cocktails } = storeToRefs(store)
const fileInput = ref()

const formModel = ref<ICocktailBaseInfo>({
  name: '',
  baseAlcohol: '',
  description: '',
  preparation: '',
  ingredients: '',
  tools: ''
})

async function handelSubmit(): Promise<void> {
  await store.addToStore(formModel.value, fileInput.value.files[0])
  formModel.value = {
    name: '',
    baseAlcohol: '',
    description: '',
    preparation: '',
    ingredients: '',
    tools: ''
  }
}

async function removeCocktail(id: string): Promise<void> {
  await store.deleteFromStore(id)
}
</script>

<template>
  <form @submit.prevent="handelSubmit" class="form">
    <div class="input-wrapper">
      <InputText type="text" v-model="formModel.name" required placeholder="nazwa" />
      <InputText
        type="text"
        v-model="formModel.baseAlcohol"
        required
        placeholder="bazowy alkohol"
      />
      <InputText
        type="text"
        v-model="formModel.ingredients"
        required
        placeholder="reszta składników"
      />
      <InputText type="text" v-model="formModel.tools" required placeholder="narzedzia" />
      <Textarea v-model="formModel.description" required placeholder="opis" />
      <Textarea v-model="formModel.preparation" required placeholder="przygotowanie" />
    </div>
    <div class="btn-wrapper">
      <FileUpload
        mode="basic"
        class="btn-upload"
        ref="fileInput"
        accept="image/*"
        :maxFileSize="1000000"
        chooseLabel="Obrazek"
      />
      <UIButton type="submit" label="Zapisz" class="btn-submit" severity="info" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
$gap-space: 24px;

.img {
  display: block;
  width: 500px;
  height: auto;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $gap-space;

  @media (width >= 768px) {
    flex-flow: row wrap;
  }
}

input,
textarea {
  width: 100%;

  @media (width >= 768px) {
    width: calc(50% - $gap-space / 2);
  }
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: $gap-space * 3;
  margin-top: $gap-space;
}

:deep(.btn-upload) {
  justify-content: center;
  width: 100%;

  .p-button-label {
    flex: unset;
  }
}

.btn-submit {
  padding: 0.5em 1em;
  font-size: 24px;
}
</style>
