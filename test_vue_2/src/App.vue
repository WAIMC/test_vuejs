<template>
  <div id="app">
    <Weather msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    Weather
  }
}
</script>

<style>
</style>
