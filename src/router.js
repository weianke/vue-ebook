import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index'),
      children: [
        {
          path: ':filename',
          component: () => import('./components/ebook/EbookReader')
        }
      ]
    }
  ]
})
