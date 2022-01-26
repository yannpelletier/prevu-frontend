<template>

  <v-btn color="#4285F4" class="white--text pl-0 ma-2"
         style="height: 46px;"
         :loading="loading"
         :disabled="loading"
         @click="redirectToGoogleSignIn"
  >
    <img alt="Google sign in button" class="mr-2" :src="require('@/assets/google-sign-in/btn_google_light_normal_ios.svg')"/>
    Sign in with google
  </v-btn>
</template>

<script>
    import api from '@/api';

    export default {
        name: "GoogleSignInBtn",
        data() {
            return {
                loading: false
            }
        },
        props: {
            redirectPath: {
                type: String,
                default: '/google-sign-in-callback'
            }
        },
        methods: {
            async redirectToGoogleSignIn() {
                this.loading = true;
                try {
                    let response = await api.get(`/api/auth/google/link?redirect_path=${this.redirectPath}`);
                    window.location = response.data.link;
                } catch (error) {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
