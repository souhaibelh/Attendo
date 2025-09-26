import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { clickOutside } from './directives/click'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore()

app.use(router)
// directive used for SearchableTextInput component
app.directive('click-outside', clickOutside)

authStore.init(router)

router.beforeEach(async (to, from, next) => {
    // a chaque fois que on va dans la prochaine route on regarde si il faut etre authentifie
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = await authStore.getUser()
        // si pas authentifie on va dans la route nomme home sinon on va dans la route
        if (!user) {
            next({ name: 'home' })
        } else {
            next();
        }
    } else {
      // si la route ne demande pas de authentification on y va seulement
      next();
    }
  });

app.mount('#app')
