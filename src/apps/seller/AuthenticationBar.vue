<template>
  <v-app-bar app v-if="isMobile" :value="value" class="core-app-bar grey lighten-3" flat height="64">
    <v-btn icon @click.stop="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <router-link to="/">
      <v-img :src="require('@/assets/prev-u_full_300x77.png')" height="30" position="" contain/>
    </router-link>
  </v-app-bar>
  <v-app-bar app v-else :value="value">
    <router-link to="/">
      <v-img :src="require('@/assets/prev-u_full_300x77.png')" width="150" contain position="left"/>
    </router-link>
    <v-spacer/>
    <v-btn to="/login" class="mr-2" outlined color="primary">
      Login
    </v-btn>
    <v-btn to="/register" depressed color="primary">
      Register
    </v-btn>
  </v-app-bar>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'AuthenticationBar',
    props: {
      value: Boolean,
    },
    computed: {
      ...mapGetters('app', ['isMobile']),
    },
    methods: {
      ...mapActions(['logout']),
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    }
  };
</script>

<style scoped>
  .login-btn {
    border: 2px deepskyblue solid;
  }
</style>
