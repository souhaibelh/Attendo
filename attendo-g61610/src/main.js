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

router.beforeEach((to) => {
    if (!authStore.currentUser && to.path.startsWith('/session')) {
        return { name: 'home' }
    }
})

authStore.init(router)

app.mount('#app')
