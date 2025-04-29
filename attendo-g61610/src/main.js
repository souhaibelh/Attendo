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
app.directive('click-outside', clickOutside)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authStore.currentUser) {
        next({ name: 'home' });
      } else {
        next();
      }
    } else {
      next();
    }
  });

authStore.init(router)

app.mount('#app')
