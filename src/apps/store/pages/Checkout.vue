<template>
  <div style="min-height:100vh;">
    <store-bar
      v-bind="componentAttributes('navBar')"
    />
      <v-row class="justify-center checkout-row-layout">
        <v-col cols="12" md="8">
          <v-card :color="secondaryColor" :dark="isDark(secondaryColor)" elevation="0">
            <v-card-title>Checkout</v-card-title>
            <v-data-table
              :headers="headers"
              :items="cart"
              item-key="name"
              :hide-default-header="mobile"
              :mobile-breakpoint="100"
              hide-default-footer
              no-data-text="Your cart is empty"
              class="pa-2 checkout-data-table"
              style="background-color: transparent"
            >
              <template v-slot:item.publicThumbnail="{ item }">
                <td>
                  <v-container>
                    <v-img
                      contain
                      height="50px"
                      width="50px"
                      :src="item.publicThumbnail"
                      @click="displayProduct(item.slug)"
                      class="v-chip--clickable"
                    />
                  </v-container>
                </td>
              </template>
              <template v-slot:item.name="{ item }">
                <span>{{item.name}}</span><br>
                <span @click="removeFromShoppingCart(item)" v-if="!mobile"
                      class="remove-btn">remove</span>
              </template>
              <template v-slot:item.price="{ item }">
                <span class="px-3">{{ item.formattedPrice }}</span>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn @click="removeFromShoppingCart(item)" icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <template v-slot:footer>
                <v-divider></v-divider>
                <v-flex row class="my-5">
                  <div class="flex-grow-1"></div>
                  <strong class="mr-3">Total:</strong>
                  {{ formatPrice(cartTotal, "USD") }}
                </v-flex>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col v-if="cart.length > 0" sm="12" md="4" style="width: 100%;" sm12
               class="payment-container">
          <v-card class="text-center" :color="secondaryColor" :dark="isDark(secondaryColor)" elevation="0">
            <v-card-text>
              <span class="error--text">{{error}}</span>
              <v-tabs-items v-model="checkoutStep" style="background-color: transparent"
                            :dark="isDark(secondaryColor)"
                            touchless
              >
                <v-tab-item :color="secondaryColor">
                  <v-form @submit.prevent="authenticate" :color="secondaryColor">
                    <v-radio-group v-model="registeredUser" row>
                      <v-radio
                        class="register-radio-btn"
                        color="primary"
                        label="I'm new"
                        :value="false"/>
                      <v-radio
                        class="login-radio-btn"
                        color="primary"
                        label="I already have an account"
                        :value="true"/>
                    </v-radio-group>
                    <login-form
                      v-if="registeredUser"
                      no-submit-button
                      v-bind:email.sync="loginForm.email"
                      v-bind:password.sync="loginForm.password"/>
                    <register-form
                      v-else
                      no-submit-button
                      v-bind:email.sync="registerForm.email"
                      v-bind:password.sync="registerForm.password"
                      v-bind:agreesToTerms.sync="registerForm.agreesToTerms"
                    />
                    <v-btn
                      x-large
                      depressed
                      class="mt-4 continue-btn"
                      type="submit"
                      :color="tertiaryColor"
                      :dark="isDark(tertiaryColor)"
                      :loading="authenticateLoading"
                    >
                      Continue
                    </v-btn>
                  </v-form>
                </v-tab-item>
                <v-tab-item :color="secondaryColor">
                  <v-form class="payment-form" @submit.prevent="pay" :color="secondaryColor">
                    <div class="ma-8">
                      <span
                        :style="{'font-size': 'medium', 'color': secondaryTextColor}"
                      >
                        Logged in as {{ authenticatedUserEmail }}
                      </span>
                      <br>
                      <v-btn
                        class="logout-btn"
                        text
                        color="primary"
                        :loading="logoutLoading"
                        @click="logout">
                        Logout
                      </v-btn>
                    </div>
                    <stripe-element :text-color="pivotColor(secondaryColor,'#e0e0ff', '#32325d')"/>
                    <v-btn
                      x-large
                      depressed
                      class="mt-4 buy-now-btn"
                      type="submit"
                      :color="tertiaryColor"
                      :dark="isDark(tertiaryColor)"
                      :loading="payLoading"
                    >
                      Buy now
                    </v-btn>
                  </v-form>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
    import currencyUtils from '@/utils/currency';
    import {createToken} from 'vue-stripe-elements-plus';

    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    import User from "@/store/database/User";
    import Purchase from "@/store/database/Purchase";
    import Product from '@/store/database/Product';

    export default {
        name: "Checkout",
        extends: GenericStoreComponent,
        components: {
            StoreBanner: () => import('@/apps/store/banner/Banner'),
            StoreBar: () => import('@/apps/store/bar/Bar'),
            RegisterForm: () => import('@/components/forms/RegisterForm'),
            LoginForm: () => import('@/components/forms/LoginForm'),
            StripeElement: () => import('@/components/inputs/StripeElement'),
        },
        props: {
            mobile: {
                type: Boolean,
            },
            cart: {
                type: Array,
                default: [],
            },

            //General Attributes
            secondaryColor: {
                type: String,
            },
            secondaryTextColor: {
                type: String,
            },
            tertiaryColor: {
                type: String,
            },

            //Functions
            changePage: {
                type: Function,
            },
            toggleCart: {
                type: Function,
            },
        },
        data() {
            return {
                registeredUser: false,
                registerForm: {
                    email: "",
                    password: "",
                    agreesToTerms: false,
                },
                loginForm: {
                    email: "",
                    password: ""
                },
                error: null,
                logoutLoading: false,
                stripeCard: null,
                authenticateLoading: false,
                payLoading: false,
            }
        },
        computed: {
            cartTotal() {
                return this.cart.length > 0 ? this.cart.reduce((accumulator, product) => {
                    return accumulator + product.price
                }, 0) : 0;
            },
            headers() {
                if (this.mobile) {
                    return [
                        {
                            text: 'Delete',
                            value: 'delete',
                            width: '10%',
                        },
                        {
                            text: '',
                            value: 'publicThumbnail',
                            width: "10px",
                            sortable: false
                        },
                        {
                            text: 'Name',
                            value: 'name',
                            width: '80%'
                        },
                        {
                            text: 'Price',
                            value: 'price',
                            align: 'right',
                        },
                    ]
                } else {
                    return [
                        {
                            text: '',
                            value: 'publicThumbnail',
                            width: "10%",
                            sortable: false
                        },
                        {
                            text: 'Name',
                            value: 'name'
                        },
                        {
                            text: 'Price',
                            value: 'price',
                            align: 'right',
                        }
                    ]
                }
            },
            checkoutStep() {
                return this.authenticatedUser === null ? 0 : 1;
            },
            authenticatedUser() {
                return User.getters('authenticatedUser')();
            },
            authenticatedUserEmail() {
                if (this.authenticatedUser) {
                    return this.authenticatedUser.email;
                }
                return "";
            }
        },
        mounted() {
            localStorage.googleSignInRedirect = this.$route.path;
        },
        methods: {
            displayProduct(productSlug) {
                this.changePage(null, {product: productSlug});
            },
            formatPrice(price, currency) {
                return currencyUtils.formatPrice(price, currency);
            },
            removeFromShoppingCart(product) {
                Product.dispatch('toggleCartProductById', product.id);
            },
            async logout() {
                this.logoutLoading = true;
                await User.dispatch('logout');
                this.logoutLoading = false;
                this.checkoutStep = 0;
            },
            async authenticate() {
                this.authenticateLoading = true;
                this.error = null;
                try {
                    if (this.registeredUser) {
                        let {email, password} = this.loginForm;
                        await User.dispatch('login', {email, password});
                        await User.dispatch('loadAuthentication');
                    } else {
                        if (this.registerForm.agreesToTerms === false) {
                            throw new Error("You must accept PREV-U's terms of service.")
                        }
                        let {email, password} = this.registerForm;
                        await User.dispatch('register', {email, password});
                        await User.dispatch('loadAuthentication');
                    }
                    this.checkoutStep = 1;
                } catch (e) {
                    if (e.errors) {
                        this.error = Object.values(e.errors)[0][0];
                    } else {
                        this.error = e.message;
                    }
                } finally {
                    this.authenticateLoading = false;
                }
            },
            async pay() {
                this.payLoading = true;
                this.error = null;
                try {
                    let {token} = await createToken();
                    let products = this.cart;
                    await Purchase.dispatch('makePurchase', {
                        cardToken: token.id,
                        products
                    });
                    window.location = '/purchases';
                } catch (e) {
                    if (e.errors) {
                        this.error = Object.values(e.errors)[0][0];
                    } else {
                        this.error = e.message;
                    }
                    this.payLoading = false;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

  .checkout-row-layout {
  }
  .checkout-row-layout {
    margin: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1200px;

    .remove-btn {
      color: grey;
      text-decoration: none;
      transition: .25s;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }
</style>
<style lang="scss">
  .checkout-data-table {
    td {
      padding: 0;
    }
  }
</style>
