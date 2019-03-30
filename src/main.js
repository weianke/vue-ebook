import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'
import '@/assets/fonts/daysOne.css'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: {
    'zh-CN': require('./lang/zh'), // 中文语言包
    'en-US': require('./lang/en') // 英文语言包
  }
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
