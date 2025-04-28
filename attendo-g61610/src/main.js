import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clickOutside } from './directives/click'

import App from './App.vue'
import router from './router'

router.afterEach((to) => {
    
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', clickOutside)

app.mount('#app')