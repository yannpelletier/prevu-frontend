<template>
  <v-col cols="12" md="4" class="d-flex align-center flex-column pr-7">
    <v-img
      :src="require('./img/landing/circular-clock.svg')"
      max-width="50" max-height="50"
    />
    <h2 class="my-5"><slot name="benefit-title">Save time</slot></h2>
    <p class="text-justify">
      <slot name="benefit-description">
      Why waste time on building a site from scratch?
      A photo store automates the selling process and let's you focus on the
      fun part, impressing clients with amazing pictures.
      </slot>
    </p>
  </v-col>
</template>

<script>
    export default {
        name: "Benefit"
    }
</script>

<style scoped>

</style>
