<template>
  <v-container>
    <h1 class="ma-4">Page not found...</h1>
    <v-divider />
    <p class="ma-4">The requested URL was not found on this server.</p>
    <router-link to="/" class="ma-4">Go back to the home page</router-link><br>
  </v-container>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>
