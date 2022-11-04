<template>
  <div class="container">
    <NavBar />
    <ContentPage />
  </div>
</template>

<script>
import NavBar from './NavBar'
import ContentPage from './ContentPage.vue'
export default {
  name: 'MainPage',
  components: {
    NavBar,
    ContentPage
  },
  props: {
    msg: String
  },
  mounted() {
    this.$store.dispatch('GET_DATA_API')
  },
}
</script>

<style lang="scss">
.container {
  max-width: 95%;
  width: 100%;
  margin: 0 auto;
}
</style>
