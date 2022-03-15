import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const title = (name: string): string => `SendKey - ${name}`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Unmatched Route',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: title('Not Found')
    }
  },
  {
    path: '/login:returnUrl?',
    name: 'Login',
    component: LoginView,
    meta: {
      title: title('Login')
    },
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: title('Register')
    }
  },
  {
    path: '/entries',
    name: 'entries',
    component: () => import('../views/EntriesView.vue'),
    meta: {
      title: title('Entries')
    }
  },
  {
    path: '/entries/create',
    name: 'createEntry',
    component: () => import('../views/CreateEntryView.vue'),
    meta: {
      title: title('Create Entry')
    }
  },
  {
    path: '/entries/:id',
    name: 'getEntryValue',
    component: () => import('../views/GetEntryValueView.vue'),
    meta: {
      title: title('Get Entry Value')
    },
    props: route => ({
      id: route.params.id,
      nonce: route.query.nonce
    })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
