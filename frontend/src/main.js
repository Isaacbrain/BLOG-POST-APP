// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueRouter from 'vue-router'

const app = createApp(App)

// Vue.use(VueRouter)

app.use(router)

app.mount('#app')
