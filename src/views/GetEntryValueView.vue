<template>
  <div class="entry m-auto min-w-fit max-w-xl w-full">
    <h1 class="text-lg font-bold mt-5 mb-3">Get Entry Value</h1>
    <div class="my-3">
      <LabeledInput
        v-model="secret"
        :disabled="entry === undefined"
        label="Secret"
        type="password"
      />
    </div>
    <div v-if="!loading && entry === undefined" class="text-red-500">The entry has expired or already been claimed.</div>
    <button
      :disabled="!formValid"
      class="bg-cyan-600 disabled:bg-cyan-300 rounded p-2 text-white mt-2"
      @click="getValue"
    >
      Get Value
    </button>
    <div
      v-if="value !== '' || valueObj !== null"
      class="mt-5"
    >
      <h2 class="text-md font-bold">
        Value
      </h2>
      <p class="mb-3 font-light text-slate-500 text-sm">
        Note: Please save this somewhere safe. Once you leave this page, the value will no longer be available.
      </p>
      <div
        v-if="value !== ''"
      >
        <span>{{ value }}</span>
      </div>
      <div
        v-if="valueObj !== null"
      >
        <div
          v-for="key in Object.keys(valueObj)"
          v-bind:key="key"
        >
          {{ key }}: {{ valueObj[key] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PROVIDER_CONSTANTS } from '@/constants/provider.constants'
import { EntriesService } from '@/services/entries.service'
import { defineComponent, inject } from 'vue'
import LabeledInput from '@/components/LabeledInput.vue'
import Toaster from '@meforma/vue-toaster'
import { EntryModel } from '@/@types/models/EntryModel'
import { GenericResponse } from '@/@types/responses/GenericResponse'

export default defineComponent({
  name: 'GetEntryValueView',
  props: {
    id: {
      type: String,
      required: true
    },
    nonce: {
      type: String,
      required: true
    }
  },
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
      secret: '',
      value: '',
      valueObj: null,
      loading: true,
      entry: undefined as EntryModel | undefined
    }
  },
  mounted () {
    this.loading = true

    this.entriesService.getEntry(this.id, this.nonce).then(res => {
      this.loading = false

      const entry = res as EntryModel
      if (entry?.id) {
        this.entry = entry
        return
      }

      this.entry = undefined

      res = res as GenericResponse
      if (res?.message) {
        this.toast.error(res.message)
      }
    })
  },
  computed: {
    formValid (): boolean {
      return this.entry !== undefined && this.secret !== ''
    }
  },
  methods: {
    getValue () {
      this.entriesService.getEntryValue(this.id, this.nonce, this.secret).then(res => {
        if (!res.success) {
          if (res.expired) {
            this.entry = undefined
          }
          res.errors.forEach(e => this.toast.error(e))
          return
        }

        try {
          this.valueObj = JSON.parse(res.value ?? '')
        } catch {
          this.value = res.value ?? ''
        }
        this.entry = undefined
        console.log(res)
      })
    }
  }
})
</script>
