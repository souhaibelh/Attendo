<script>
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
export default {
computed: {
...mapStores(useAuthStore)
}
}
</script>

<template>
  <h2 v-if="authStore.currentUser != null">Bonjour, {{ authStore.currentUser.email }}</h2>
  <p v-else>Bienvenue, veuillez vous connecter pour plus de contenu !</p>
</template>