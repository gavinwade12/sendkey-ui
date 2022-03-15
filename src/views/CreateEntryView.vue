<template>
  <div class="entry m-auto min-w-fit max-w-xl w-full">
    <h1 class="text-lg font-bold mt-5 mb-3">Create New Entry</h1>
    <div class="my-3">
      <LabeledInput
        v-model="name"
        class="mb-3.5"
        label="Name"
        type="text"
      />
      <LabeledInput
        v-model="sendToEmail"
        class="mb-3.5"
        label="Send To Email"
        type="email"
      />
      <LabeledInput
        v-model="expiresInMins"
        class="mb-3.5"
        label="Expires In (minutes)"
        type="number"
      />
      <LabeledInput
        v-model="secret"
        class="mb-3.5"
        label="Secret"
        type="password"
      />
      <LabeledInput
        v-model="value"
        class="mb-3.5"
        label="Value"
        type="text"
      />
    </div>
    <button
      :disabled="!formValid"
      class="bg-cyan-600 disabled:bg-cyan-300 rounded p-2 text-white"
      @click="send"
    >
      Send
    </button>
  </div>
</template>

<script lang="ts">
import { PROVIDER_CONSTANTS } from '@/constants/provider.constants'
import { EntriesService } from '@/services/entries.service'
import { defineComponent, inject } from 'vue'
import LabeledInput from '@/components/LabeledInput.vue'
import Toaster from '@meforma/vue-toaster'
import { CreateEntryRequest } from '@/@types/requests/CreateEntryRequest'

export default defineComponent({
  name: 'CreateEntryView',
  components: {
    LabeledInput
  },
  setup () {
    const entriesService = inject(PROVIDER_CONSTANTS.entriesService) as EntriesService
    const toast = inject(PROVIDER_CONSTANTS.toaster) as Toaster
    return {
      entriesService,
      toast
    }
  },
  data () {
    return {
      name: '',
      sendToEmail: '',
      expiresInMins: '60',
      secret: '',
      value: ''
    }
  },
  computed: {
    formValid (): boolean {
      return this.name !== '' &&
        this.sendToEmail !== '' &&
        parseInt(this.expiresInMins) > 0 &&
        this.secret !== '' &&
        this.value !== '' &&
        (/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.sendToEmail))
    }
  },
  methods: {
    send () {
      const req = new CreateEntryRequest(this.name, this.sendToEmail, this.value, parseInt(this.expiresInMins), this.secret)
      this.entriesService.createEntry(req).then(res => {
        if (!res.success) {
          res.errors.forEach(e => this.toast.error(e))
          return
        }

        this.$router.push('/entries')
      })
    }
  }
})
</script>
