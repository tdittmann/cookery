<script setup lang="ts">
import { RouterView } from 'vue-router'
import { IonApp, IonPage } from '@ionic/vue'
</script>

<template>
  <ion-app>
    <IonPage>
      <p>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </p>
      <RouterView />
    </IonPage>
  </ion-app>
</template>

<style scoped></style>
