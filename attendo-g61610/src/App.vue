<script>
import { useAuthStore } from './stores/authStore.js'
import { mapStores } from 'pinia'
import { get } from './service/listSessionsService.js'

export default {
  computed: {
    ...mapStores(useAuthStore)
  },
  mounted() {
    this.authStore.init()
    get(2)
  }
}
</script>

<style scoped>
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

.nav-link {
  @apply hover:text-zinc-400 transition-colors duration-200 ease-in-out;
}

.active-link {
  @apply underline;
}
</style>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
  <header class="p-8 bg-black color text-white flex justify-center items-center text-4xl font-bold">
    Attendo
  </header>
  <menu class="bg-amber-100 flex justify-between px-4 py-2 items-center border-b-2">
    <div class="flex items-center justify-center gap-2">
      <RouterLink :to="{ name: 'home' }" class="nav-link" active-class="active-link">Accueil</RouterLink> 
      <RouterLink :to="{ name: 'sessions' }" class="nav-link" active-class="active-link">Sessions</RouterLink>
      <RouterLink :to="{ name: 'about' }" class="nav-link" active-class="active-link">A propos</RouterLink>
    </div>
    <button v-if="authStore.currentUser == null" v-on:click="authStore.login()" class="cursor-pointer border-2 border-black p-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
      Connexion avec Google
    </button>
    <button v-else v-on:click="authStore.logout()" class="flex justify-center items-center cursor-pointer transition-colors duration-200 ease-in-out hover:text-gray-400">
      <span class="material-symbols-outlined">logout</span>
    </button>
  </menu>
  <router-view></router-view>
</template>