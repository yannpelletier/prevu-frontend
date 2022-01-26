<template>
  <v-dialog width="500" v-model="dialog">
    <v-card :loading="loading">
      <v-card-title class="justify-center">
        Welcome to Prev-U!
      </v-card-title>
      <v-card-text>
        <p class="text-center">You have to setup your payouts before you can receive payments.</p>
        <v-layout align-center justify-center column class="mt-5">
          <v-btn color="primary" :href="stripeLoginLink" elevation="3" depressed x-large
                 class="mb-5">
            <v-icon class="mr-2">mdi-bank</v-icon>
            Setup payouts
          </v-btn>
          <div>or</div>
          <v-btn text @click="dialog=false">Skip for now</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
    import User from "@/store/database/User";

    export default {
        name: "PayoutsOnboardingDialog",
        data() {
            return {
                stripeLoginLink: null,
                dialog: true,
                loading: false
            }
        },
        async mounted() {
            this.stripeLoginLink = await User.dispatch('createStripeLoginLink');
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>
