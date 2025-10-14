<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CookeryService, type RecipeJson } from '@/services/cookery.service.ts'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { useRoute } from 'vue-router'
import { environment } from '@/environment/environment.ts'
import { IonIcon } from '@ionic/vue'

const route = useRoute()

const loading = ref<boolean>(false)
const recipe = ref<RecipeJson | undefined>()

const loadRecipeById = (id: string | string[]) => {
  loading.value = true
  recipe.value = undefined

  const parsedId = parseInt(<string>id, 10)
  CookeryService.loadRecipeById(parsedId)
    .then((value) => {
      recipe.value = value
    })
    .finally(() => {
      loading.value = false
    })
}

const recipeImage = computed<string>(() => {
  if (recipe.value?.image) {
    return environment.backendUrl + '/images/' + recipe.value.image
  }
  return ''
})

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadRecipeById(newId)
    }
  },
  { immediate: true },
)
</script>

<template>
  <LoadingComponent :loading="loading" />

  <div class="ion-padding" v-if="recipe">
    <h1 class="no-margin-bottom">{{ recipe.title }}</h1>
    <h3 v-if="recipe.author">Von: {{ recipe.author }}</h3>

    <div
      v-if="recipeImage"
      class="recipe-image image main no-margin-bottom"
      :style="{ backgroundImage: `url(${recipeImage})` }"
    />
    <h3 v-if="recipe.portions" class="recipe-portions">
      <ion-icon name="person-circle-outline" size="large"></ion-icon>
      {{ recipe.portions }}
    </h3>

    <h2 class="recipe-ingredients no-margin-bottom">Zutaten</h2>
    <template
      v-for="ingredientCategory in recipe.ingredient_categories"
      :key="ingredientCategory.id"
    >
      <h4 v-if="recipe.ingredient_categories.length > 1" class="no-margin-bottom">
        {{ ingredientCategory.name }}
      </h4>
      <ul class="alt">
        <template v-for="ingredient in ingredientCategory.ingredients" :key="ingredient.id">
          <li>
            {{ ingredient.count === "0" ? "" : ingredient.count }}
            {{ ingredient.shortcut }}
            {{ ingredient.description }}
          </li>
        </template>
      </ul>
    </template>

    <h2 class="no-margin-bottom recipe-description">Zubereitung</h2>
    <p>{{ recipe.description }}</p>
  </div>
</template>

<style scoped>
.no-margin-bottom {
  margin-bottom: 0;
}

.recipe-portions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.recipe-image {
  height: 300px;
  background-size: cover;
  background-position: center;
}

.recipe-ingredients {
  margin-top: 16px;
}

.recipe-description {
  margin-top: 16px;
}
</style>
