<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/vue'
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
        <IonCol
          size="12"
          size-lg="3"
          size-md="4"
          size-sm="6"
          v-for="recipe in recipes"
          v-bind:key="recipe.id"
        >
          <IonCard class="ion-margin-vertical">
            <div
              class="recipe-background"
              :style="{ backgroundImage: `url(${environment.backendUrl}/images/${recipe.image})` }"
            />

            <IonCardHeader>
              <IonCardTitle>
                {{ recipe.title }}
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>
</template>

<style scoped>
.recipe-background {
  background-size: cover;
  background-position: center;
  height: 150px;
}
</style>
