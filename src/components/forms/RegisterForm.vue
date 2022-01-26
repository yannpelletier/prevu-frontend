<template>
  <v-form v-on:submit.prevent="requestRegister" class="register-form">
    <template v-if="!noGoogleSignIn">
      <div
        style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <google-sign-in-btn/>
      </div>
    </template>
    <v-text-field :error-messages="errors.email" v-model="email" label="Email" type="email"/>
    <v-text-field :error-messages="errors.password" v-model="password" label="Password"
                  type="password"/>
    <v-checkbox
      class="add-to-newsletter"
      v-model="addToNewsletter"
      label="I agree to receive news, offers and product updates"
    />
    <v-checkbox
      class="agrees-to-terms"
      :error-messages="errors.agreesToTerms"
      v-model="agreesToTerms"
    >
      <template v-slot:label>
        I agree to&nbsp;<router-link to="/terms-of-use">Prev-U's terms of Use</router-link>
      </template>
    </v-checkbox>
    <div class="d-flex justify-center">
      <v-btn v-if="!noSubmitButton" type="submit" color="primary" class="submit-btn">
        {{callToAction}}
      </v-btn>
    </div>
    <template v-if="showLoginOption">
      <v-divider class="mt-8"/>
      <p class="mt-5 mb-0 text-center">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </template>
  </v-form>
</template>

<script>
    import api from '@/api'
    import GoogleSignInBtn from "../buttons/GoogleSignInBtn";
    import User from '@/store/database/User';

    export default {
        name: "RegisterForm",
        components: {GoogleSignInBtn},
        props: {
            noSubmitButton: {
                type: Boolean,
                default: false
            },
            noGoogleSignIn: {
                type: Boolean,
                default: false
            },
            callToAction: {
                type: String,
                default: 'Register'
            },
            showLoginOption: {
                type: Boolean,
                default: false
            },
            redirect: {
                type: String,
                default: "/payouts-onboarding"
            }
        },
        data() {
            return {
                stepTab: 0,
                email: "",
                password: "",
                addToNewsletter: true,
                agreesToTerms: false,
                stripeLoginLink: null,
                errors: {},
            };
        },
        watch: {
            email(val, oldVal) {
                this.$emit('update:email', val);
            },
            password(val, oldVal) {
                this.$emit('update:password', val);
            },
            agreesToTerms(val, oldVal) {
                this.$emit('update:agreesToTerms', val);
            },
        },
        methods: {
            async requestRegister() {
                if (this.agreesToTerms === true) {
                    try {
                        this.$store.commit('app/setLoading', true);
                        await api.post('/api/auth/register', {
                            email: this.email,
                            password: this.password,
                            add_to_newsletter: this.addToNewsletter
                        });
                        await User.dispatch('loadAuthentication');
                        await this.$router.replace(this.redirect);
                    } catch (e) {
                        this.$store.commit('app/setLoading', false);
                        this.errors = e.errors;
                    }
                } else {
                    this.errors = {
                        ...this.errors,
                        agreesToTerms: "You must accept PREV-U's terms of service."
                    }
                }
            },
        }
    }
</script>
