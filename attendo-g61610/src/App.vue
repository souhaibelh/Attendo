<script>

</script>

<template>
  <header class="p-8 bg-black color text-white flex justify-center items-center text-4xl font-bold">
    Attendo
  </header>
  <menu class="bg-amber-100 flex justify-between px-4 py-2 items-center">
    <div class="flex items-center justify-center gap-2">
      <RouterLink :to="{ name: 'home' }" class="nav-link" active-class="active-link">Accueil</RouterLink> 
      <RouterLink :to="{ name: 'sessions' }" class="nav-link" active-class="active-link">Sessions</RouterLink>
      <RouterLink :to="{ name: 'about' }" class="nav-link" active-class="active-link">A propos</RouterLink>
    </div>
    <button class="cursor-pointer border-2 border-black p-2 rounded-md hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
      Connexion avec Google
    </button>
  </menu>
  <router-view></router-view>
</template>

<style scoped>
@import "tailwindcss";
.nav-link {
  @apply hover:text-zinc-400 transition-colors duration-200 ease-in-out;
}

.active-link {
  @apply font-bold;
}
</style>