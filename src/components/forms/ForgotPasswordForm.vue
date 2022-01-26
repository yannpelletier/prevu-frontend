<template>
  <v-form v-on:submit.prevent="sendPasswordRecoveryEmail" v-if="!sent">
    <span class="error--text">{{error}}</span>
    <v-text-field v-model="email" label="Account Email" type="email" :error-messages="errors.email"/>
    <div class="d-flex justify-center mt-5">
      <v-btn type="submit" color="primary">
        Recover my password
      </v-btn>
    </div>
  </v-form>
  <div v-else>
    Your password recovery email has been successfully sent.
    <br><br>
    If the email doesn't appear shortly in your inbox, make sure to check in your spam folder.
  </div>
</template>

<script>
    import User from '@/store/database/User'

    export default {
        name: "ForgotPasswordForm",
        data() {
            return {
                email: "",

                sent: false,
                error: null,
                errors: {},
            };
        },
        methods: {
            async sendPasswordRecoveryEmail() {
                try {
                    this.$store.commit('app/setLoading', true);
                    await User.dispatch('sendPasswordRecoveryEmail', {
                        email: this.email
                    });
                    this.$store.commit('app/setLoading', false);
                    this.sent = true;
                } catch (e) {
                    this.errors = e.errors || {};
                    this.error = Object.keys(this.errors).length > 0 ? null : e.message;
                    this.$store.commit('app/setLoading', false);
                }
            },
        },

    }
</script>
