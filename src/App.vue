<template>
  <v-app>
    <broadcaster/>
    <confirm/>
    <alert/>
    <error/>
    <v-overlay z-index="1000" :value="isLoading">
      <v-progress-circular indeterminate size="64"/>
    </v-overlay>
    <feedback/>
    <v-content class="grey lighten-3">
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',
        components: {
            Feedback: () => import('@/components/dialogs/Feedback'),
            Confirm: () => import('@/components/dialogs/Confirm'),
            Error: () => import('@/components/dialogs/Error'),
            Alert: () => import('@/components/snackbar/AlertSnackbar'),
            Broadcaster: () => import('@/apps/Broadcaster'),
        },
        computed: {
            ...mapGetters('app', ['isLoading']),
        },
        methods: {
            track() {
                this.$ga.page('/dashboard')
            }
        }
    };
</script>
