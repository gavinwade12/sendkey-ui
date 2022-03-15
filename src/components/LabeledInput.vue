<template>
  <div class="labeled-input-wrapper">
    <label
      v-if="label"
      class="font-bold text-sm block text-left"
    >
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      class="bg-white border border-slate-300 focus:focus-visible:outline-none focus:focus-visible:border-slate-600 rounded w-full p-1"
      @input="onChanged"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LabeledInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (_props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onChanged (e: any): void {
      emit('update:modelValue', e.currentTarget.value)
    }

    return {
      onChanged
    }
  }
})
</script>
