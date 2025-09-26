<script setup lang="ts">
import { IonGrid, IonRow } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { CookeryService, type RecipeJson } from '@/services/cookery.service.ts'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { environment } from '@/environment/environment.ts'

const loading = ref<boolean>(false)
const recipes = ref<RecipeJson[]>([])

onMounted(() => {
  loading.value = true
  CookeryService.loadRecipes()
    .then((value) => {
      recipes.value = value
    })
    .finally(() => (loading.value = false))
})
</script>

<template>
  <LoadingComponent :loading="loading" />

  <div class="ion-padding">
    <IonGrid>
      <IonRow>
        <section class="tiles">
          <article
            class="style3"
            v-for="recipe in recipes"
            v-bind:key="recipe.id"
            style="aspect-ratio: 1 / 1"
          >
            <div
              class="recipe-background image"
              :style="{
                backgroundImage: `url(${environment.backendUrl}/images/${recipe.image})`,
              }"
            />
            <a href="/">
              <h2>{{ recipe.title }}</h2>
            </a>
          </article>
        </section>
      </IonRow>
    </IonGrid>
  </div>
</template>

<style scoped>
.recipe-background {
  background-size: cover;
  background-position: center;
  height: 100%;
}
</style>
