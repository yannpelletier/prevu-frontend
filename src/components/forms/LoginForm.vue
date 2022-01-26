<template>
  <v-form v-on:submit.prevent="requestLogin" class="login-form">
    <template v-if="!noGoogleSignIn">
      <div
        style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <google-sign-in-btn/>
      </div>
    </template>
    <span class="error--text">{{error}}</span>
    <v-text-field v-model="email" label="Email" type="email"/>
    <v-text-field v-model="password" label="Password" type="password"/>
    <v-checkbox v-model="rememberMe" label="Remember me"/>
    <div class="d-flex justify-center">
      <v-btn v-if="!noSubmitButton" type="submit" color="primary">Login</v-btn>
    </div>
    <template v-if="showRegisterOption">
      <v-divider class="mt-8"/>
      <p class="mt-5 mb-0 text-center">
        New here?
        <router-link to="/register">Register</router-link>
      </p>
      <p class="mt-2 mb-0 text-center">
        Can't login?
        <router-link to="/forgot-password">Recover password</router-link>
      </p>
    </template>
  </v-form>
</template>

<script>
    import {mapActions} from 'vuex';
    import GoogleSignInBtn from "../buttons/GoogleSignInBtn";

    import User from '@/store/database/User'

    export default {
        name: "LoginForm",
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
            email: {
                type: String,
                default: localStorage.rememberedEmail,
            },
            password: {
                type: String,
                default: ""
            },
            showRegisterOption: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                rememberMe: (localStorage.rememberedEmail !== undefined),
                error: null,
            };
        },
        watch: {
            email(val, oldVal) {
                this.$emit('update:email', val);
            },
            password(val, oldVal) {
                this.$emit('update:password', val);
            }
        },
        methods: {
            async requestLogin() {
                try {
                    this.$store.commit('app/setLoading', true);
                    await User.dispatch('login', {email: this.email, password: this.password});
                    await User.dispatch('loadAuthentication');

                    await this.$router.push('/dashboard');
                    if (this.rememberMe) {
                        localStorage.rememberedEmail = this.email;
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }
                } catch (e) {
                    this.error = e.message;
                    this.$store.commit('app/setLoading', false);
                }
            },
        }
    }
</script>
