<template>
  <div id="app">
    <PathDisplayer/>
  </div>
</template>

<script>
import PathDisplayer from './components/PathDisplayer.vue'

export default {
  name: 'App',
  components: {
    PathDisplayer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
