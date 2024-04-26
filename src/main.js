import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

createApp(App).use(store).use(router).mount('#app')
window.Kakao.init('d50d498bfc2a28d23de1763dc309a0b0'); // JavaScript 키