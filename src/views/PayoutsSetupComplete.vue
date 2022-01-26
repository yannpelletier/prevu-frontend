<template>
  <div>
    <v-row justify="center">
      <v-dialog persistent v-model="dialog" width="500">
        <v-card :loading="loading">
          <template v-if="loading">
            <v-card-title>Setting up your payouts...</v-card-title>
            <v-card-text>Loading...</v-card-text>
          </template>
          <template v-else>
            <template v-if="success">
              <v-card-title>You're all set!</v-card-title>
              <v-card-text>You will now receive your payouts with Stripe.</v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" to="/dashboard">Go to your dashboard</v-btn>
              </v-card-actions>
            </template>
            <template v-else>
              <v-card-title>Oops!</v-card-title>
              <v-card-text>Something went wrong. Please try again later.</v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" to="/dashboard">Go to your dashboard</v-btn>
              </v-card-actions>
            </template>
          </template>
          <v-card-title v-else>You're all set!</v-card-title>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
    import api from '@/api';
    import User from '@/store/database/User';

    export default {
        name: "PayoutsSetupComplete",
        data() {
            return {
                success: false,
                loading: true,
                dialog: true
            }
        },
        methods: {
            async linkStripeAccount(stripeAuthorizationCode, csrfToken = '') {
                try {
                    await api.post('/api/users/me/stripe-account', {
                        stripe_authorization_code: stripeAuthorizationCode,
                        csrf_token: csrfToken
                    });
                    await User.dispatch('loadAuthentication');
                    this.success = true;
                } catch (error) {
                    this.success = false;
                }
                this.loading = false;
            }
        },
        mounted() {
            this.linkStripeAccount(this.$route.query.code, this.$route.query.state);
        }
    }
</script>

<style scoped>

</style>
