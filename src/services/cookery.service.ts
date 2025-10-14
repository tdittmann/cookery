import { environment } from '@/environment/environment.ts'

export interface RecipeJson {
  id: string
  title: string
  author: string
  portions: string
  portions_unit: string
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
  ingredient_id: string
  category_id: string
  unit_id: string
  description: string
  count: string
  shortcut: string
}
export interface Recipe {
  id: number
  title: string
  author: string
  portions: number
  portions_unit: string
  description: string
  image: string
  ingredient_categories: IngredientCategory[]
  added: Date
}

export interface IngredientCategory {
  id: number
  ingredients: Ingredient[]
  name: string
}

export interface Ingredient {
  id: number
  description: string
  count: number
  shortcutUnit: string
}

const toRecipe = (json: RecipeJson): Recipe => {
  return {
    id: parseInt(json.id, 10),
    title: json.title,
    author: json.author,
    portions: parseInt(json.portions, 10),
    portions_unit: json.portions_unit,
    description: json.description,
    image: json.image,
    ingredient_categories: json.ingredient_categories.map(toIngredientCategory),
    added: new Date(json.added),
  }
}

const toIngredientCategory = (json: IngredientCategoryJson): IngredientCategory => {
  return {
    id: parseInt(json.id, 10),
    ingredients: json.ingredients.map(toIngredient),
    name: json.name,
  }
}

const toIngredient = (json: IngredientJson): Ingredient => {
  return {
    id: parseInt(json.ingredient_id, 10),
    description: json.description,
    count: parseInt(json.count, 10),
    shortcutUnit: json.shortcut,
  }
}

const loadRecipes = (): Promise<Recipe[]> => {
  return fetch(`${environment.backendUrl}/recipes`, {
    headers: new Headers({
      Authorization:
        'Basic ' + btoa(`${environment.backendAuthUser}:${environment.backendAuthPassword}`),
    }),
  })
    .then((response) => response.json())
    .then((response) => response.map(toRecipe))
}

const loadRecipeById = (id: number): Promise<Recipe> => {
  return fetch(`${environment.backendUrl}/recipes?id=${id}`, {
    headers: new Headers({
      Authorization:
        'Basic ' + btoa(`${environment.backendAuthUser}:${environment.backendAuthPassword}`),
    }),
  })
    .then((response) => response.json())
    .then((response) => toRecipe(response))
}

export const CookeryService = {
  loadRecipes,
  loadRecipeById,
}
