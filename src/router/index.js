import Vue from 'vue'
import Router from 'vue-router'

import birdsort from '@/components/birdsort'
import birdsound from '@/components/birdsound'
import page from '@/components/page'
import ostrich from '@/components/birds/ostrich'
import Login from '@/components/views/TheLogin'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },   
    {
      path: '/page',
      name: 'page',
      component: page,
      children: [
        {
          path: '/ostrich',
          name: 'ostrich',
          component: ostrich  
        },
        {
          path: '/birdsound',
          name: 'birdsound',
          component: birdsound  
        },
        {
          path: '/birdsort',
          name: 'birdsort',
          component: birdsort
        }
      ]
    }
  ]
})
