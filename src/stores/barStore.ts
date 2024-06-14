import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICocktailBaseInfo, ICocktailFullInfo } from '@/Interfaces'
import { getCocktails, addCocktail, deleteCocktail } from '../firebase'

export const useBarStore = defineStore('bar', () => {
  const cocktails = ref<ICocktailFullInfo[]>([])
  async function loadData(): Promise<void> {
    cocktails.value = await getCocktails()
  }
  async function addToStore(data: ICocktailBaseInfo, file: File | undefined): Promise<void> {
    await addCocktail(data, file)
  }
  async function deleteFromStore(id: string): Promise<void> {
    await deleteCocktail(id)
  }

  return { cocktails, addToStore, loadData, deleteFromStore }
})
