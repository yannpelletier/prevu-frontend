<template>
  <div :class="{ 'has-footer': showFooter, 'px-5': hasHorizontalPadding }">
    <core-app-bar :value="showAppBar"/>
    <core-authentication-bar :value="showAuthenticationBar"/>
    <core-drawer :value="showDrawer" :links="links"/>
    <v-fade-transition mode="out-in">
      <router-view/>
    </v-fade-transition>
    <configure-payouts-alert v-if="authenticatedUser && !authenticatedUser.confirmed"/>
    <core-footer v-if="showFooter"/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex';

  import User from '@/store/database/User';
  import ConfigurePayoutsAlert from "../../components/alerts/ConfigurePayoutsAlert";

  export default {
    name: 'CoreView',
    components: {
      ConfigurePayoutsAlert,
      CoreAppBar: () => import('@/apps/seller/Bar'),
      CoreDrawer: () => import('@/apps/seller/Drawer'),
      CoreFooter: () => import('@/apps/seller/Footer'),
      CoreAuthenticationBar: () => import('@/apps/seller/AuthenticationBar'),
    },
    props: {
      hasFooter: Boolean,
      hasNavBar: Boolean
    },
    computed: {
      ...mapState('app', ['drawer']),
      ...mapGetters('app', ['isMobile']),
      hasHorizontalPadding() {
        return (!this.isMobile && !this.$route.meta.hideDefaultNavigation && !this.$route.meta.hideHorizontalPadding);
      },
      userIsAuthenticated() {
        return User.getters('isAuthenticated');
      },
      showAuthenticationBar() {
        return this.userIsAuthenticated === false && !this.$route.meta.hideDefaultNavigation;
      },
      showAppBar() {
        return this.userIsAuthenticated === true && !this.$route.meta.hideDefaultNavigation;
      },
      showFooter() {
        return !this.$route.meta.hideDefaultFooter;
      },
      showDrawer() {
        if (this.isMobile) {
          return this.drawer;
        } else {
          return this.userIsAuthenticated === true && !this.$route.meta.hideDefaultNavigation;
        }
      },
      links() {
        if (this.isMobile) {
          if (this.userIsAuthenticated) {
            return {
              top: [
                {to: '/dashboard', icon: 'mdi-view-dashboard', text: 'Dashboard'},
                {to: '/store-editor', icon: 'mdi-storefront', text: 'Store Editor'},
                {to: '/products', icon: 'mdi-image', text: 'Products'},
                {to: '/purchases', icon: 'mdi-download', text: 'Purchases'},
                {to: '/settings', icon: 'mdi-settings', text: 'Settings'},
                {action: this.goToStripeDashboard, icon: 'mdi-bank', text: 'Payouts'},
              ],
              bottom: [
                {to: '/watermarks', icon: 'mdi-stamper', text: 'Watermarks'},
                {action: this.showFeedbackDialog, icon: 'mdi-comment-quote', text: 'Feedback'},
                {action: this.requestLogout, icon: 'mdi-logout-variant', text: 'Logout'},
              ]
            };
          } else {
            return {
              top: [
                {to: '/login', icon: 'mdi-login-variant', text: 'Login'},
                {to: '/register', icon: 'mdi-account-plus', text: 'Register'},
              ]
            };
          }
        } else {
          return {
            top: [
              {to: '/dashboard', icon: 'mdi-view-dashboard', text: 'Dashboard'},
              {to: '/store-editor', icon: 'mdi-storefront', text: 'Store Editor'},
              {to: '/products', icon: 'mdi-image', text: 'Products'},
              {to: '/purchases', icon: 'mdi-download', text: 'Purchases'},
              {to: '/settings', icon: 'mdi-settings', text: 'Settings'},
              {action: this.goToStripeDashboard, icon: 'mdi-bank', text: 'Payouts'},
            ],
            bottom: [
              {to: '/watermarks', icon: 'mdi-stamper', text: 'Watermarks'},
              {action: this.showFeedbackDialog, icon: 'mdi-comment-quote', text: 'Feedback'},
            ]
          };
        }
      },
      authenticatedUser() {
        return User.getters('authenticatedUser')();
      },
    },
    methods: {
      ...mapMutations('feedbacks', ['setFeedbackDialog']),
      ...mapMutations('app', ['setLoading']),
      async requestLogout() {
        this.$store.commit('app/setLoading', true);
        await User.dispatch('logout');
        this.$router.push('/login');
      },
      showFeedbackDialog() {
        this.setFeedbackDialog(true);
      },
      async goToStripeDashboard() {
        this.setLoading(true);
        window.location = await User.dispatch('createStripeLoginLink');
      },

      updateTitle() {
        document.title = this.$route.meta.title + ' | Prev-U';
      },
    },
    mounted() {
      this.updateTitle();

      this.$nextTick(() => {
        // The "render-event" tells prerender-spa-plugin that the DOM's rendering is done.
        document.dispatchEvent(new Event('render-event'))
      });
    },
    watch: {
      $route() {
        this.updateTitle();
      }
    }
  }
</script>

<style scoped>
  .has-bar {
    margin-top: 64px;
    transition: all .5s;
  }

  .has-footer {
    margin-bottom: 75px;
    transition: all .5s;
  }

</style>
