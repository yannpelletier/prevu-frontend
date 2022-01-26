<template>
  <div>
    <v-card :flat="!loading" :loading="loading">
      <v-stepper
        :alt-labels="!showMobileVersion"
        :value="completedSteps ? completedSteps : -1"
        :vertical="showMobileVersion"
      >
        <v-stepper-header :is="!showMobileVersion ? 'v-stepper-header' : 'div'">
          <template v-for="(step, index) in headers">
            <v-stepper-step
              :editable="'clickHandler' in step"
              :complete="completedSteps ? completedSteps > index + 1 : step.completed"
              complete-icon="mdi-check"
              edit-icon="mdi-check"
              @click.prevent="step.clickHandler"
              :step="index + 1"
            >
              <span class="text-center">
              {{step.name}}
              </span>
            </v-stepper-step>
            <v-divider v-if="index !== headers.length - 1 && !showMobileVersion"/>
          </template>
        </v-stepper-header>
        <slot/>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Stepper",

        props: {
            headers: Array,
            /**
             * If completedSteps is null, the headers's completed property will be used.
             */
            completedSteps: {
                type: Number | null,
                default: null
            },
            responsive: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
            showMobileVersion() {
                return this.responsive && this.isMobile;
            }
        },
    }
</script>

<style>
  .theme--light.v-stepper--vertical .v-stepper__content:not(:last-child) {
    border-left: none;
  }
</style>
