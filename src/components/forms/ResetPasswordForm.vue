<template>
  <div v-if="errors.token">
    Your token has expired
  </div>
  <v-form v-on:submit.prevent="resetPassword" v-else>
    <v-text-field :error-messages="errors.password" type="password" label="New password" v-model="password" required></v-text-field>
    <v-text-field :error-messages="errors.passwordConfirmation" type="password" label="Confirm new password" v-model="passwordConfirmation" required></v-text-field>
    <div class="submit-btn-container mt-5">
      <v-btn type="submit" color="primary">
        Reset my password
      </v-btn>
    </div>
  </v-form>
</template>

<script>
    import User from '@/store/database/User'

    export default {
        name: "ResetPasswordForm",
        data() {
            return {
                password: "",
                passwordConfirmation: "",

                errors: {},
            };
        },
        methods: {
            async resetPassword() {
                try {
                    this.$store.commit('app/setLoading', true);
                    await User.dispatch('resetPassword', {
                        token: this.token,
                        password: this.password,
                        passwordConfirmation: this.passwordConfirmation
                    });
                    await User.dispatch('loadAuthentication');
                    await this.$router.push('/dashboard');
                } catch(e) {
                    this.errors = e.errors;
                    this.$store.commit('app/setLoading', false);
                }
            },
        },
        props: {
            token: {
                type: String,
                required: true,
            }
        },

    }
</script>

<style scoped>

</style>
