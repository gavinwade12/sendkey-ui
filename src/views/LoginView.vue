<template>
  <div class="login flex h-full">
    <div class="text-center m-auto min-w-fit max-w-xl w-full">
      <LabeledInput
        v-model="email"
        class="mb-3.5"
        label="Email"
        type="text"
      />
      <LabeledInput
        v-model="password"
        class="mb-3.5"
        label="Password"
        type="password"
      />
      <button
        :disabled="!formValid"
        class="bg-cyan-600 disabled:bg-cyan-300 rounded p-2"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent, inject } from 'vue'
import { UsersService } from '../services/users.service'
import { PROVIDER_CONSTANTS } from '@/constants/provider.constants'
import LabeledInput from '@/components/LabeledInput.vue'
import Toaster from '@meforma/vue-toaster'
import router from '@/router'

export default defineComponent({
  name: 'LoginView',
  components: {
    LabeledInput
  },
  setup () {
    const toast = inject(PROVIDER_CONSTANTS.toaster) as Toaster
    const usersService = inject(PROVIDER_CONSTANTS.usersService) as UsersService
    return {
      toast,
      usersService
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    formValid (): boolean {
      return this.email !== '' &&
        this.password !== '' &&
        (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.email))
    }
  },
  methods: {
    login (): void {
      this.usersService.login(this.email, this.password).then(res => {
        if (!res.success) {
          res.errors?.forEach(e => this.toast.error(e))
          return null
        }

        router.push('/entries')
      }).catch(error => {
        this.toast.error(error)
      })
    }
  }
})
</script>
