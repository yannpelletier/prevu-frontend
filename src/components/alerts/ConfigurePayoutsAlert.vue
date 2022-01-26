<template>
  <v-layout align-center justify-center>
    <v-alert type="warning" class="content" dismissible style="color: #EEE;position: fixed; bottom: 0; z-index: 10">
      You need to <a :href="stripeLoginLink" :is="loading ? 'span':'a'" style="color: white">configure your payouts</a> in order to process transactions.
    </v-alert>
  </v-layout>
</template>

<script>
    import User from "@/store/database/User";
    export default {
        name: "ConfigurePayoutsAlert",

        data() {
            return {
                stripeLoginLink: "",
                loading:true
            }
        },

        async mounted() {
            this.stripeLoginLink = await User.dispatch('createStripeLoginLink');
            this.loading = false;
        }
    }
</script>
