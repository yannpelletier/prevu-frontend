<template>
  <v-expand-transition>
    <v-card
      :light="light"
      :dark="dark"
      :width="width"
      v-show="value"
      height="35px"
      color="transparent"
      flat
    >
      <v-row>
        <v-col cols="2">
          <v-icon>
            mdi-chevron-triple-left
          </v-icon>
        </v-col>
        <v-col cols="8" class="text-center">
          Swipe to navigate
        </v-col>
        <v-col cols="2">
          <v-icon>
            mdi-chevron-triple-right
          </v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-expand-transition>
</template>

<script>
    export default {
        name: "SwipeIndicator",
        props: {
            dark: {
                type: Boolean,
                default: false,
            },
            light: {
                type: Boolean,
                default: false,
            },
            width: {
                type: [String, Number],
                default: '100%',
            },
            value: {
                type: Boolean,
                default: true,
            },
        },
    }
</script>

<style scoped>

</style>
