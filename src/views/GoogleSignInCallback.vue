<template>
  <div>
  </div>
</template>

<script>
    import User from '@/store/database/User';

    export default {
        name: "GoogleSignInCallback",
        methods: {
            async requestGoogleSignIn(queryParams) {
                let redirect = '/dashboard';
                try {
                    this.$store.commit('app/setLoading', true);
                    await User.dispatch('googleSignIn', queryParams);
                    await User.dispatch('loadAuthentication');
                    if (localStorage.googleSignInRedirect) {
                        redirect = localStorage.googleSignInRedirect;
                    }
                } catch (e) {
                    redirect = '/login'
                } finally {
                    await this.$router.replace(redirect);
                    this.$store.commit('app/setLoading', false);
                }
            }
        },
        mounted() {
            this.requestGoogleSignIn(this.$route.query);
        }
    }
</script>

<style scoped>

</style>
