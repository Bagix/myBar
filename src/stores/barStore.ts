import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICocktailBaseInfo, ICocktailFullInfo } from '@/Interfaces'
import { getCocktails, addCocktail, deleteCocktail } from '../firebase'

export const useBarStore = defineStore('bar', () => {
  const cocktails = ref<ICocktailFullInfo[]>([])
  const isLoading = ref<boolean>(true)

  async function loadData(): Promise<void> {
    isLoading.value = true

    try {
      const newItems = await getCocktails()

      if (!newItems.length) {
        return
      }

      cocktails.value = [...cocktails.value, ...newItems]
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }

  async function addToStore(data: ICocktailBaseInfo, file: File | undefined): Promise<void> {
    await addCocktail(data, file)
  }

  async function deleteFromStore(id: string): Promise<void> {
    await deleteCocktail(id)
  }

  return { cocktails, isLoading, addToStore, loadData, deleteFromStore }
})
