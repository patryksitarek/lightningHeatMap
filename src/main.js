import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
// import * as VueGoogleHeatmap from 'vue-google-heatmap'
import { GOOGLE_MAPS_API_KEY } from './secrets.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'visualization'],
  },
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
