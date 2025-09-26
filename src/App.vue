<script setup lang="ts">
import { RouterView } from 'vue-router'
import { IonApp, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue'
</script>

<template>
  <IonApp>
    <IonPage>
      <!-- Header -->
      <IonHeader>
        <IonToolbar>
          <header id="header">
            <div class="inner">
              <a href="/" class="logo">
                <span class="symbol"></span>
                <span class="title">🧑‍🍳 Cookery</span>
              </a>
            </div>
          </header>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div id="main">
          <div class="inner">
            <RouterView />
          </div>
        </div>
      </IonContent>
    </IonPage>
  </IonApp>
</template>

<style scoped>
ion-toolbar {
  --background: var(--cookery-color-primary);
  --color: #fff;
}
</style>
