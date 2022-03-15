import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from '@meforma/vue-toaster'
import { UsersService } from './services/users.service'
import { PROVIDER_CONSTANTS } from './constants/provider.constants'
import { EntriesService } from './services/entries.service'

const app = createApp(App)

app.use(Toaster, {
  position: 'top-right'
})

const usersService = new UsersService()
const entriesService = new EntriesService(usersService)

app.provide(PROVIDER_CONSTANTS.usersService, usersService)
app.provide(PROVIDER_CONSTANTS.entriesService, entriesService)

app.provide(PROVIDER_CONSTANTS.toaster, app.config.globalProperties.$toast)

router.beforeEach((to, _from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  const isAuthenticated = accessToken !== null && accessToken !== '' && refreshToken != null && refreshToken !== ''

  if (to.matched.some(x => !x.meta.requiresLogin || isAuthenticated)) {
    document.title = to.meta.title as string
    next()
  } else {
    next('/')
  }
})

app.use(router).mount('#app')
