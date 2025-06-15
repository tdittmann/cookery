<script setup lang="ts">
import { RouterView } from 'vue-router'
import { IonApp } from '@ionic/vue'
</script>

<template>
  <ion-app>
    <p></p>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <p></p>

    <RouterView />
  </ion-app>
</template>

<style scoped></style>
