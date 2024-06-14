export interface ICocktailBaseInfo {
  name: string
  baseAlcohol: string
  description: string
  preparation: string
  ingredients: string
  tools: string
  imageUrl?: string
}

export interface ICocktailFullInfo extends ICocktailBaseInfo {
  id: string
}
