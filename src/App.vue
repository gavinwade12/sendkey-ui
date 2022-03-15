<template>
  <Header />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header/HeaderComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header
  }
})
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
