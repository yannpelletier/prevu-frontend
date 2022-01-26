<template>
  <div class="register-page-wrapper d-flex justify-center">
    <div class="authentication-wrapper" :class="isMobile ? 'one-column' : 'two-columns'">
      <div class="register-advantages-wrapper" v-if="!isMobile">
        <router-link to="/">
          <img :draggable="false" alt="PrevU logo" class="register-logo"
               :src="require('@/assets/prev-u_full_300x77.png')">
        </router-link>
        <div class="register-advantage-container">
          <div class="register-advantage-title">
            <v-icon color="primary">mdi-check</v-icon>
            <span class="ml-4">Create a store in minutes</span>
          </div>
          <div class="register-advantage-description">
            Leave a good impression on your clients with a professional store.
          </div>
        </div>
        <div class="register-advantage-container">
          <div class="register-advantage-title">
            <v-icon color="primary">mdi-check</v-icon>
            <span class="ml-4">Protect your content from theft</span>
          </div>
          <div class="register-advantage-description">
            Use customizable preview filters to avoid fraudulent
            copy of your work.
          </div>
        </div>
        <div class="register-advantage-container">
          <div class="register-advantage-title">
            <v-icon color="primary">mdi-check</v-icon>
            <span class="ml-4">Simple payouts</span>
          </div>
          <div class="register-advantage-description">
            Receive your payouts directly in your bank account without having to think about it.
          </div>
        </div>
      </div>
      <v-card class="form-wrapper" :flat="isMobile" :class="isMobile ? 'mx-5': ''">
        <h2 class="register-title mb-5 text-center">
          Open your Prev-U store
        </h2>
        <register-form
          call-to-action="Create my store"
          show-login-option
        />
      </v-card>

    </div>
  </div>
</template>

<script>
    import RegisterForm from "@/components/forms/RegisterForm";
    import {mapGetters} from 'vuex';

    export default {
        name: 'Register',
        components: {
            RegisterForm,
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
        },
    };
</script>

<style lang="scss">
  @import "../styles/login-register.scss";

  .register-logo {
    height: 35px;
    margin: 20px 0 0 40px;
  }

  .register-advantage-container {
    margin: 32px 0;
  }

  .register-advantage-title {
    margin: 10px 0 10px 0;
    font-size: 14pt;
    font-weight: 400;
  }

  .register-advantage-description {
    margin-left: 40px;
    font-weight: 300;
    font-size: 12pt;
  }
</style>
