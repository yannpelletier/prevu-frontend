<template>
  <div>
      <stepper
        :headers="headers"
        responsive
        :loading="loading"
      />
  </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import User from "@/store/database/User";
    import Stepper from "@/components/layouts/Stepper";

    export default {
        name: "SellerProgression",
        components: {Stepper},
        data() {
            return {
                stepNumber: 1,
                headers: [
                    {
                        name: 'Create your store',
                        completed: false,
                        clickHandler: () => {
                            this.$router.push('store-editor')
                        }
                    },
                    {
                        name: 'Add products',
                        completed: false,
                        clickHandler: () => {
                            this.$router.push('products')
                        }
                    },
                    {
                        name: 'Setup payouts',
                        completed: false,
                        clickHandler: () => {
                            this.goToStripeDashboard()
                        }
                    }
                ],
                loading: true
            }
        },
        computed: {
            authenticatedUser() {
                return User.getters('authenticatedUser')();
            },
        },
        async mounted() {
            this.loading = true;
            await User.dispatch('loadSellerProgression');
            this.headers[0].completed = this.authenticatedUser.sellerProgression.createdStore;
            this.headers[1].completed = this.authenticatedUser.sellerProgression.addedProducts;
            this.headers[2].completed = this.authenticatedUser.sellerProgression.completedPayoutsSetup;
            this.loading = false;
        },
        methods: {
            ...mapActions('user', ['createStripeLoginLink']),
            ...mapMutations('app', ['setLoading']),
            async goToStripeDashboard() {
                this.setLoading(true);
                window.location = await User.dispatch('createStripeLoginLink');
            }
        }
    }
</script>

<style scoped>

</style>
