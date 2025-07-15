<script setup lang="ts">
import { RouterView } from 'vue-router'
import { IonApp, IonHeader, IonContent, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
</script>

<template>
  <IonApp>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cookery 🧑‍🍳</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RouterView />
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
