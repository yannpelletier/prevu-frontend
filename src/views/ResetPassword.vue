<template>
  <div class="register-page-wrapper d-flex justify-center">
    <div class="authentication-wrapper one-column">
      <v-card class="form-wrapper" :flat="isMobile" :class="{'mx-5': isMobile}">
        <h2 class="register-title mb-5 text-center">
          Forgot Password?
        </h2>
        <reset-password-form
          :token="token"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

    export default {
        name: "ResetPassword",
        components: {
            ResetPasswordForm,
        },
        props: {
            token: {
                type: String,
                required: true,
            }
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
        },
    }
</script>

<style lang="scss">
  @import "../styles/login-register.scss";
</style>
