<template>
    <v-card :loading="loading" class="mx-auto">
        <v-card-title>
            Change password
        </v-card-title>
        <v-card-text>
            <v-form v-on:submit.prevent="changePassword">
                <span class="success--text">{{responseMessage}}</span>
                <v-text-field :error-messages="errors.oldPassword" type="password" label="Old password" v-model="oldPassword" required></v-text-field>
                <v-text-field :error-messages="errors.password" type="password" label="New password" v-model="password" required></v-text-field>
                <v-text-field :error-messages="errors.passwordConfirmation" type="password" label="Confirm new password" v-model="passwordConfirmation" required></v-text-field>
                <v-btn color="primary" class="mt-4" type="submit">submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
  import User from '@/store/database/User'

  export default {
    name: "ChangePassword",
    data() {
      return {
          oldPassword: "",
          password: "",
          passwordConfirmation: "",
          responseMessage: null,

          loading: false,
          errors: {},
      }
    },
    methods: {
      async changePassword() {
          try{
              this.loading = true;
              await User.dispatch('updateAuthenticated', {
                  oldPassword: this.oldPassword,
                  password: this.password,
                  passwordConfirmation: this.passwordConfirmation
              });
              this.errors = {};
              this.responseMessage = "Password successfully changed";
              this.loading = false;

              this.oldPassword = "";
              this.password = "";
              this.passwordConfirmation = "";
          } catch(error) {
              this.loading = false;
              this.responseMessage = null;
              this.errors = error.errors;
          }
      },
    },
  }
</script>

<style scoped>

</style>
