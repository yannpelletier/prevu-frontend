<template>
  <div>
    <payouts-onboarding-dialog v-if="payoutsOnboarding"/>
    <v-container fluid>
      <v-row>
        <v-col>
          <seller-progression/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <charts/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <transactions/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
    import User from "@/store/database/User";
    import Charts from "@/views/Dashboard/Charts";
    import SellerProgression from "./Dashboard/SellerProgression";
    import Transactions from "./Dashboard/Transactions";
    import PayoutsOnboardingDialog from "./Dashboard/PayoutsOnboardingDialog";

    export default {
        components: {PayoutsOnboardingDialog, Transactions, SellerProgression, Charts},
        data() {
            return {
                payoutsOnboarding: false
            }
        },
        mounted() {
            if (this.authenticatedUser.firstTimeLogin) {
                this.payoutsOnboarding = true;
                User.dispatch('updateAuthenticated', {
                    firstTimeLogin: false
                });
            }
        },
        computed: {
            authenticatedUser() {
                return User.getters('authenticatedUser')();
            },
        }
    }
</script>
<style lang="scss">

</style>
