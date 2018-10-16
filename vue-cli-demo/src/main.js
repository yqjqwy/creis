// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Vue from 'vue/dist/vue.common.js'
import App from './App'
import router from './router'

import fullcalendar from 'vue-fullcalendar'

Vue.use(fullcalendar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
