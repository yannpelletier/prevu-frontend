<template>
  <v-app-bar app flat :value="value" class="core-app-bar grey lighten-3" height="64">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center  ml-1">
      <v-btn v-if="isMobile" icon @click.stop="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <notifications-button/>
        <v-btn v-if="!isMobile" @click="requestLogout" icon>
          <v-icon color="tertiary">
            mdi-logout-variant
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
    // Utilities
    import {mapMutations, mapGetters} from 'vuex';

    import User from '@/store/database/User'

    export default {
        components: {
            NotificationsButton: () => import('@/components/buttons/NotificationsButton'),
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
            title() {
                return this.$route.meta.title;
            }
        },
        props: {
            value: Boolean,
        },
        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
            async requestLogout() {
                this.$store.commit('app/setLoading', true);
                await User.dispatch('logout');
                await this.$router.push('/login');
            },
        },
    }
</script>

<style>
  .core-app-bar {
    width: auto;
  }

  .core-app-bar a {
    text-decoration: none;
  }
</style>

