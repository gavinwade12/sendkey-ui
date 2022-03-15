<template>
  <div class="entries">
    <div class="text-right pr-3 pt-3">
      <router-link to="/entries/create">
        <button class="bg-cyan-600 disabled:bg-cyan-300 rounded p-2 text-white">Create New Entry</button>
      </router-link>
    </div>
    <div
      v-for="entry in entries"
      v-bind:key="entry.id"
    >
      {{ entry.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { EntryModel } from '@/@types/models/EntryModel'
import { GenericResponse } from '@/@types/responses/GenericResponse'
import { PROVIDER_CONSTANTS } from '@/constants/provider.constants'
import { EntriesService } from '@/services/entries.service'
import { defineComponent, inject } from 'vue'
import Toaster from '@meforma/vue-toaster'

export default defineComponent({
  name: 'EntriesView',
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
      loading: false,
      entries: [] as EntryModel[]
    }
  },
  mounted () {
    this.loading = true
    this.entriesService.getEntries().then(entries => {
      if (entries instanceof GenericResponse) {
        this.toast.error(entries.message)
        return
      }

      this.entries = entries
      this.loading = false
    }).catch(error => {
      console.error(error)
      this.toast.error('There was an issue loading your entries.')
    })
  }
})
</script>
