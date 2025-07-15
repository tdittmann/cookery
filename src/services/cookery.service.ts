import { environment } from '@/environment/environment.ts'

export interface RecipeJson {
  id: string
  title: string
  author: string
  portions: string
  category_id: string
  description: string
  image: string
  ingredient_categories: IngredientCategoryJson[]
  added: string
}

export interface IngredientCategoryJson {
  id: string
  ingredients: IngredientJson[]
  name: string
  recipe_id: string
}

export interface IngredientJson {
  id: string
  category_id: string
  unit_id: string
  description: string
  count: string
  shortcut: string
}

const loadRecipes = () => {
  return fetch(`${environment.backendUrl}/recipes`, {
    headers: new Headers({
      Authorization:
        'Basic ' + btoa(`${environment.backendAuthUser}:${environment.backendAuthPassword}`),
    }),
  }).then((response) => response.json())
}

export const CookeryService = {
  loadRecipes,
}
