<template>
  <div class="register-page-wrapper d-flex justify-center">
    <div class="authentication-wrapper one-column">
      <v-card class="form-wrapper" :flat="isMobile" :class="{'mx-5': isMobile}">
        <h2 class="register-title mb-5 text-center">
          Login
        </h2>
        <login-form
          show-register-option
        />
      </v-card>
    </div>
  </div>
</template>

<script>
    import LoginForm from "@/components/forms/LoginForm";
    import {mapGetters} from 'vuex';

    export default {
        name: "Login",
        components: {
            LoginForm,
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
        },
        mounted() {
            localStorage.googleSignInRedirect = '/dashboard';
        }
    }
</script>

<style lang="scss" scoped>
  @import "../styles/login-register.scss";
  .container {
    width: 100%;

    .card {
      margin: auto;
    }
  }
</style>
